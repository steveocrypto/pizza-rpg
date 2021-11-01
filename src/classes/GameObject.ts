import { Behavior, Direction } from "types";
import { Sprite } from "./Sprite";
import Hero from "assets/characters/people/hero.png";
import { OverworldMap } from "./OverworldMap";
import { OverworldEvent } from "./OverworldEvent";

export interface State {
  arrow?: Direction;
  map: OverworldMap;
}

export interface GameObjectConfig {
  direction?: Direction;
  x?: number;
  y?: number;
  src?: string;
  behaviorLoop?: Behavior[];
  talking?: { events: Behavior[] }[];
}

export class GameObject {
  id: string;
  x: number;
  y: number;
  direction: Direction;
  sprite: Sprite;
  isMounted: boolean;
  behaviorLoop: Behavior[];
  behaviorLoopIndex: number;
  isStanding: boolean;
  talking: { events: Behavior[] }[];

  constructor(config: GameObjectConfig) {
    this.id = "";
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || Hero,
    });
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;
    this.isStanding = false;
    this.talking = config.talking || [];
  }

  mount(map: OverworldMap) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    setTimeout(() => {
      this.doBehaviorEvent(map);
    }, 10);
  }

  update(state: State) {}

  async doBehaviorEvent(map: OverworldMap) {
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
      return;
    }

    // Setting up our event with relevent info
    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    // Create an event instance
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    // Setting the next event to fire
    this.behaviorLoopIndex += 1;
    if (this.behaviorLoopIndex === this.behaviorLoop.length) {
      this.behaviorLoopIndex = 0;
    }

    // Do it again!
    this.doBehaviorEvent(map);
  }
}
