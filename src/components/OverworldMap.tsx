import { Map } from "constants/maps";
import { useContext } from "react";
import { CanvasContext } from "routes/ComponentBased";

interface Props {
  map: Map;
}

export function OverworldMap({ map }: Props) {
  console.log("Render `OverworldMap`");
  const context = useContext(CanvasContext);
  if (!context) throw new Error("Missing context!");

  function drawLowerImage(ctx: CanvasRenderingContext2D) {
    console.log("Drawing lower image...");
    const image = new Image();
    image.src = map.lowerSrc;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
  }

  function drawUpperImage(ctx: CanvasRenderingContext2D) {
    console.log("Drawing upper image...");
    const image = new Image();
    image.src = map.upperSrc;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
  }

  drawLowerImage(context.ctx);
  drawUpperImage(context.ctx);

  return null;
}
