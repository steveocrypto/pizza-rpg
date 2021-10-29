import { Behavior, Direction, GameObjectType } from "types";
import { Sprite } from "./Sprite";
import Hero from "assets/characters/people/hero.png";
import { OverworldMap } from "./OverworldMap";
import { OverworldEvent } from "./OverworldEvent";

export interface State {
  arrow?: Direction;
  map: OverworldMap;
}

export class GameObject {
  id: string;
  x: number;
  y: number;
  sprite: Sprite;
  direction: Direction;
  isMounted: boolean;
  behaviorLoop: Behavior[];
  behaviorLoopIndex: number;

  constructor(config: GameObjectType) {
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
    if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
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
