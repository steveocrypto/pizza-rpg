import { useEffect } from "react";
import { Maps } from "constants/maps";
import { OverworldMap } from "./OverworldMap";

export function Overworld() {
  console.log("Render `Overworld`");

  useEffect(() => {
    // Game loop
    const step = () => {
      console.log("Step!");
      requestAnimationFrame(() => {
        step();
      });
    };

    step();
  });

  return <OverworldMap map={Maps.DemoRoom} />;
}
