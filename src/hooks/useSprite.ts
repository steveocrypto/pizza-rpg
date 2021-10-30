import { useRef } from "react";
import { ReadySprite } from "./useGameObjects";
import ShadowImg from "assets/characters/shadow.png";

interface Props {
  ctx: CanvasRenderingContext2D;
}

export function useSprite({ ctx }: Props) {
  const shadow = useRef<HTMLImageElement>(prepareShadow());

  function prepareShadow() {
    const image = new Image();
    image.src = ShadowImg;
    return image;
  }

  function draw(sprite: ReadySprite) {
    const { image, gameObject } = sprite;
    const x = gameObject.x * 16 - 8;
    const y = gameObject.y * 16 - 18;

    ctx.drawImage(
      image,
      0, //left cut
      0, //top cut,
      32, //width of cut
      32, //height of cut
      x,
      y,
      32,
      32
    );

    if (!gameObject.disableShadow && shadow.current) {
      ctx.drawImage(
        shadow.current,
        0, //left cut
        0, //top cut,
        32, //width of cut
        32, //height of cut
        x,
        y,
        32,
        32
      );
    }
  }
  return [draw];
}
