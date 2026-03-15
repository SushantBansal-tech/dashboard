import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SignatureCanvas from "../components/SignatureCanvas";

export default function Details() {

  const { id } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);
  const [stream, setStream] = useState(null);

  const startCamera = async () => {

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true
    });

    videoRef.current.srcObject = mediaStream;
    setStream(mediaStream);
  };

  const capturePhoto = () => {

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    setPhoto(imageData);

    stream.getTracks().forEach(track => track.stop());
  };

  const handleMerge = (signatureData) => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.src = photo;

    img.onload = () => {

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const signImg = new Image();
      signImg.src = signatureData;

      signImg.onload = () => {

        ctx.drawImage(
          signImg,
          canvas.width - 200,
          canvas.height - 100,
          180,
          80
        );

        const finalImage = canvas.toDataURL("image/png");

        navigate("/analytics", {
          state: { auditImage: finalImage }
        });

      };

    };
  };

  return (

    <div className="p-10">

      <h1 className="text-2xl mb-6">
        Employee Verification (ID: {id})
      </h1>

      {!photo && (
        <div>

          <video
            ref={videoRef}
            autoPlay
            className="border mb-4"
            width="400"
          />

          <div className="space-x-4">

            <button
              onClick={startCamera}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Start Camera
            </button>

            <button
              onClick={capturePhoto}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Capture Photo
            </button>

          </div>

          <canvas ref={canvasRef} style={{ display: "none" }} />

        </div>
      )}

      {photo && (
        <div>

          <img
            src={photo}
            alt="Captured"
            className="border mb-4"
            width="400"
          />

          <SignatureCanvas onSave={handleMerge} />

        </div>
      )}

    </div>
  );
}
