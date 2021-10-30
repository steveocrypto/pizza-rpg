import { Overworld } from "components/Overworld";
import { createContext, useEffect, useRef, useState } from "react";
import { Maps, Map } from "constants/functionalMaps";

export const CanvasContext = createContext<{
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  map: Map;
} | null>(null);

export function ComponentBased() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [map, setMap] = useState(Maps.Kitchen);

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d"));
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex space-x-8 justify-end max-w-5xl pt-6 mx-auto w-full">
        <button
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          onClick={() => setMap(Maps.DemoRoom)}
        >
          Demo Room
        </button>
        <button
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          onClick={() => setMap(Maps.Kitchen)}
        >
          Kitchen
        </button>
      </div>
      <div
        style={{ width: 352, height: 198 }}
        className="mt-12 game-container relative border border-gray-700 mx-auto transform scale-300 origin-top"
      >
        <canvas ref={canvasRef} className="game-canvas" width={352} height={198} />
        {ctx && canvasRef.current && (
          <CanvasContext.Provider value={{ ctx, canvas: canvasRef.current, map }}>
            <Overworld />
          </CanvasContext.Provider>
        )}
      </div>
    </div>
  );
}
