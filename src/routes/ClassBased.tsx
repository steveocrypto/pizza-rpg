import { useEffect, useRef } from "react";
import { Overworld } from "classes/Overworld";

export function ClassBased() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Init
  useEffect(() => {
    if (canvasRef.current) {
      const overworld = new Overworld({ canvas: canvasRef.current });
      overworld.init();
    }
  }, []);

  return (
    <div className="pt-20">
      <div
        style={{ width: 352, height: 198 }}
        className="game-container relative border border-gray-700 mx-auto transform scale-300 origin-top"
      >
        <canvas ref={canvasRef} className="game-canvas" width={352} height={198} />
      </div>
    </div>
  );
}
