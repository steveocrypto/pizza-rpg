import { GameObjectsType } from "constants/functionalMaps";
import { useEffect, useState } from "react";
import ShadowImg from "assets/characters/shadow.png";
import { useSprite } from "./useSprite";

interface Props {
  objects: GameObjectsType;
  ctx: CanvasRenderingContext2D;
}

interface DrawableImage {
  image: HTMLImageElement;
  shadow: HTMLImageElement;
  x: number;
  y: number;
}

export function useGameObjects({ objects, ctx }: Props) {
  const [images, setImages] = useState<DrawableImage[]>([]);
  const [drawSprite] = useSprite({ ctx });

  useEffect(() => {
    const images: DrawableImage[] = [];

    Object.values(objects).forEach((object) => {
      const image = new Image();
      image.src = object.src;
      image.onload = () => {
        const shadow = new Image();
        shadow.src = ShadowImg;
        shadow.onload = () => {
          images.push({
            image,
            shadow,
            x: object.x,
            y: object.y,
          });
        };
      };
    });
    setImages(images);
  }, [objects]);

  function drawObjects() {
    images.forEach((image) => {
      drawSprite(image);
    });
  }

  return [drawObjects];
}
