import { useRef } from "react";

interface Props {
  src: string;
  ctx: CanvasRenderingContext2D;
}

export function useOverworldMap({ src, ctx }: Props) {
  console.log("Render `OverworldMap`");

  const imageRef = useRef<HTMLImageElement>(createImage(src));

  function createImage(src: string) {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      imageRef.current = image;
    };
    return image;
  }

  function draw() {
    ctx.drawImage(imageRef.current, 0, 0);
  }

  return [draw];
}
