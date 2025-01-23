"use client";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import Context from "../Context/Context";
import { useContext, useEffect, useState } from "react";
import { IoMdCopy } from "react-icons/io";
import toast from "react-hot-toast";
import BottomOverview from "./BottomOverview";

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const { actualUser, userData } = useContext(Context);

  function calculateRemainingDays(startDate, monthsToAdd) {
    let daysRemaining = Math.ceil(
      (new Date(
        new Date(startDate).setMonth(
          new Date(startDate).getMonth() + monthsToAdd
        )
      ) -
        new Date()) /
        (1000 * 60 * 60 * 24)
    );
    return daysRemaining > 0 ? daysRemaining : 0;
  }

  useEffect(() => {
    if (userData?.id && actualUser?.agency_name) {
      setLoading(false);
    }
  }, [userData, actualUser]);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar loading={loading} />
      <div className="w-full md:w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar loading={loading} />
          <div className="text-white w-full md:py-2 py-1 md:px-6 min-[1600px]:py-6">
            {loading ? (
              <div className="text-white w-full flex md:flex-row flex-col items-center justify-between rounded-xl p-3 md:p-4 bg-[#171C2A]/20 border border-gray-500/5">
                {/* Profile Section */}
                <div className="md:w-fit w-full flex items-center gap-x-6">
                  <div className="md:w-[10vw] md:h-[10vw] w-[33vw] h-[33vw] bg-gray-200 border border-gray-500/10 rounded-full animate-pulse"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="flex mt-4 items-center gap-x-3 md:gap-x-4">
                      <div className="bg-gray-200 md:px-6 px-5 py-2 md:py-2.5 rounded-xl w-28 h-8 animate-pulse"></div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:w-[43%] gap-3 md:gap-4 md:mt-0 mt-4">
                  {Array(4)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 md:px-4 py-3 md:py-4 rounded-xl border border-gray-500/5 bg-[#171C2A]/50 animate-pulse"
                      >
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200"></div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-white w-full flex md:flex-row flex-col items-center justify-between rounded-xl p-3 md:p-4 bg-[#171C2A]/20 border border-gray-500/5">
                <div className="md:w-fit w-full flex items-center gap-x-6">
                  <Image
                    src={actualUser?.profile_picture}
                    alt={actualUser?.agency_name}
                    width={1000}
                    height={1000}
                    className="md:w-[10vw] md:h-[10vw] w-[33vw] h-[33vw] border border-gray-500/10 rounded-full"
                  />
                  <div className="">
                    <h5 className="md:text-3xl text-2xl font-semibold">
                      {actualUser?.agency_name}
                    </h5>
                    <div className="flex mt-4 items-center gap-x-3 md:gap-x-4">
                      <button
                        onClick={() => {
                          window.open(actualUser?.client_portal, "__blank");
                        }}
                        className="bg-newBlue md:px-6 px-5 py-2 md:py-2.5 min-[1600px]:py-3 font-medium rounded-xl flex items-center text-sm md:text-sm min-[1600px]:text-base"
                      >
                        Client Portal
                      </button>
                      <IoMdCopy
                        className="md:text-3xl text-2xl text-white cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            actualUser?.client_portal
                          );
                          toast.success(
                            "Client Portal URL Copied Successfully"
                          );
                        }}
                        title="Copy Client Portal URL"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:w-[43%] gap-3 md:gap-4 md:mt-0 mt-4">
                  {[
                    {
                      name: "Total Clients Added",
                      value: actualUser?.current_number_of_clients,
                      img: "/Overview/Icons/total.png",
                    },
                    {
                      name: "Active Clients",
                      value: actualUser?.active_clients,
                      img: "/Overview/Icons/active.png",
                    },
                    {
                      name: "License Limit",
                      value: `${
                        actualUser?.current_number_of_clients
                          ? actualUser?.current_number_of_clients
                          : ""
                      }/${
                        actualUser?.license_limit
                          ? actualUser?.license_limit
                          : ""
                      }`,
                      img: "/Overview/Icons/satisfaction.png",
                    },
                    {
                      name: "Warranty Period",
                      value: `${calculateRemainingDays(
                        actualUser?.created_date,
                        actualUser?.warrenty_period
                      )} days left`,
                      img: "/Overview/Icons/dashboard.png",
                    },
                  ].map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between px-3 md:px-4 py-3 md:py-4 min-[1600px]:py-6 rounded-xl border border-gray-500/5 bg-[#171C2A]/50"
                      >
                        <div>
                          <p className="text-xs min-[1600px]:text-sm text-[#CECFD2]">
                            {e?.name}
                          </p>
                          <p className="text-base md:text-[20px] min-[1600px]:text-[26px] font-semibold mt-1 md:mt-2">
                            {e?.value}
                          </p>
                        </div>
                        <Image
                          src={e.img}
                          alt={e.img?.src}
                          width={1000}
                          height={1000}
                          className="w-[40px] md:w-[50px] min-[1600px]:w-[60px] aspect-square"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <BottomOverview loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
