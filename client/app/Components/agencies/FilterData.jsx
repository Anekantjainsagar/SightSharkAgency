import Context from "@/app/Context/Context";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const FilterData = () => {
  const { agencies } = useContext(Context);

  return (
    <div className="flex items-center md:justify-start justify-end md:w-fit w-full md:gap-x-4 md:mt-0 mt-2">
      <div className="flex">
        {[
          {
            title: "Report Name",
            options: agencies?.data?.map((e) => e?.client_name),
          },
          { title: "Report Type", options: ["Parent Report", "Child Report"] },
          {
            title: "Template Name",
            options: agencies?.data?.map((e) => e?.template_name),
          },
        ].map((e, i) => {
          return (
            <div
              key={i}
              className="relative min-[1600px]:w-[10.5vw] md:w-[12vw] w-fit border border-gray-400/20 text-gray-400 ml-2 md:ml-4 rounded-md"
            >
              <select
                className="bg-transparent px-2.5 md:px-4 py-1 md:py-2.5 min-[1600px]:py-3 outline-none appearance-none w-full min-[1600px]:text-base text-sm"
                // value={selectedOption}
                // onChange={(e) => setSelectedOption(e.target.value)}
              >
                {e?.options &&
                  [e?.title, ...e?.options]?.map((e, i) => {
                    return (
                      <option key={i} className="bg-main">
                        {e}
                      </option>
                    );
                  })}{" "}
              </select>
              <span className="absolute md:block hidden right-3 top-1/2 min-[1600px]:text-2xl text-xl -translate-y-1/2 pointer-events-none">
                <MdKeyboardArrowDown />
              </span>
            </div>
          );
        })}
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
