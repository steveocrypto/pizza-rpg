import { useEffect, useRef } from "react";

interface Props {
  src: string;
  ctx: CanvasRenderingContext2D;
}

export function useOverworldMap({ src, ctx }: Props) {
  console.log("Render `OverworldMap`");
  const imageRef = useRef<HTMLImageElement>();

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      imageRef.current = image;
    };
  }, [src]);

  function draw() {
    if (imageRef.current) {
      ctx.drawImage(imageRef.current, 0, 0);
    }
  }

  return [draw];
}
