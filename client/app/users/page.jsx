"use client";
import React, { useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import UserDetailBlock from "@/app/Components/Users/UserDetailBlock";
import { FaPlus } from "react-icons/fa";
import AddUsers from "@/app/Components/Users/AddUsers";

const Overview = () => {
  const [page, setPage] = useState(1);
  const [showSubscribe, setShowSubscribe] = useState(false);

  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <AddUsers
        showSubscribe={showSubscribe}
        setShowSubscribe={setShowSubscribe}
      />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl">Users</h3>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setShowSubscribe(!showSubscribe);
                  }}
                  className="bg-newBlue px-6 py-3 rounded-xl ml-4 flex items-center gap-x-2 text-base"
                >
                  <FaPlus className="text-sm" /> Add Users
                </button>
                <button className="glass px-6 py-3 rounded-xl ml-4 text-base flex items-center gap-x-2 border border-gray-200/5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.83333 3.33337V16.6667M5.83333 16.6667L2.5 13.3334M5.83333 16.6667L9.16667 13.3334M14.1667 16.6667V3.33337M14.1667 3.33337L10.8333 6.66671M14.1667 3.33337L17.5 6.66671"
                      stroke="#ECECED"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Sort By
                </button>
              </div>
            </div>
            <div className="mt-5 border border-gray-200/5 rounded-2xl">
              <div className="grid bg-[#030021]/40 py-4 px-7 userBlockGrid items-center rounded-2xl">
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
                {["Name", "Access", "Status", "Joined", "Last Online"].map(
                  (e, i) => {
                    return (
                      <h5
                        key={i}
                        className="maintext14 font-light tracking-wider"
                      >
                        {e}
                      </h5>
                    );
                  }
                )}
              </div>
              <div className="h-[70vh]">
                <div className="overflow-y-auto small-scroller h-[89%]">
                  <UserDetailBlock status={"Online"} acess={"Owner"} />
                  <UserDetailBlock status={"Online"} acess={"Guest"} />
                  <UserDetailBlock status={"Online"} acess={"Admin"} />
                  <UserDetailBlock status={"Online"} acess={"Owner"} />{" "}
                  <UserDetailBlock status={"Online"} acess={"Guest"} />
                  <UserDetailBlock status={"Online"} acess={"Admin"} />
                  <UserDetailBlock status={"Online"} acess={"Guest"} />
                </div>
                <div className="h-[11%] px-6 flex items-center justify-between bg-[#030021]/40 rounded-2xl">
                  <div className="flex items-center justify-between w-full">
                    <button className="text-white bg-[#898989]/15 w-[145px] justify-center flex items-center px-4 py-3 rounded-lg mainText14">
                      <div className="mr-2 w-8">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ rotate: "180deg" }}
                        >
                          <path
                            d="M21 12L16 7M21 12L16 17M21 12H3"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                      Previous
                    </button>
                    <div className="gap-x-4 flex items-center">
                      {data?.slice(0, 3)?.map((e, i) => {
                        return (
                          <div
                            className={`w-[40px] h-[40px] rounded-lg flex items-center justify-center cursor-pointer ${
                              page == e ? "bg-newBlue" : "text-[#85888E]"
                            }`}
                            key={i}
                          >
                            {e}
                          </div>
                        );
                      })}
                      {data?.length - 6 > 0 && (
                        <span className="text-[#85888E]">...</span>
                      )}
                      {data
                        ?.slice(data?.length - 3, data?.length)
                        ?.map((e, i) => {
                          return (
                            <div
                              key={i}
                              className={`w-[40px] h-[40px] rounded-lg flex items-center justify-center cursor-pointer ${
                                page == e ? "bg-newBlue" : "text-[#85888E]"
                              }`}
                            >
                              {e}
                            </div>
                          );
                        })}
                    </div>
                    <button className="text-white bg-newBlue flex items-center w-[145px] justify-center px-4 py-3 rounded-lg mainText14">
                      Next
                      <div className="ml-2 w-8">
                        <svg
                          className="w-full h-full"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21 12L16 7M21 12L16 17M21 12H3"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
