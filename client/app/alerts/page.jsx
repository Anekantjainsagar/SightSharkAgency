"use client";
import React, { useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AddAgency from "@/app/Components/agencies/AddAgency";
import Notify from "@/app/Components/Overview/Notify";

const Alerts = () => {
  const [page, setPage] = useState(1);
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
          <div className="text-white w-full py-2 px-6 min-[1600px]:py-6">
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5">
              <div className="flex items-center gap-x-8">
                {["Critical Notifications", "Alerts"].map((e, i) => {
                  return (
                    <h3
                      className={`text-[18px] min-[1600px]:text-[20px] cursor-pointer ${
                        i + 1 == page ? "text-white" : "text-gray-500"
                      }`}
                      onClick={() => {
                        setPage(i + 1);
                      }}
                      key={i}
                    >
                      {e}
                    </h3>
                  );
                })}
              </div>
              <div className="gradient-line my-4"></div>
              {page == 1 ? (
                <div className="h-[72vh] pr-5 overflow-y-auto small-scroller">
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                </div>
              ) : (
                <div className="h-[72vh] pr-5 overflow-y-auto small-scroller">
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                  <Notify status={true} />
                  <Notify status={false} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;