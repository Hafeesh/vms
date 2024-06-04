import React, { Fragment, useState } from "react";

interface Result {
  cam_id: string;
  image_path: string;
  timestamp: string;
}

const ResultGrid = ({ result }: { result: Result[] | undefined }) => {
  const [active, setActive] = useState({});

  return (
    <Fragment>
      <div className="flex flex-col">
        <h1 className="text-3xl items-center mb-5">Results</h1>
        {result && result.length > 0 ? (
          <div className="grid grid-cols-3  gap-2">
            {result?.map((val: Result, index: number) => (
              <div
                className="flex flex-col  gap-1 relative overflow-hidden"
                key={index}
                onClick={() => setActive(val)}
              >
                <img
                  src={val.image_path}
                  alt=""
                  className="w-full h-full object-cover min-h-[250px]"
                />
                <div className="gap-1 absolute bottom-0 w-full opacity-35 bg-gray-500 p-2">
                  <h2 className="tex-xs font-normal leading-4 text-white opacity-1 mb-2">
                    Cam ID : {val.cam_id}
                  </h2>
                  <h2 className="tex-xs font-normal leading-4 text-white opacity-1">
                    Time : {val.timestamp}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h2 className="text-2xl font-bold text-center mt-10">No Results</h2>
        )}
      </div>
    </Fragment>
  );
};

export default ResultGrid;
