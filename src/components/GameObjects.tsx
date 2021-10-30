import { GameObjectsType } from "constants/functionalMaps";
import { GameObject } from "./GameObject";

interface Props {
  gameObjects: GameObjectsType;
}

export function GameObjects({ gameObjects }: Props) {
  console.log(gameObjects);
  return (
    <>
      {Object.values(gameObjects).map((gameObject, index) => (
        <GameObject key={index} gameObject={gameObject} />
      ))}
    </>
  );
}
