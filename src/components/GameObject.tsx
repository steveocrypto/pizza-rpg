import { useContext, useEffect, useRef } from "react";
import { CanvasContext } from "routes/ComponentBased";
import HeroImage from "assets/characters/people/hero.png";
import ShadowImage from "assets/characters/shadow.png";
import { GameObjectType } from "constants/functionalMaps";

interface Props {
  gameObject: GameObjectType;
}

export function GameObject({ gameObject }: Props) {
  console.log("Render `GameObject`");
  const context = useContext(CanvasContext);
  if (!context) throw new Error("Missing context!");
  const { x, y, src } = gameObject;

  const image = useRef(createImage(src || HeroImage));
  const shadowImage = useRef(createImage(ShadowImage));

  function createImage(src: string) {
    const image = new Image();
    image.src = src;
    return image;
  }

  useEffect(() => {
    context.ctx.drawImage(
      shadowImage.current,
      0, //left cut
      0, //top cut,
      32, //width of cut
      32, //height of cut
      x * 16 - 8,
      y * 16 - 18,
      32,
      32
    );

    context.ctx.drawImage(
      image.current,
      0, //left cut
      0, //top cut,
      32, //width of cut
      32, //height of cut
      x * 16 - 8,
      y * 16 - 18,
      32,
      32
    );
  });

  return null;
}
