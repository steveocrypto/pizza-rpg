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

  constructor(config: Config) {
    this.canvas = config.canvas;
    this.ctx = config.canvas.getContext("2d")!;
    this.map = new OverworldMap(Maps.DemoRoom);
    this.directionInput = new DirectionInput();
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

  init() {
    this.map.mountObjects();

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    // this.map.startCutscene([
    //   { who: "hero", type: "walk", direction: "down" },
    //   { who: "hero", type: "walk", direction: "down" },
    //   { who: "npc1", type: "walk", direction: "left" },
    //   { who: "npc1", type: "walk", direction: "left" },
    //   { who: "npc1", type: "stand", direction: "up", time: 800 },
    //   { type: "textMessage", text: "Hi Ethan, how was school today?", direction: "down" },
    //   { type: "textMessage", text: "Pretty good! I learned a lot.", direction: "down" },
    //   { type: "textMessage", text: "Awesome! I hope you have a great day.", direction: "down" },
    // ]);
  }
}
