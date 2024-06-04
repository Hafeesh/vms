import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({
    file,
    setFile,
    handleSubmitImage
}:{
    file: string;
    handleSubmitImage: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    setFile: React.Dispatch<React.SetStateAction<string>>;
}) => {
  

  const handleFileChange = (e:any) => {
    setFile(e.target.files[0]);
  };


  return (
    <div className=''>
        
     <div className="flex items-center justify-evenly">
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmitImage}>
        <input type="file" onChange={handleFileChange} />
        <button className='border border-gray-950 p-1 my-5 bg-red-600' type="submit">Upload</button>
      </form>
      </div>
    </div>
  );
};

export default ImageUpload;
