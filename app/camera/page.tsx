"use client";
import React, { useState } from "react";

function page() {
  const [formData, setFormData] = useState({
    cam_id: "",
    ip_address: "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ cam_id: "", ip_address: "" });
  };

  return (
    <div className="w-full h-full min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col mt-10 max-w-[300px] w-full mx-auto"
      >
        <h2 className="text-2xl font-bold mb-10">Add Camera</h2>
        <div className="w-full">
          <label
            htmlFor="cam_id"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Camera ID
          </label>
          <div className="mt-1">
            <input
              type="cam_id"
              name="cam_id"
              id="cam_id"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              value={formData.cam_id}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className="w-full mt-5">
          <label
            htmlFor="ip_address"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            IP Address
          </label>
          <div className="mt-1">
            <input
              type="ip_address"
              name="ip_address"
              id="ip_address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
              value={formData.ip_address}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-7 bg-indigo-600 px-2 py-1 rounded-lg text-white text-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default page;
