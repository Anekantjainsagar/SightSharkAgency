"use client";
import React, { useContext, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Notify from "@/app/Components/Overview/Notify";
import Context from "../Context/Context";

const Alerts = () => {
  const { criticalNotifications, alerts } = useContext(Context);
  const [page, setPage] = useState(1);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="md:w-[85%] w-full bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full py-2 md:px-6 min-[1600px]:py-6">
            <div className="text-white w-full rounded-xl p-3 md:p-4 bg-[#171C2A]/20 border border-gray-500/5">
              <div className="flex items-center gap-x-4 md:gap-x-8">
                {["Critical Notifications", "Alerts"].map((e, i) => {
                  return (
                    <h3
                      className={`text-sm md:text-base min-[1600px]:text-[20px] cursor-pointer ${
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
              <div className="gradient-line my-3 md:my-4"></div>
              {page == 1 ? (
                <div
                  className={`h-[80vh] md:h-[69vh] min-[1600px]:h-[72vh] pr-5 overflow-y-auto ${
                    criticalNotifications?.length == 0 &&
                    "flex items-center justify-center"
                  } small-scroller`}
                >
                  {criticalNotifications?.map((e, i) => {
                    return (
                      <Notify data={e} key={i} status={e?.type != "error"} />
                    );
                  })}
                  {criticalNotifications?.length == 0 && (
                    <p className="text-gray-400 md:text-xl">
                      No Critical Notifications Found
                    </p>
                  )}
                </div>
              ) : (
                <div
                  className={`h-[80vh] md:h-[69vh] min-[1600px]:h-[72vh] pr-5 overflow-y-auto ${
                    alerts?.length == 0 && "flex items-center justify-center"
                  } small-scroller`}
                >
                  {alerts?.map((e, i) => {
                    return (
                      <Notify data={e} key={i} status={e?.type != "error"} />
                    );
                  })}
                  {alerts?.length == 0 && (
                    <p className="text-gray-400 md:text-xl">No Alerts Found</p>
                  )}
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
