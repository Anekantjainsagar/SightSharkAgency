import React, { useState } from "react";

const Info = () => {
  return (
    <PopoverComponent>
      <svg
        width="15"
        height="16"
        viewBox="0 0 15 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2"
      >
        <path
          d="M7.4987 10.6667V8.00004M7.4987 5.33337H7.50537M14.1654 8.00004C14.1654 11.6819 11.1806 14.6667 7.4987 14.6667C3.8168 14.6667 0.832031 11.6819 0.832031 8.00004C0.832031 4.31814 3.8168 1.33337 7.4987 1.33337C11.1806 1.33337 14.1654 4.31814 14.1654 8.00004Z"
          stroke="#85888E"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </PopoverComponent>
  );
};

const PopoverComponent = ({ children, placement = "top" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
      <div
        className={`absolute w-[200px] text-center ${
          placement === "bottom" ? "top-full mt-2" : "bottom-full mb-2"
        } w-[15vw] left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-300/5 rounded-lg shadow-lg p-2 z-10 text-[12px] transition-transform duration-300 ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        Manages internal google cloud services
      </div>
    </div>
  );
};

export default Info;
