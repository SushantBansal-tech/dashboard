import { useRef, useEffect } from "react";

export default function SignatureCanvas({ onSave }) {

  const canvasRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

  }, []);

  const startDraw = (e) => {

    drawing.current = true;

    const rect = canvasRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {

    if (!drawing.current) return;

    const rect = canvasRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext("2d");

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    drawing.current = false;
  };

  const clearCanvas = () => {

    const ctx = canvasRef.current.getContext("2d");

    ctx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const saveSignature = () => {

    const data = canvasRef.current.toDataURL("image/png");

    onSave(data);
  };

  return (

    <div>

      <h2 className="text-lg mb-2">Sign Below</h2>

      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        className="border mb-4 bg-white"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
      />

      <div className="space-x-4">

        <button
          onClick={clearCanvas}
          className="bg-gray-400 px-4 py-2 rounded text-white"
        >
          Clear
        </button>

        <button
          onClick={saveSignature}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Save Signature
        </button>

      </div>

    </div>
  );
}
