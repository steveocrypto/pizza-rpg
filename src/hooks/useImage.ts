import { useEffect, useState } from "react";

export function useImage(src: string): HTMLImageElement | undefined {
  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setImage(image);
    };
  }, [src]);

  return image;
}
