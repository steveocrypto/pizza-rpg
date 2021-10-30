import { Overworld } from "components/Overworld";
import { createContext, useEffect, useRef, useState } from "react";

export const CanvasContext = createContext<{
  ctx: CanvasRenderingContext2D;
} | null>(null);

export function ComponentBased() {
  console.log("Render `ComponentBased`");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, []);

  return (
    <div className="pt-20">
      <div
        style={{ width: 352, height: 198 }}
        className="game-container relative border border-gray-700 mx-auto transform scale-300 origin-top"
      >
        <canvas ref={canvasRef} className="game-canvas" width={352} height={198} />
        {ctx && (
          <CanvasContext.Provider value={{ ctx }}>
            <Overworld />
          </CanvasContext.Provider>
        )}
      </div>
    </div>
  );
}
