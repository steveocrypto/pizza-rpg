interface Props {
  ctx: CanvasRenderingContext2D;
}

interface Sprite {
  image: HTMLImageElement;
  shadow: HTMLImageElement;
  x: number;
  y: number;
}

export function useSprite({ ctx }: Props) {
  function draw(sprite: Sprite) {
    ctx.drawImage(
      sprite.image,
      0, //left cut
      0, //top cut,
      32, //width of cut
      32, //height of cut
      sprite.x * 16 - 8,
      sprite.y * 16 - 18,
      32,
      32
    );

    ctx.drawImage(
      sprite.image,
      0, //left cut
      0, //top cut,
      32, //width of cut
      32, //height of cut
      sprite.x * 16 - 8,
      sprite.y * 16 - 18,
      32,
      32
    );
  }
  return [draw];
}
