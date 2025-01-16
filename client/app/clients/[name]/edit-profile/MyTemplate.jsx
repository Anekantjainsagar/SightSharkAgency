"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MyTemplate = ({ data, idx }) => {
  const popupRef = useRef();
  const [show, setShow] = useState(false);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className="border border-gray-300/10 p-2.5 rounded-lg cursor-pointer">
      <Image
        src={data?.path}
        alt={data?.title}
        width={1000}
        height={1000}
        className="rounded-lg"
      />
      <div className="flex items-center justify-between mt-1.5 relative">
        <p className="text-center mt-1.5">{data?.title}</p>
        <BsThreeDotsVertical
          className=""
          onClick={() => {
            setShow(!show);
          }}
        />
        {show && (
          <div
            ref={popupRef}
            className={`absolute bg-[#171C2A]/50 ${
              idx % 2 == 0 ? "-right-[6.5vw]" : "right-0"
            } top-10 backdrop-blur-2xl min-[1600px]:text-sm text-xs border border-gray-200/20 rounded-md`}
          >
            <p
              onClick={() => {}}
              className="px-2 py-1.5 hover:bg-gray-200/10 cursor-pointer rounded-md"
            >
              Edit Template
            </p>
            <p
              onClick={() => {}}
              className="px-2 py-1.5 hover:bg-gray-200/10 cursor-pointer rounded-md"
            >
              Remove Template
            </p>
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default MyTemplate;
