import DemoLower from "assets/maps/DemoLower.png";
import DemoUpper from "assets/maps/DemoUpper.png";
import KitchenUpper from "assets/maps/KitchenUpper.png";
import KitchenLower from "assets/maps/KitchenLower.png";
import Npc1 from "assets/characters/people/npc1.png";
import Npc2 from "assets/characters/people/npc2.png";
import Npc3 from "assets/characters/people/npc3.png";
import { asGridCoord, withGrid } from "utils";
import { GameObject } from "classes/GameObject";
import { Person } from "classes/Person";
import { Behavior, Walls } from "types";

export interface OverworldMaps {
  [name: string]: {
    lowerSrc: string;
    upperSrc: string;
    gameObjects: {
      [name: string]: GameObject | Person;
    };
    walls: Walls;
    cutsceneSpaces?: {
      [coordinates: string]: {
        events: Behavior[];
      }[];
    };
  };
}

export const Maps: OverworldMaps = {
  DemoRoom: {
    lowerSrc: DemoLower,
    upperSrc: DemoUpper,
    gameObjects: {
      hero: new Person({
        x: withGrid(5),
        y: withGrid(6),
        isPlayerControlled: true,
      }),
      npcA: new Person({
        x: withGrid(7),
        y: withGrid(9),
        src: Npc1,
        behaviorLoop: [
          { type: "stand", direction: "left", time: 800 },
          { type: "stand", direction: "up", time: 800 },
          { type: "stand", direction: "right", time: 1200 },
          { type: "stand", direction: "up", time: 300 },
        ],
        talking: [
          {
            events: [
              { type: "textMessage", text: "I'm busy...", faceHero: "npcA" },
              { type: "textMessage", text: "Go away!" },
              { who: "hero", type: "walk", direction: "up", text: "Go away!" },
            ],
          },
        ],
      }),
      npcB: new Person({
        x: withGrid(8),
        y: withGrid(5),
        src: Npc2,
        // behaviorLoop: [
        //   { type: "walk", direction: "left" },
        //   { type: "stand", direction: "up", time: 800 },
        //   { type: "walk", direction: "up" },
        //   { type: "walk", direction: "right" },
        //   { type: "walk", direction: "down" },
        // ],
      }),
    },
    walls: {
      // "16,16": true,
      [asGridCoord(7, 6)]: true,
      [asGridCoord(8, 6)]: true,
      [asGridCoord(7, 7)]: true,
      [asGridCoord(8, 7)]: true,
    },
    cutsceneSpaces: {
      [asGridCoord(7, 4)]: [
        {
          events: [
            { who: "npcB", type: "walk", direction: "left" },
            { who: "npcB", type: "stand", direction: "up", time: 200 },
            { type: "textMessage", text: "You can't be in there!" },
            { who: "npcB", type: "walk", direction: "right" },
            { who: "hero", type: "walk", direction: "down" },
          ],
        },
      ],
      [asGridCoord(5, 10)]: [
        {
          events: [{ type: "changeMap", map: "Kitchen" }],
        },
      ],
    },
  },
  Kitchen: {
    lowerSrc: KitchenLower,
    upperSrc: KitchenUpper,
    gameObjects: {
      hero: new Person({
        x: withGrid(3),
        y: withGrid(5),
        isPlayerControlled: true,
      }),
      npcB: new Person({
        x: withGrid(10),
        y: withGrid(8),
        src: Npc3,
        talking: [
          {
            events: [{ type: "textMessage", text: "You made it!", faceHero: "npcB" }],
          },
        ],
      }),
    },
    walls: {},
  },
};
