import React from "react";

const AgencySmallBlock = ({ status }) => {
  return (
    <div className="py-3 px-7 border-gray-400/5 border-y grid agencySmallBlockGrid items-center cursor-pointer text-textGrey mainText12">
      <div className="inline-flex items-start">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="before:content[''] peer relative h-6 w-6 rounded-md cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
            id="check"
          />
          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
      </div>
      <h5>Alpha solutions</h5>
      <div
        className={`status-${status?.toLowerCase()} w-fit mx-auto px-2.5 border-2 py-0.5 rounded-2xl`}
      >
        {status}
      </div>
      <p className="text-center">13-08-2024</p>
      <p className="text-center">13-08-2024</p>
    </div>
  );
};

export default AgencySmallBlock;
