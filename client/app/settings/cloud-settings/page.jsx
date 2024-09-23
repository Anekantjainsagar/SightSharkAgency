"use client";
import React, { useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import SettingsLeftbar from "@/app/Components/Settings/Leftbar";
import Info from "@/app/Components/Login/Info";

const CloudSettings = () => {
  const [data, setData] = useState({
    cloudBucket: "",
    loadTimezone: "",
    dataFreq: "",
    switchAcc1: "",
    switchAcc2: "",
  });

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute left-0 bottom-0 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute left-[40%] top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-0 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5">
          <Navbar />
          <div className="h-[85vh] w-full flex gap-x-5 justify-between items-start text-white">
            <SettingsLeftbar />
            <div className="w-8/12 h-fit justify-between flex flex-col items-start border border-gray-500/5 rounded-lg px-6 py-4 text-white">
              <div className="w-full">
                <h4 className="mainLogoSize font-semibold">Cloud Settings</h4>{" "}
                <div className="gradient-line my-4"></div>
                <h6 className="text-[20px] font-medium mt-5">
                  Google Cloud
                </h6>{" "}
                <div className="grid grid-cols-1 gap-y-6 mt-4 w-full">
                  <div className="flex flex-col">
                    <label htmlFor="cloudBucket" className="mb-1.5 text-base">
                      Google Cloud Bucket Name
                    </label>
                    <input
                      id="cloudBucket"
                      value={data?.cloudBucket}
                      onChange={(e) => {
                        setData({ ...data, cloudBucket: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Google Cloud Bucket Name"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="dataFreq" className="mb-1.5 text-base">
                      Data Refresh Frequency
                    </label>
                    <select
                      id="dataFreq"
                      value={data?.dataFreq}
                      onChange={(e) => {
                        setData({ ...data, dataFreq: e.target.value });
                      }}
                      type="text"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                    >
                      <option></option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="loadTimezone" className="mb-1.5 text-base">
                      Data Load Timezone
                    </label>
                    <select
                      id="loadTimezone"
                      value={data?.loadTimezone}
                      onChange={(e) => {
                        setData({ ...data, loadTimezone: e.target.value });
                      }}
                      type="text"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                    >
                      <option></option>
                    </select>
                  </div>
                </div>
                <div className="gradient-line my-8"></div>
                <h6 className="text-[20px] font-medium mt-5">
                  Service Accounts
                </h6>{" "}
                <div className="grid grid-cols-1 gap-y-6 mt-4 w-full">
                  <div className="flex flex-col">
                    <label
                      htmlFor="switchAcc1"
                      className="mb-1.5 text-base flex items-center"
                    >
                      Service Account 1<Info />
                    </label>
                    <textarea
                      id="switchAcc1"
                      value={data?.switchAcc1}
                      onChange={(e) => {
                        setData({ ...data, switchAcc1: e.target.value });
                      }}
                      rows={2}
                      placeholder="Service Account 1"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                    ></textarea>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="switchAcc2"
                      className="mb-1.5 text-base flex items-center"
                    >
                      Service Account 2 <Info />
                    </label>
                    <textarea
                      id="switchAcc2"
                      value={data?.switchAcc2}
                      onChange={(e) => {
                        setData({ ...data, switchAcc2: e.target.value });
                      }}
                      rows={2}
                      placeholder="Service Account 2"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-end w-full">
                <button
                  className={`bg-[#898989]/15 font-semibold w-[160px] px-8 py-3 rounded-xl ml-4`}
                  onClick={() => {}}
                >
                  Discard
                </button>
                <button
                  className={`bg-newBlue font-semibold w-[160px] px-8 py-3 rounded-xl ml-4`}
                  onClick={() => {}}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudSettings;
