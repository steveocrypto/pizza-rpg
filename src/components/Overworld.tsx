import { useContext, useLayoutEffect } from "react";
import { Maps } from "constants/functionalMaps";
import { useOverworldMap } from "hooks/useOverworldMap";
import { CanvasContext } from "routes/ComponentBased";
import { useGameObjects } from "hooks/useGameObjects";

export function Overworld() {
  const context = useContext(CanvasContext);
  if (!context) throw new Error("No context found");
  const { ctx } = context;

  console.log("Render `Overworld`");
  const map = Maps.DemoRoom;

  const [drawLower] = useOverworldMap({ src: map.lowerSrc, ctx });
  const [drawObjects] = useGameObjects({ objects: map.gameObjects, ctx });
  const [drawUpper] = useOverworldMap({ src: map.upperSrc, ctx });

  useLayoutEffect(() => {
    let timerId: number;

    // Game loop
    const step = () => {
      console.log("Step!");
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
