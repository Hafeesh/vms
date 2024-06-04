import { useState } from "react";

const ImageDetais = ({ active }: any) => {
  return (
    <div className="flex flex-col border ">
      <div className="flex  bg-white justify-between  h-[36px] border   px-2">
        <div className="flex items-center h-full  py-1.5 gap-1 ">
          <h2 className="text-xs font-semibold leading-4">Properties: </h2>
          <h2 className="text-xs font-semibold leading-4 text-blue-600">
            Object
          </h2>
        </div>
        <div className="flex p-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <path
              d="M1.4525 7.23205L0.751221 6.53077L3.28199 3.98334L0.751221 1.4359L1.4525 0.734619L3.99994 3.26539L6.54737 0.734619L7.24865 1.4359L4.71789 3.98334L7.24865 6.53077L6.54737 7.23205L3.99994 4.70129L1.4525 7.23205Z"
              fill="#1C1B1F"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <div className="flex h-[28px]">
          <h2 className="flex items-center text-xs   font-semibold leading-4">
            Metadata
          </h2>
        </div>
        <h2 className="text-xs w-full font-normal leading-4 h-[28px]">
          Source: {active?.source || "Nil"}
        </h2>

        <h2 className="text-xs w-full font-normal leading-4 h-[28px]">
          Occurrence: {active?.occurrence || "Nil"}
        </h2>
      </div>
    </div>
  );
};

export default ImageDetais;
