"use client";
import React, {
  useState,
} from "react";
import RightSide from "@/app/Components/Login/RightSide";
import { useRouter } from "next/navigation";
import  { Toaster } from "react-hot-toast";
// import axios from "axios";
// import { BACKEND_URI } from "@/app/utils/url";
// import Cookies from "js-cookie";
// import Context from "../Context/Context";
import Image from "next/image";
import Info from "@/app/Components/Login/Info";

const App = () => {
  const history = useRouter();
  const [page, setPage] = useState(1);
  const [user, setUser] = useState({
    dataFreq: "",
    bucketName: "",
    dataTimezone: "",
    switchAcc1: "",
    switchAcc2: "",
  });
  // const { checkToken } = useContext(Context);

  return (
    <div className="bg-[#091022] w-full flex items-start justify-between h-[100vh]">
      <Toaster />
      <div className="w-7/12 p-[2vw] flex flex-col items-center justify-center h-full">
        <div className="text-white flex flex-col items-center w-7/12 px-5">
          <div className="flex items-center gap-x-6">
            <Image
              src="/logo.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="w-[70px]"
            />
            <h4 className="text-[38.5px] uppercase">SIGHTSHARK</h4>
          </div>
          <div className="w-11/12 mt-[80px]">
            <div className="flex items-center justify-between">
              <div
                className={`h-[6px] rounded-full w-[49%] ${
                  page >= 1 ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`h-[6px] rounded-full w-[49%] ${
                  page >= 2 ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
            </div>
            {page == 1 ? (
              <div className="w-full">
                <div className="flex flex-col mt-10 mb-6">
                  <label htmlFor="bucketName" className="mb-1.5 text-base">
                    Google Cloud Bucket Name
                  </label>
                  <input
                    id="bucketName"
                    value={user?.bucketName}
                    onChange={(e) => {
                      setUser({ ...user, bucketName: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Google Cloud Bucket Name"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col my-6">
                  <label htmlFor="dataFreq" className="mb-1.5 text-base">
                    Data Refresh Frequency
                  </label>
                  <select
                    id="dataFreq"
                    value={user?.dataFreq}
                    onChange={(e) => {
                      setUser({ ...user, dataFreq: e.target.value });
                    }}
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                  >
                    <option className="bg-main"></option>
                  </select>
                </div>
                <div className="flex flex-col my-6">
                  <label htmlFor="dataTimezone" className="mb-1.5 text-base">
                    Data Load Timezone
                  </label>
                  <select
                    id="dataTimezone"
                    value={user?.dataTimezone}
                    onChange={(e) => {
                      setUser({ ...user, dataTimezone: e.target.value });
                    }}
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                  >
                    <option className="bg-main"></option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="flex flex-col mt-10 mb-6">
                  <label
                    htmlFor="switchAcc1"
                    className="mb-1.5 text-base flex items-center"
                  >
                    Service Account 1<Info />
                  </label>
                  <textarea
                    id="switchAcc1"
                    value={user?.switchAcc1}
                    onChange={(e) => {
                      setUser({ ...user, switchAcc1: e.target.value });
                    }}
                    rows={3}
                    placeholder="Service Account 1"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                  ></textarea>
                </div>
                <div className="flex flex-col my-6">
                  <label
                    htmlFor="switchAcc2"
                    className="mb-1.5 text-base flex items-center"
                  >
                    Service Account 2 <Info />
                  </label>
                  <textarea
                    id="switchAcc2"
                    value={user?.switchAcc2}
                    onChange={(e) => {
                      setUser({ ...user, switchAcc2: e.target.value });
                    }}
                    rows={3}
                    placeholder="Service Account 2"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                  ></textarea>
                </div>
              </div>
            )}
            <div
              className={`flex ${page > 1 ? "justify-between" : "justify-end"}`}
            >
              {page != 1 && (
                <button
                  onClick={() => {
                    setPage(page - 1);
                  }}
                  className="w-4/12 py-3 bg-[#898989]/15 rounded-[10px] text-base"
                >
                  Previous
                </button>
              )}
              <button
                onClick={() => {
                  if (page == 1) {
                    setPage(page + 1);
                  } else {
                    history.push("/overview");
                  }
                }}
                className="w-4/12 py-3 bg-newBlue rounded-[10px] text-base"
              >
                {page == 1 ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <RightSide />
    </div>
  );
};

export default App;
