"use client";
import axios from "axios";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

export default function StreamPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string>("");

  const rtspurl = "rtsp://localhost:8554/live/1"; //enter the rtsp url here

  const httpRequest = (url: string) => {
    axios.get(`http://127.0.0.1:3002/stream?rtsp=${url}`);
  };

  const startRTSPFeed = () => {
    httpRequest(rtspurl);
  };

  return (
    <>
      <button onClick={startRTSPFeed} className="mr-10">
        Start Feed
      </button>
      <button
        onClick={() => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const imgDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setImage(imgDataUrl);
        }}
      >
        Capture
      </button>
      <div>
        <span>--------------------------</span>
        {image && (
          <>
            <h2>Captured Images</h2>
            <img src={image} alt="image" className="w-[300px] h-[300px]" />
          </>
        )}
      </div>

      <span>--------------------------</span>
      <h2>Live Streaming</h2>
      <canvas
        ref={canvasRef}
        id="stream-canvas"
        className="w-[500px] h-[400px]"
      ></canvas>
      <Script src="jsmpeg.min.js" id="jsmpeg"></Script>
    </>
  );
}
