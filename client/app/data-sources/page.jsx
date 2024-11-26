"use client";
import React, { useContext, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AddAgency from "@/app/Components/agencies/AddAgency";
import Context from "../Context/Context";
import Image from "next/image";
import { IoReload } from "react-icons/io5";

function formatName(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const DataSources = () => {
  const { mainDataSource } = useContext(Context);
  const [addAgency, setAddAgency] = useState(false);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <AddAgency showSubscribe={addAgency} setShowSubscribe={setAddAgency} />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg py-2 px-6 min-[1600px]:py-6">
            <h3 className="text-xl min-[1600px]:text-2xl font-semibold">
              All Data Sources{" "}
              <span className="text-lg min-[1600px]:text-xl text-white/80">
                ({mainDataSource?.length})
              </span>
            </h3>
            <div className="mt-5 grid grid-cols-6 gap-5 p-6 border border-gray-200/5 h-[75vh] rounded-2xl">
              {mainDataSource?.map((e, i) => {
                return (
                  <div key={i}>
                    <div className="video-box-shadow py-10 rounded-2xl hover:rounded-xl hover:scale-105 transition-all cursor-pointer flex flex-col text-white justify-center items-center lg:px-0 px-1 h-fit">
                      <Image
                        src={e?.img_link}
                        alt={e?.img_link?.src}
                        width={1000}
                        height={1000}
                        className="aspect-squre object-contain w-2/12"
                      />{" "}
                      <p className="text-base min-[1600px]:text-lg cursor-pointer mt-2">
                        {formatName(e?.name)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-start justify-between px-2">
                      <p className="text-xs min-[1600px]:text-sm cursor-pointer">
                        Last Refresh Date & Time
                        <br />
                        {new Date(Date.now()).toString().slice(4, 21)}
                      </p>
                      <IoReload className="text-lg cursor-pointer" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSources;
