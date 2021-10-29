import { Behavior } from "types";
import { OverworldMap } from "./OverworldMap";
import { Person } from "./Person";

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

  async init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }
}

function isInstanceOfPerson(object: any): object is Person {
  return "id" in object;
}
