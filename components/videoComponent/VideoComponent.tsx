"use client";
import React, { useRef, useState } from "react";

function VideoComponent({setImage}:any ) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frameNumber, setFrameNumber] = useState<number>(0);

  const handleTimeUpdate = async () => {
    if (videoRef.current && videoRef.current.currentTime) {
      const currentFrameNumber = Math.floor(videoRef.current.currentTime * 1);
      setFrameNumber(currentFrameNumber);
    }
  };

  const handleLoadedMetadata = () => {
    // Calculate frame rate when metadata of the video is loaded
    if (videoRef.current)
      console.log(
        videoRef.current.duration > 0
          ? videoRef.current.duration / videoRef.current.duration
          : 0
      );
  };

  const handleTakeSnap = async () => {
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        frameNumber,
      }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        console.log(objectURL);
        setImage(objectURL);
  
      });
  };

  return (
    <div className="border border-black w-full min-h-[90vh]">
      <video
        ref={videoRef}
        controls
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      {/* <p>Current Frame Number: {frameNumber}</p> */}
      <button type="button" onClick={handleTakeSnap}>
        Take snap
      </button>
     
    </div>
  );
}

export default VideoComponent;
