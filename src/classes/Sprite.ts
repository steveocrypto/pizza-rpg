import { GameObject } from "./GameObject";
import Shadow from "assets/characters/shadow.png";
import { Animation, Animations } from "types";
import { withGrid } from "utils";

interface Config {
  gameObject: GameObject;
  src: string;
  animations?: Animations;
  currentAnimation?: Animation;
  animationFrameLimit?: number;
}

export class Sprite {
  image: HTMLImageElement;
  isLoaded: boolean = false;
  shadow: HTMLImageElement;
  useShadow: boolean = true;
  isShadowLoaded: boolean = false;
  animations: Animations;
  currentAnimation: Animation;
  currentAnimationFrame: number;
  gameObject: GameObject;
  animationFrameLimit: number;
  animationFrameProgress: number;

  constructor(config: Config) {
    //Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    //Shadow
    this.shadow = new Image();
    this.useShadow = true; //config.useShadow || false
    if (this.useShadow) {
      this.shadow.src = Shadow;
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    //Configure Animation & Initial State
    this.animations = config.animations || {
      idleDown: [[0, 0]],
      idleRight: [[0, 1]],
      idleUp: [[0, 2]],
      idleLeft: [[0, 3]],
      walkDown: [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      walkRight: [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      walkUp: [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      walkLeft: [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = config.currentAnimation || "walkDown";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key: Animation) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    // Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    // Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D, cameraPerson: GameObject) {
    const x = this.gameObject.x - 8 + withGrid(10.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + withGrid(6) - cameraPerson.y;

    const [frameX, frameY] = this.frame;

    if (this.isShadowLoaded) ctx.drawImage(this.shadow, x, y);
    if (this.isLoaded) ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);

    this.updateAnimationProgress();
  }
}
