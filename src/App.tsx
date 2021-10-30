import { useEffect, useRef } from "react";
import { Overworld } from "classes/Overworld";
import "./index.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Init
  useEffect(() => {
    if (canvasRef.current) {
      const overworld = new Overworld({ canvas: canvasRef.current });
      overworld.init();
    }
  }, []);

  return (
    <div className="font-sans antialiased bg-gray-800 min-h-screen">
      <div className="pt-20">
        <div
          style={{ width: 352, height: 198 }}
          className="game-container relative border border-gray-700 mx-auto transform scale-300 origin-top"
        >
          <canvas ref={canvasRef} className="game-canvas" width={352} height={198} />
        </div>
      </div>
    </div>
  );
}

export default App;
