"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../app/page.css";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "./useDebounceEffect";
import { canvasPreview } from "./canvasPreview";

function PreviewComponent({
  image,
  handleSubmit,
  setDatetime,
  datetime,
  file,
  setFile,
  handleSubmitImage
}: {
  image: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setDatetime: React.Dispatch<React.SetStateAction<string[]>>;
  datetime: any;
  file: string;
  handleSubmitImage: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setFile: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [value, setValue] = useState(60);

  const [load, setLoad] = useState(true);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);

  const [open, setOpen] = useState(false);

  const handleDateTime = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    let value = event.target.value;
    if (id === 0) {
      setDatetime([value, datetime[1]]);
    } else {
      setDatetime([datetime[0], value]);
    }
  };

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };
  // async function blobToArrayBuffer() {
  //   return new Promise((resolve, reject) => {
  //     const previewCanvas = previewCanvasRef.current as HTMLCanvasElement;

  //     if (!previewCanvas || !completedCrop) {
  //       reject(new Error("Crop canvas does not exist"));
  //     }

  //     const offscreen = new OffscreenCanvas(
  //       completedCrop?.width || 0,
  //       completedCrop?.height || 0
  //     );
  //     const ctx = offscreen.getContext("2d");
  //     if (!ctx) {
  //       reject(new Error("No 2d context"));
  //     }
  //     if (ctx) {
  //       ctx.drawImage(
  //         previewCanvas,
  //         0,
  //         0,
  //         previewCanvas.width,
  //         previewCanvas.height,
  //         0,
  //         0,
  //         offscreen.width,
  //         offscreen.height
  //       );
  //     }

  //     previewCanvas.toBlob((blob) => {
  //       if (blob) {
  //         const reader = new FileReader();

  //         reader.readAsArrayBuffer(blob);

  //         reader.onloadend = () => {
  //           const arrayBuffer = reader.result;
  //           resolve(arrayBuffer);
  //         };

  //         reader.onerror = () => {
  //           reject(new Error("Error reading blob as array buffer"));
  //         };
  //       } else {
  //         reject(new Error("Blob is empty or null"));
  //       }
  //     });
  //   });
  // }

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: "%",
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight
      ),
      mediaWidth,
      mediaHeight
    );
  }
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

  const fetchImage = async () => {
    let response = await axios.get(image);

    if (response.status === 200) {
      setLoad(false);
      setOpen(true);
    } else setLoad(true);
  };
  useEffect(() => {
    fetchImage();
  }, [image]);

  return (
    <div className="border border-black w-full h-[90vh] p-1 overflow-auto">
      <h1 className="font-semibold text-xs text-[#494B4D] my-5">
        Auto-Detection
      </h1>

      <form onSubmit={handleSubmit}>
        {/* {image && completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: "1px solid black",
              objectFit: "contain",
              width: "100%",
              height: completedCrop?.height || 0,
            }}
          />
        )} */}
        {/* {image && ( */}
        <div>
          {/* Time Line */}
          <p className="font-semibold text-xs text-[#494B4D] my-3">Timeline</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-xs text-[#494B4D] my-1">From</p>
              <input
                id="Fromtimeline"
                className="font-semibold text-xs text-[#494B4D]"
                type="datetime-local"
                name="Fromtimeline"
                min="2000-06-01T08:30"
                max="2024-06-30T16:30"
                value={datetime[0].toString()}
                onChange={(e) => handleDateTime(e, 0)}
              />
            </div>

            <div>
              <p className="font-semibold text-xs text-[#494B4D] my-1">To</p>
              <input
                id="Totimeline"
                className="font-semibold text-xs text-[#494B4D]"
                type="datetime-local"
                name="Totimeline"
                min="2000-06-01T08:30"
                max="2024-06-30T16:30"
                value={datetime[1].toString()}
                onChange={(e) => handleDateTime(e, 1)}
              />
            </div>
          </div>
          {/* Range Slider */}
          {/* <p className="font-semibold text-xs text-[#494B4D] my-5">
            Sensitivity
          </p> */}
          {/* <div className="relative w-full">
            <input
              type="range"
              id="slider"
              name="temp3"
              list="values"
              min={20}
              max={100}
              value={value}
              onChange={handleInputChange}
            />

            <datalist id="values">
              <option
                value="20"
                label="20"
                className="-rotate-90 font-semibold text-xs text-[#494B4D]"
              ></option>
              <option
                value="40"
                label="40"
                className="-rotate-90 font-semibold text-xs text-[#494B4D]"
              ></option>
              <option
                value="60"
                label="60"
                className="-rotate-90 font-semibold text-xs text-[#494B4D]"
              ></option>
              <option
                value="80"
                label="80"
                className="-rotate-90 font-semibold text-xs text-[#494B4D]"
              ></option>
              <option
                value="100"
                label="100"
                className="-rotate-90 font-semibold text-xs text-[#494B4D]"
              ></option>
            </datalist>
            <p className="font-semibold text-xs text-[#494B4D]">
              Value: {value}
            </p>
          </div> */}
          {/* Footer Buttons */}
          <div className="flex items-center justify-evenly">
            <button
              className="border border-gray-950 p-1 my-5 bg-red-600"
              onClick={handleOpen}
              type="button"
            >
              EDIT
            </button>
            <button
              className="border border-gray-950 p-1 my-5 bg-sky-500"
              type="submit"
            >
              SUBMIT
            </button>
          </div>
         
        </div>
        {/* )} */}
      </form>
      <div className=''>
        
        <div className="flex items-center justify-evenly">
         <h2 className="font-semibold text-xs text-[#494B4D] my-3">Upload Image</h2>
         <form onSubmit={handleSubmitImage}>
           <input className="font-semibold text-xs text-[#494B4D]" type="file" onChange={handleFileChange} />

           <button className='border border-gray-950 p-1 my-5 bg-red-600'
            type="submit"
            
            >
              Upload
            </button>
         </form>
         </div>
       </div>
      {/* Modal Box */}
      {open && image && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              height: "95%",
              width: "64%",
              margin: "auto",
              padding: "2%",
              border: "2px solid #000",
              borderRadius: "10px",
              boxShadow: "2px solid black",
              overflow: "hidden",
            }}
          >
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              // aspect={aspect}
              // minWidth={400}
              minHeight={10}
              // circularCrop
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={image}
                onLoad={onImageLoad}
                className="border border-black w-full"
              />
            </ReactCrop>
            <div className="flex justify-end">
              <button
                className="border border-black p-1 bg-red-500"
                onClick={handleClose}
              >
                Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreviewComponent;
