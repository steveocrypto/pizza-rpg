import { Behavior, Direction, GameObjects, Walls } from "types";
import { nextPosition, withGrid } from "utils";
import { GameObject } from "./GameObject";
import { OverworldEvent } from "./OverworldEvent";

interface OverworldMapConfig {
  gameObjects: GameObjects;
  lowerSrc: string;
  upperSrc: string;
  walls: Walls;
  cutsceneSpaces?: {};
}

export class OverworldMap {
  gameObjects: GameObjects;
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  walls: Walls;
  isCutscenePlaying?: boolean;
  cutsceneSpaces: { [coordinates: string]: { events: Behavior[] }[] } = {};

  constructor(config: OverworldMapConfig) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};
    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
    this.isCutscenePlaying = false;
    this.cutsceneSpaces = config.cutsceneSpaces || {};
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(this.lowerImage, withGrid(10.5) - cameraPerson.x, withGrid(6) - cameraPerson.y);
  }

  drawUpperImage(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    ctx.drawImage(this.upperImage, withGrid(10.5) - cameraPerson.x, withGrid(6) - cameraPerson.y);
  }

  isSpaceTaken(currentX: number, currentY: number, direction: Direction) {
    const { x, y } = nextPosition(currentX, currentY, direction);
    const key = `${x},${y}`;
    return this.walls[key] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      const object = this.gameObjects[key];
      object.id = key;

      // TODO: determine if this object should actually mount
      object.mount(this);
    });
  }

  async startCutscene(events: Behavior[]) {
    this.isCutscenePlaying = true;

    // Start a loop of async events
    // Await each one
    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({ map: this, event: events[i] });
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    // Reset NPCS to do their idle behavior
    Object.values(this.gameObjects).forEach((object) => object.doBehaviorEvent(this));
  }

  checkForActionCutscene() {
    const hero = this.gameObjects["hero"];
    const nextCoords = nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find((object) => {
      return object.x === nextCoords.x && object.y === nextCoords.y;
    });
    if (!this.isCutscenePlaying && match && match.talking.length > 0) {
      this.startCutscene(match.talking[0].events);
    }
  }

  checkForFootstepCutscene() {
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
  }

  // Walls
  addWall(x: number, y: number) {
    this.walls[`${x},${y}`] = true;
  }

  removeWall(x: number, y: number) {
    delete this.walls[`${x},${y}`];
  }

  moveWall(wasX: number, wasY: number, direction: Direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}
