"use client";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import Context from "../Context/Context";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdCopy } from "react-icons/io";
import toast from "react-hot-toast";

function formatName(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Overview = () => {
  const history = useRouter();
  const [currentlyVisible, setCurrentlyVisible] = useState("Data Sources");
  const { mainDataSource, mainTemplates, actualUser, setLinkToEmbed } =
    useContext(Context);

  function calculateRemainingDays(startDate, monthsToAdd) {
    const start = new Date(startDate);
    const today = new Date();
    const end = new Date(start);
    end.setMonth(start.getMonth() + monthsToAdd);
    const timeDiff = end - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  }

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full py-2 px-6 min-[1600px]:py-6">
            <div className="text-white w-full flex items-end justify-between rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5">
              <div className="w-fit flex items-end gap-x-6">
                <Image
                  src={actualUser?.profile_picture}
                  alt={actualUser?.agency_name}
                  width={1000}
                  height={1000}
                  className="w-[12vw] h-[12vw] rounded-full"
                />
                <div className="">
                  <h5 className="text-3xl font-semibold">
                    {actualUser?.agency_name}
                  </h5>
                  <p className="mt-2 text-[12px] min-[1600px]:text-[14px]">
                    <span className="text-gray-300">Location:</span>{" "}
                    {actualUser?.location}
                  </p>
                  <p className="mt-2 text-[12px] min-[1600px]:text-[14px]">
                    <span className="text-gray-300">Website:</span>{" "}
                    <span
                      onClick={() => {
                        window.open(actualUser?.webiste, "__blank");
                      }}
                      className="cursor-pointer hover:underline"
                    >
                      {actualUser?.webiste}
                    </span>
                  </p>
                  <div className="flex mt-3 items-center gap-x-4">
                    <button
                      onClick={() => {
                        window.open(actualUser?.client_portal, "__blank");
                      }}
                      className="bg-newBlue px-6 py-2.5 min-[1600px]:py-3 font-medium rounded-xl flex items-center text-sm min-[1600px]:text-base"
                    >
                      Client Portal
                    </button>
                    <IoMdCopy
                      className="text-3xl text-white cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          actualUser?.client_portal
                        );
                        toast.success("Client Portal URL Copied Successfully");
                      }}
                      title="Copy Client Portal URL"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 w-[43%] gap-4">
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
                      actualUser?.license_limit ? actualUser?.license_limit : ""
                    }`,
                    img: "/Overview/Icons/satisfaction.png",
                  },
                  {
                    name: "Warranty Period",
                    value: `${calculateRemainingDays(
                      actualUser?.deployment_date,
                      actualUser?.warrenty_period
                    )} days left`,
                    img: "/Overview/Icons/dashboard.png",
                  },
                ].map((e, i) => {
                  return e?.img && e?.value?.toString() ? (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-2 rounded-xl border border-gray-500/5 bg-[#171C2A]/50"
                    >
                      <div>
                        <p className="text-[12px] min-[1600px]:text-[14px] text-[#CECFD2]">
                          {e?.name}
                        </p>
                        <p className="text-[20px] min-[1600px]:text-[26px] font-semibold mt-1">
                          {e?.value}
                        </p>
                      </div>
                      <Image
                        src={e.img}
                        alt={e.img?.src}
                        width={1000}
                        height={1000}
                        className="w-[50px] min-[1600px]:w-[60px] aspect-square"
                      />
                    </div>
                  ) : (
                    <div
                      key={i}
                      xx
                      className="flex items-center justify-between px-4 py-2 rounded-xl border border-gray-500/5 bg-[#171C2A]/50 animate-pulse"
                    >
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      </div>
                      <div className="w-12 h-12 min-w-[60px] min-h-[60px] rounded-full bg-gray-200"></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-4 min-[1600px]:mt-6">
              <div className="flex items-center gap-x-6">
                {["Data Sources", "Templates"]?.map((e, i) => {
                  return (
                    <h3
                      className={`text-lg min-[1600px]:text-[20px] cursor-pointer ${
                        currentlyVisible == e
                          ? "text-white font-medium"
                          : "text-gray-500"
                      }`}
                      onClick={() => {
                        setCurrentlyVisible(e);
                      }}
                      key={i}
                    >
                      {e}
                    </h3>
                  );
                })}
              </div>
              <div className="gradient-line my-2 min-[1600px]:my-4"></div>
              <div className="h-[41vh]">
                {currentlyVisible === "Templates" ? (
                  <div className="overflow-y-auto small-scroller h-full">
                    <div className="grid grid-cols-3 gap-x-5 min-[1600px]:gap-x-4 mt-2">
                      {mainTemplates?.map((e, i) => {
                        return (
                          <div
                            key={i}
                            onClick={() => {
                              setLinkToEmbed(e?.template_link);
                              history.push("/view-report");
                            }}
                            className="border flex flex-col items-center justify-center border-gray-300/20 rounded-xl cursor-pointer py-3 px-3"
                          >
                            <Image
                              src={e?.template_image}
                              alt={e?.template_image?.src}
                              width={1000}
                              height={1000}
                              className="h-[33vh] object-cover rounded-lg"
                            />
                            <p className="mt-2.5">{e?.template_name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto small-scroller rounded-lg">
                    <div className="h-fit overflow-y-auto small-scroller grid grid-cols-3 gap-y-3 min-[1600px]:gap-y-5 p-3 min-[1600px]:p-4 rounded-lg">
                      {mainDataSource?.map((e, i) => {
                        return (
                          <div key={i} className="flex items-center">
                            <div className="flex items-center">
                              <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/40 w-10 min-[1600px]:w-12 aspect-square p-2 mr-3 min-[1600px]:mr-4">
                                <Image
                                  src={e?.img_link}
                                  alt={e?.img_link?.src}
                                  width={1000}
                                  height={1000}
                                  className="aspect-squre object-contain"
                                />{" "}
                              </div>
                              <p className="text-base min-[1600px]:text-lg cursor-pointer">
                                {formatName(e?.name)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
