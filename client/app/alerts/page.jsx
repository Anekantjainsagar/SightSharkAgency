"use client";
import React, { useContext, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Notify from "@/app/Components/Overview/Notify";
import Context from "../Context/Context";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const Alerts = () => {
  const { criticalNotifications, alerts, getAlerts, getCriticalNotifications } =
    useContext(Context);
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
            <div className="text-white w-full rounded-xl bg-[#171C2A]/20 border border-gray-500/5">
              <div className="flex items-center gap-x-4 md:gap-x-8 p-3 md:p-4">
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
              <div className="gradient-line mb-3 md:mb-4"></div>
              {page == 1 ? (
                <div
                  className={`h-[80vh] md:h-[69vh] min-[1600px]:h-[74vh] pr-5 overflow-y-auto ${
                    criticalNotifications?.alerts?.length == 0 &&
                    "flex items-center justify-center"
                  } small-scroller`}
                >
                  <div
                    className={`h-[90%] px-3 md:px-4 w-full overflow-y-auto ${
                      criticalNotifications?.notifications?.length == 0 &&
                      "flex items-center justify-center"
                    } small-scroller`}
                  >
                    {criticalNotifications?.notifications?.map((e, i) => {
                      return (
                        <Notify data={e} key={i} status={e?.type != "error"} />
                      );
                    })}
                    {criticalNotifications?.notifications?.length == 0 && (
                      <p className="text-gray-400 md:text-xl text-center">
                        No Critical Notifications Found
                      </p>
                    )}
                  </div>
                  <div className="h-[10%] gap-x-4 px-6 flex items-center justify-center bg-[#030021]/40 rounded-2xl">
                    <MdOutlineKeyboardDoubleArrowLeft
                      onClick={() => {
                        if (criticalNotifications?.current_page != 1) {
                          getCriticalNotifications(1);
                        }
                      }}
                      className={`text-2xl ${
                        criticalNotifications?.current_page != 1
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                    <MdOutlineChevronLeft
                      onClick={() => {
                        if (criticalNotifications?.current_page != 1) {
                          getCriticalNotifications(agencies?.current_page - 1);
                        }
                      }}
                      className={`text-2xl ${
                        criticalNotifications?.current_page != 1
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                    {[...Array(criticalNotifications?.total_pages).keys()]
                      .map((i) => i + 1)
                      ?.map((e, i) => {
                        return (
                          <div
                            className={`w-[35px] md:w-[30px] cursor-pointer min-[1600px]:w-[40px] h-[35px] md:h-[30px] text-sm min-[1600px]:text-base min-[1600px]:h-[40px] rounded-lg flex items-center justify-center ${
                              criticalNotifications?.current_page == e
                                ? "bg-newBlue"
                                : "text-[#85888E]"
                            }`}
                            key={i}
                            onClick={() => {
                              getCriticalNotifications(e);
                            }}
                          >
                            {e}
                          </div>
                        );
                      })}
                    <MdOutlineChevronRight
                      onClick={() => {
                        if (
                          criticalNotifications?.current_page !=
                          criticalNotifications?.total_pages
                        ) {
                          getCriticalNotifications(
                            criticalNotifications?.current_page + 1
                          );
                        }
                      }}
                      className={`text-2xl ${
                        criticalNotifications?.current_page !=
                        criticalNotifications?.total_pages
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />{" "}
                    <MdOutlineKeyboardDoubleArrowRight
                      onClick={() => {
                        if (
                          criticalNotifications?.current_page !=
                          criticalNotifications?.total_pages
                        ) {
                          getCriticalNotifications(
                            criticalNotifications?.total_pages
                          );
                        }
                      }}
                      className={`text-2xl ${
                        criticalNotifications?.current_page !=
                        criticalNotifications?.total_pages
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`h-[80vh] md:h-[69vh] min-[1600px]:h-[74vh] pr-5 overflow-y-auto ${
                    alerts?.alerts?.length == 0 &&
                    "flex items-center justify-center"
                  } small-scroller`}
                >
                  <div
                    className={`h-[90%] w-full px-3 md:px-4 overflow-y-auto ${
                      alerts?.length == 0 && "flex items-center justify-center"
                    } small-scroller`}
                  >
                    {alerts?.alerts?.map((e, i) => {
                      return (
                        <Notify data={e} key={i} status={e?.type != "error"} />
                      );
                    })}
                    {alerts?.alerts?.length == 0 && (
                      <p className="text-gray-400 md:text-xl">
                        No Alerts Found
                      </p>
                    )}
                  </div>
                  <div className="h-[10%] gap-x-4 px-6 flex items-center justify-center bg-[#030021]/40 rounded-2xl">
                    <MdOutlineKeyboardDoubleArrowLeft
                      onClick={() => {
                        if (alerts?.current_page != 1) {
                          getAlerts(1);
                        }
                      }}
                      className={`text-2xl ${
                        alerts?.current_page != 1
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                    <MdOutlineChevronLeft
                      onClick={() => {
                        if (alerts?.current_page != 1) {
                          getAlerts(agencies?.current_page - 1);
                        }
                      }}
                      className={`text-2xl ${
                        alerts?.current_page != 1
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                    {[...Array(alerts?.total_pages).keys()]
                      .map((i) => i + 1)
                      ?.map((e, i) => {
                        return (
                          <div
                            className={`w-[35px] md:w-[30px] cursor-pointer min-[1600px]:w-[40px] h-[35px] md:h-[30px] text-sm min-[1600px]:text-base min-[1600px]:h-[40px] rounded-lg flex items-center justify-center ${
                              alerts?.current_page == e
                                ? "bg-newBlue"
                                : "text-[#85888E]"
                            }`}
                            key={i}
                            onClick={() => {
                              getAlerts(e);
                            }}
                          >
                            {e}
                          </div>
                        );
                      })}
                    <MdOutlineChevronRight
                      onClick={() => {
                        if (alerts?.current_page != alerts?.total_pages) {
                          getAlerts(alerts?.current_page + 1);
                        }
                      }}
                      className={`text-2xl ${
                        alerts?.current_page != alerts?.total_pages
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />{" "}
                    <MdOutlineKeyboardDoubleArrowRight
                      onClick={() => {
                        if (alerts?.current_page != alerts?.total_pages) {
                          getAlerts(alerts?.total_pages);
                        }
                      }}
                      className={`text-2xl ${
                        alerts?.current_page != alerts?.total_pages
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                  </div>
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
