import { Behavior, DirectionUpdate, GameObjectType } from "types";
import { GameObject, State } from "./GameObject";
import { Animation } from "types";
import { emitEvent } from "utils";

export class Person extends GameObject {
  movementProgressRemaining: number;
  directionUpdate: DirectionUpdate;
  isPlayerControlled: boolean;

  constructor(config: GameObjectType) {
    super(config);
    this.movementProgressRemaining = 0;
    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state: State) {
    if (this.movementProgressRemaining > 0) {
      this.updatePosition();
    } else {
      // More cases for starting to walk will come here
      //
      //

      // Case: Keyboard ready and an arrow pressed
      if (this.isPlayerControlled && state.arrow && state.map.isCutscenePlaying === false) {
        this.startBehavior(state, { type: "walk", direction: state.arrow });
      }
      this.updateSprite();
    }
  }

  startBehavior(state: State, behavior: Behavior) {
    // Set character direction to whatever behavrior has
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      // Stop here if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behavior.retry &&
          setTimeout(() => {
            this.startBehavior(state, behavior);
          }, 10);
        return;
      }

      // Ready to walk!
      state.map.moveWall(this.x, this.y, this.direction);
      this.movementProgressRemaining = 16;
      this.updateSprite();
    }
    if (behavior.type === "stand") {
      this.isStanding = true;
      setTimeout(() => {
        emitEvent("PersonStandComplete", {
          whoId: this.id,
        });
        this.isStanding = false;
      }, behavior.time);
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movementProgressRemaining -= 1;

    if (this.movementProgressRemaining === 0) {
      // We finished the walk
      emitEvent("PersonWalkingComplete", { whoId: this.id });
    }
  }

  updateSprite() {
    let idleAnimation: Animation = "idleDown";
    let walkingAnimation: Animation = "walkDown";
    switch (this.direction) {
      case "up":
        idleAnimation = "idleUp";
        walkingAnimation = "walkUp";
        break;
      case "down":
        idleAnimation = "idleDown";
        walkingAnimation = "walkDown";
        break;
      case "left":
        idleAnimation = "idleLeft";
        walkingAnimation = "walkLeft";
        break;
      case "right":
        idleAnimation = "idleRight";
        walkingAnimation = "walkRight";
        break;
      default:
        break;
    }

    if (this.movementProgressRemaining > 0) {
      this.sprite.setAnimation(walkingAnimation);
      return;
    }

    this.sprite.setAnimation(idleAnimation);
  }
}
