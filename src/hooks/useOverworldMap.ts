import { useImage } from "./useImage";

interface Props {
  src: string;
  ctx: CanvasRenderingContext2D;
}

export function useOverworldMap({ src, ctx }: Props) {
  const image = useImage(src);

  function draw() {
    if (image) ctx.drawImage(image, 0, 0);
  }

  return [draw];
}
