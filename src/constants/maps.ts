import { GameObject } from "classes/GameObject";
import DemoLower from "assets/maps/DemoLower.png";
import DemoUpper from "assets/maps/DemoUpper.png";
import KitchenUpper from "assets/maps/KitchenUpper.png";
import KitchenLower from "assets/maps/KitchenLower.png";
import Npc1 from "assets/characters/people/npc1.png";
import Npc2 from "assets/characters/people/npc2.png";
import Npc3 from "assets/characters/people/npc3.png";
import { asGridCoord, withGrid } from "utils";
import { Person } from "classes/Person";
import { Walls } from "types";

export interface Map {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: {
    [name: string]: GameObject;
  };
  walls: Walls;
}

export const Maps: { [name: string]: Map } = {
  DemoRoom: {
    lowerSrc: DemoLower,
    upperSrc: DemoUpper,
    gameObjects: {
      hero: new Person({
        x: withGrid(5),
        y: withGrid(6),
        isPlayerControlled: true,
      }),
      npc1: new Person({
        x: withGrid(7),
        y: withGrid(9),
        src: Npc1,
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "up", time: 300 },
        ],
      }),
      npc2: new Person({
        x: withGrid(3),
        y: withGrid(7),
        src: Npc2,
        behaviorLoop: [
          { type: "walk", direction: "left" },
          { type: "stand", direction: "up", time: 800 },
          { type: "walk", direction: "up" },
          { type: "walk", direction: "right" },
          { type: "walk", direction: "down" },
        ],
      }),
    },
    walls: {
      // "16,16": true,
      [asGridCoord(7, 6)]: true,
      [asGridCoord(8, 6)]: true,
      [asGridCoord(7, 7)]: true,
      [asGridCoord(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: KitchenLower,
    upperSrc: KitchenUpper,
    gameObjects: {
      hero: new GameObject({
        x: withGrid(3),
        y: withGrid(5),
      }),
      npcA: new GameObject({
        x: withGrid(9),
        y: withGrid(6),
        src: Npc2,
      }),
      npcB: new GameObject({
        x: withGrid(10),
        y: withGrid(8),
        src: Npc3,
      }),
    },
    walls: {},
  },
};
