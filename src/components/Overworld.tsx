import { useContext, useLayoutEffect } from "react";
import { useOverworldMap } from "hooks/useOverworldMap";
import { CanvasContext } from "routes/ComponentBased";
import { useGameObjects } from "hooks/useGameObjects";

export function Overworld() {
  console.log("Render `Overworld`");
  const context = useContext(CanvasContext);
  if (!context) throw new Error("No context found");
  const { ctx, canvas, map } = context;

  const [drawLower] = useOverworldMap({ src: map.lowerSrc, ctx });
  const [drawObjects] = useGameObjects({ objects: map.gameObjects, ctx });
  const [drawUpper] = useOverworldMap({ src: map.upperSrc, ctx });

  useLayoutEffect(() => {
    let timerId: number;

    // Game loop
    const step = () => {
      console.log("Step!");

      //Clear off the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawLower();
      drawObjects();
      drawUpper();
      timerId = requestAnimationFrame(step);
    };

    timerId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(timerId);
  });

  return null;
}
