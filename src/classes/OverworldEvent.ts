import { Behavior } from "types";
import { oppositeDirection } from "utils";
import { OverworldMap } from "./OverworldMap";
import { Person } from "./Person";
import { SceneTransition } from "./SceneTransition";
import { TextMessage } from "./TextMessage";

interface Config {
  map: OverworldMap;
  event: Behavior;
}

export class OverworldEvent {
  map: OverworldMap;
  event: Behavior;

  constructor(config: Config) {
    this.map = config.map;
    this.event = config.event;
  }

  stand(resolve: (value: unknown) => void) {
    const who = this.map.gameObjects[this.event.who || ""];
    if (isInstanceOfPerson(who)) {
      who.startBehavior({ map: this.map }, { type: "stand", direction: this.event.direction, time: this.event.time });
    }

    const completeHandler = (e: any) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonStandComplete", completeHandler);
        resolve(null);
      }
    };

    document.addEventListener("PersonStandComplete", completeHandler);
  }

  walk(resolve: (value: unknown) => void) {
    const who = this.map.gameObjects[this.event.who || ""];
    if (isInstanceOfPerson(who)) {
      who.startBehavior({ map: this.map }, { type: "walk", direction: this.event.direction, retry: true });
    }

    const completeHandler = (e: any) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener("PersonWalkingComplete", completeHandler);
        resolve(null);
      }
    };

    document.addEventListener("PersonWalkingComplete", completeHandler);
  }

  textMessage(resolve: (value: unknown) => void) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = oppositeDirection(this.map.gameObjects["hero"].direction);
    }
    const message = new TextMessage({
      text: this.event.text || "",
      onComplete: () => resolve(null),
    });
    message.init(document.querySelector(".game-container")!);
  }

  changeMap(resolve: (value: unknown) => void) {
    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector(".game-container")!, () => {
      if (this.map.overworld && this.event.map) {
        this.map.overworld.startMap(this.event.map);
        resolve(null);

        sceneTransition.fadeOut();
      }
    });
  }

  async init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }
}

function isInstanceOfPerson(object: any): object is Person {
  return "id" in object;
}
