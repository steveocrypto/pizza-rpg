import { GameObjectsType, GameObjectType } from "constants/functionalMaps";
import { useSprite } from "./useSprite";

interface Props {
  objects: GameObjectsType;
  ctx: CanvasRenderingContext2D;
}

export interface ReadySprite {
  image: HTMLImageElement;
  gameObject: GameObjectType;
}

export function useGameObjects({ objects, ctx }: Props) {
  const [drawSprite] = useSprite({ ctx });

  function prepareSprites() {
    let sprites: ReadySprite[] = [];
    Object.values(objects).forEach((object) => {
      const image = new Image();
      image.src = object.src;
      sprites.push({ image, gameObject: object });
    });
    return sprites;
  }

  function drawSprites() {
    const sprites = prepareSprites();
    sprites.forEach((sprite) => {
      drawSprite(sprite);
    });
  }

  return [drawSprites];
}
