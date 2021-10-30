import { GameObjectsType, GameObjectType } from "constants/functionalMaps";
import { useEffect, useRef } from "react";
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
  const spritesRef = useRef<ReadySprite[]>([]);

  useEffect(() => {
    spritesRef.current = [];
    Object.values(objects).forEach((object) => {
      const image = new Image();
      image.src = object.src;
      image.onload = () => {
        spritesRef.current.push({
          image,
          gameObject: object,
        });
      };
    });
  }, [objects]);

  function drawSprites() {
    const ready = spritesRef.current.length === Object.values(objects).length;

    if (ready) {
      spritesRef.current.forEach((sprite) => {
        drawSprite(sprite);
      });
    }
  }

  return [drawSprites];
}
