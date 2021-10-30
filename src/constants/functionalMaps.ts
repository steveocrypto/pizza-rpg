// import { GameObject } from "classes/GameObject";
import DemoLower from "assets/maps/DemoLower.png";
import DemoUpper from "assets/maps/DemoUpper.png";
// import KitchenUpper from "assets/maps/KitchenUpper.png";
// import KitchenLower from "assets/maps/KitchenLower.png";
import Hero from "assets/characters/people/hero.png";
import Npc1 from "assets/characters/people/npc1.png";
import Npc2 from "assets/characters/people/npc2.png";
// import Npc3 from "assets/characters/people/npc3.png";
import { asGridCoord, withGrid } from "utils";
import { Behavior, Walls } from "types";

export interface Map {
  lowerSrc: string;
  upperSrc: string;
  gameObjects: GameObjectsType;
  walls: Walls;
}

export interface GameObjectsType {
  [name: string]: GameObjectType;
}

export interface GameObjectType {
  x: number;
  y: number;
  src: string;
  isPlayerControlled?: boolean;
  behaviorLoop?: Behavior[];
}

export const Maps: { [name: string]: Map } = {
  DemoRoom: {
    lowerSrc: DemoLower,
    upperSrc: DemoUpper,
    gameObjects: {
      hero: {
        x: 5,
        y: 6,
        src: Hero,
        isPlayerControlled: true,
      },
      npc1: {
        x: 7,
        y: 9,
        src: Npc1,
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "up", time: 300 },
        ],
      },
      npc2: {
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
      },
    },
    walls: {
      // "16,16": true,
      [asGridCoord(7, 6)]: true,
      [asGridCoord(8, 6)]: true,
      [asGridCoord(7, 7)]: true,
      [asGridCoord(8, 7)]: true,
    },
  },
};
