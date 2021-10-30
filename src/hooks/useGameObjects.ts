import { GameObjectsType } from "constants/functionalMaps";
import { useEffect, useState } from "react";
import ShadowImg from "assets/characters/shadow.png";

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
      ctx.drawImage(
        image.image,
        0, //left cut
        0, //top cut,
        32, //width of cut
        32, //height of cut
        image.x * 16 - 8,
        image.y * 16 - 18,
        32,
        32
      );

      ctx.drawImage(
        image.shadow,
        0, //left cut
        0, //top cut,
        32, //width of cut
        32, //height of cut
        image.x * 16 - 8,
        image.y * 16 - 18,
        32,
        32
      );
    });
  }

  return [drawObjects];
}
