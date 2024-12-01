import Context from "@/app/Context/Context";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineFilter } from "react-icons/ai";

const FilterData = () => {
  const { agencies } = useContext(Context);
  const [selectedOption, setSelectedOption] = useState("Report Name");
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selectedOption === "Report Name") {
      setData(agencies?.data?.map((e) => e?.client_name));
    } else if (selectedOption == "Report Type") {
      setData(["Parent Report", "Child Report"]);
    } else {
      setData(agencies?.data?.map((e) => e?.template_name));
    }
  }, [selectedOption]);

  return (
    <div className="flex items-center gap-x-4">
      <div className="relative w-[10.5vw]">
        <select
          className="bg-transparent px-4 w-full py-0.5 outline-none border border-gray-400 text-gray-400 rounded-md appearance-none"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {["Report Name", "Report Type", "Template Name"].map((e, i) => {
            return (
              <option key={i} className="bg-main">
                {e}
              </option>
            );
          })}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div className="relative">
        {!isOpen ? (
          <AiOutlineFilter
            className="text-3xl text-gray-400 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <AiOutlineClose
            className="text-3xl text-gray-400 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
        <Popup data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

const Popup = ({ data, isOpen, setIsOpen }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div
        ref={popupRef}
        className="absolute right-0 bg-main top-11 w-[14vw] flex flex-col rounded-lg items-center"
      >
        {data?.map(
          (e, i) =>
            e && (
              <p
                key={i}
                className="cursor-pointer text-white py-2 hover:bg-gray-800 rounded-lg w-full text-center"
              >
                {e}
              </p>
            )
        )}
      </div>
    )
  );
};

export default FilterData;
