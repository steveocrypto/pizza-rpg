import { OverworldMap } from "./OverworldMap";
import { Maps } from "constants/maps";
import { DirectionInput } from "./DirectionInput";
import { KeyPressListener } from "./KeyPressListener";

interface Config {
  canvas: HTMLCanvasElement;
}

export class Overworld {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  map: OverworldMap;
  directionInput: DirectionInput;
  isReadyToChangeMaps: boolean;

  constructor(config: Config) {
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext("2d")!;
    this.map = new OverworldMap(Maps.Kitchen);
    this.directionInput = new DirectionInput();
    this.isReadyToChangeMaps = false;
  }

  startGameLoop() {
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      //Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      //Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw Game Objects
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

      //Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      // Is there a person here to talk to?
      this.map.checkForActionCutscene();
    });
  }

  bindHeroPositionCheck() {
    const completeHandler = (e: any) => {
      if (e.detail.whoId === "hero") {
        this.map.checkForFootstepCutscene();
      }
    };

    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  startMap(mapKey: string) {
    if (this.isReadyToChangeMaps) {
      this.map = new OverworldMap(Maps[mapKey]);
    }
    this.map.overworld = this;
    this.map.mountObjects();
    this.isReadyToChangeMaps = true;
  }

  init() {
    this.startMap("DemoRoom");

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    this.map.startCutscene([{ type: "textMessage", text: "This is the very first message!" }]);
  }
}
