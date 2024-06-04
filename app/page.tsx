"use client";
import "./page.css";
import { useState } from "react";
import axios from "axios";
import ResultGrid from "components/components/ResultComponent/ResultGrid";
import PreviewComponent from "components/components/previewComponent/PreviewComponent";

interface resultData {
  cam_id: string;
  image_path: string;
  timestamp: string;
}

const data = [
  {
  
  }
]

export default function Home() {
  const [image, setImage] = useState("");
  const [result, setResult] = useState();
  const [datetime, setDatetime] = useState(["", ""]);
  const [file, setFile] = useState("");
  const [message, setMessage] = useState('');

  const handleSubmitImage = async (e:any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    console.log(file)
    try {
      const res = await axios.post('http://localhost:7003/match_images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res?.status === 200) {
        const data = res.data.message;
      console.log(res)
        const restructuredData = data.map((val: resultData) => {
          const decodedImageData = atob(val.image_path);
  
          const uint8Array = new Uint8Array(decodedImageData.length);
          for (let i = 0; i < decodedImageData.length; i++) {
            uint8Array[i] = decodedImageData.charCodeAt(i);
          }
  
          const blob = new Blob([uint8Array], { type: "image/jpg" });
  
          const imageUrl = URL.createObjectURL(blob);
          return { ...val, image_path: imageUrl };
        });
  
        setResult(restructuredData);
      setMessage(res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to upload image');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (datetime[0] === "" || datetime[1] === "") {
      return window.alert("Please select date range");
    }
    const splitStartTimestamp = `${datetime[0].split("T")[0]} ${
      datetime[0].split("T")[1]
    }`;
    const splitEndTimestamp = `${datetime[1].split("T")[0]} ${
      datetime[1].split("T")[1]
    }`;

    const params = {
      start_timestamp: splitStartTimestamp,
      end_timestamp: splitEndTimestamp,
    };

    const API = await axios.get("http://192.168.50.226:6002/vision", { params });
    if (API?.status === 200) {
      const data = API.data.image_data;

      const restructuredData = data.map((val: resultData) => {
        const decodedImageData = atob(val.image_path);

        const uint8Array = new Uint8Array(decodedImageData.length);
        for (let i = 0; i < decodedImageData.length; i++) {
          uint8Array[i] = decodedImageData.charCodeAt(i);
        }

        const blob = new Blob([uint8Array], { type: "image/jpg" });

        const imageUrl = URL.createObjectURL(blob);
        return { ...val, image_path: imageUrl };
      });

      setResult(restructuredData);
    } else {
    }
  };

  return (
    <main
      className={`flex min-h-screen  ${result ? "p-10" : "items-center  p-10"}`}
    >
      <div className="container w-full h-full">
        <ResultGrid result={result} />
        <PreviewComponent
          image={image}
          handleSubmit={handleSubmit}
          setDatetime={setDatetime}
          datetime={datetime}
          file={file}
    setFile={setFile}
    handleSubmitImage={handleSubmitImage}
        />
       
      </div>
      {/* {result ? (
      ) : (
        <div className="container w-full h-full">
          <VideoComponent setImage={setImage} />
        </div>
      )} */}
    </main>
  );
}
