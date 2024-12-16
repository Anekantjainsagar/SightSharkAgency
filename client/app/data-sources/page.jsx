"use client";
import React, { useContext, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AddAgency from "@/app/Components/agencies/AddAgency";
import Context from "../Context/Context";
import Image from "next/image";
import { IoReload } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import toast from "react-hot-toast";
import { BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";

function formatName(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const DataSources = () => {
  const { platformsData } = useContext(Context);
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
            <div className="flex items-center justify-between">
              <h3 className="text-xl min-[1600px]:text-2xl font-semibold">
                All Data Sources{" "}
                <span className="text-lg min-[1600px]:text-xl text-white/80">
                  ({platformsData?.platforms?.length})
                </span>
              </h3>
              <button className="bg-newBlue text-white flex items-center gap-x-2 rounded-lg px-6 py-3">
                <TfiReload />
                Refresh All
              </button>
            </div>
            <div className="mt-5 border border-gray-200/5 h-[75vh] rounded-2xl">
              <div className="h-fit p-6 grid grid-cols-6 gap-5">
                {platformsData?.platforms?.map((e, i) => {
                  return <Block e={e} key={i} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Block = ({ e }) => {
  const { userData } = useContext(Context);
  const [isRotating, setIsRotating] = useState(false);

  const handleReloadClick = async () => {
    setIsRotating(true);

    const token = getCookie("token");
    const url = `${BACKEND_URI}/data-refresh/refersh?agency_id=${encodeURIComponent(
      userData?.agency_id
    )}&script_name=${encodeURIComponent(e?.platform)}`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token.trim()}`,
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        console.error("Fetch Error:", response.statusText);
        toast.error("Internal Server Error");
        return;
      }

      const responseData = await response.json();
      if (responseData?.message?.includes("Failed")) {
        toast.error(responseData.message);
      } else {
        toast.success(responseData.message);
      }
    } catch (err) {
      console.error("Fetch Error:", err.message);
      toast.error("Internal Server Error");
    }

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  return (
    <div className="border border-gray-400/20 rounded-2xl p-2">
      <div className="py-10 border border-gray-400/20 rounded-2xl cursor-pointer flex flex-col text-white justify-center items-center lg:px-0 px-1 h-fit">
        <Image
          src={e?.logo}
          alt={e?.logo?.src}
          width={1000}
          height={1000}
          className="aspect-square object-contain w-2/12"
        />
        <p className="text-sm text-center min-[1600px]:text-base cursor-pointer mt-2">
          {formatName(e?.platform)}
        </p>
      </div>
      <div className="mt-2 flex items-end justify-between px-2">
        <p className="text-[10px] min-[1600px]:text-xs cursor-pointer">
          Last Refresh Time
          <br />
          {new Date(e?.last_run).toString().slice(4, 21)}
        </p>
        <IoReload
          className={`text-lg cursor-pointer transition-transform ${
            isRotating ? "animate-spin" : ""
          }`}
          onClick={handleReloadClick}
        />
      </div>
    </div>
  );
};

export default DataSources;
