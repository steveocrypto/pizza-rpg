import { useEffect } from "react";
import { Maps } from "constants/functionalMaps";
import { OverworldMap } from "./OverworldMap";
import { GameObjects } from "./GameObjects";

export function Overworld() {
  console.log("Render `Overworld`");
  const map = Maps.DemoRoom;

  useEffect(() => {
    // Game loop
    const step = () => {
      requestAnimationFrame(() => {
        step();
      });
    };

    step();
  });

  return (
    <>
      <OverworldMap src={map.lowerSrc} />
      <GameObjects gameObjects={map.gameObjects} />
      <OverworldMap src={map.upperSrc} />
    </>
  );
}
