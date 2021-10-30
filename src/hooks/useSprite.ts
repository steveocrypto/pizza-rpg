import { ReadySprite } from "./useGameObjects";
import ShadowImg from "assets/characters/shadow.png";
import { useImage } from "./useImage";

interface Props {
  ctx: CanvasRenderingContext2D;
}

export function useSprite({ ctx }: Props) {
  const shadow = useImage(ShadowImg);

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

    if (!gameObject.disableShadow && shadow) {
      ctx.drawImage(
        shadow,
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
