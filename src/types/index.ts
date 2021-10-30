import { GameObject } from "classes/GameObject";
import { Person } from "classes/Person";

export interface GameObjectType {
  x: number;
  y: number;
  src?: string;
  direction?: Direction;
  disableShadow?: boolean;
  isPlayerControlled?: boolean;
  behaviorLoop?: Behavior[];
}

export type Direction = "up" | "down" | "left" | "right";
export type Axis = "x" | "y";
export type DirectionUpdate = Record<Direction, [Axis, number]>;
export type Animation =
  | "idleDown"
  | "idleRight"
  | "idleUp"
  | "idleLeft"
  | "walkDown"
  | "walkRight"
  | "walkUp"
  | "walkLeft";
export type Animations = Record<Animation, [number, number][]>;
export interface Walls {
  [key: string]: boolean;
}

export interface Behavior {
  type: "walk" | "stand";
  direction: Direction;
  time?: number;
  who?: string;
  retry?: boolean;
}

export interface GameObjects {
  [name: string]: GameObject | Person;
}

export interface CustomEventDetail {
  whoId: string;
}
