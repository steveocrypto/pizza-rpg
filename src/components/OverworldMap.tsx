import { useContext, useEffect, useRef } from "react";
import { CanvasContext } from "routes/ComponentBased";

interface Props {
  src: string;
}

export function OverworldMap({ src }: Props) {
  console.log("Render `OverworldMap`");
  const context = useContext(CanvasContext);
  if (!context) throw new Error("Missing context!");

  const image = useRef(createImage(src));

  function createImage(src: string) {
    const image = new Image();
    image.src = src;
    return image;
  }

  useEffect(() => {
    context.ctx.drawImage(image.current, 0, 0);
  });

  return null;
}
