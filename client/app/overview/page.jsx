"use client";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import Context from "../Context/Context";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdCopy } from "react-icons/io";
import toast from "react-hot-toast";
import Block from "./Block";

function formatName(input) {
  return input
    ?.split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Overview = () => {
  const history = useRouter();
  const [currentlyVisible, setCurrentlyVisible] = useState("Data Sources");
  const [dataSourcesShow, setDataSourcesShow] = useState("My Data Sources");
  const [selectReporting, setSelectReporting] = useState("Platforms");
  const {
    platformsData,
    mainTemplates,
    actualUser,
    setLinkToEmbed,
    lookerStudioSecret,
    userData,
    allDataSources,
  } = useContext(Context);

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
      <div className="w-full md:w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full md:py-2 py-1 md:px-6 min-[1600px]:py-6">
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
                        toast.success("Client Portal URL Copied Successfully");
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
                  ) : (
                    <div
                      key={i}
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
            <div className="text-white w-full rounded-xl p-3 md:p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-4 min-[1600px]:mt-6">
              <div className="flex items-center gap-x-4 md:gap-x-8">
                {["Data Sources", "Data Destinations", "Reporting"]?.map(
                  (e, i) => {
                    return (
                      <h3
                        className={`text-sm md:text-base min-[1600px]:text-[20px] cursor-pointer ${
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
                  }
                )}
              </div>
              <div className="gradient-line my-2.5 md:my-2 min-[1600px]:my-4"></div>
              <div className="min-[1600px]:h-[41vh] h-[37vh] md:h-[40vh]">
                {currentlyVisible === "Data Sources" ? (
                  <div className="h-full rounded-lg">
                    <div className="flex items-center gap-x-4 md:gap-x-8 mb-4">
                      {["My Data Sources", "All Data Sources"]?.map((e, i) => {
                        return (
                          <h3
                            className={`text-sm md:text-base min-[1600px]:text-[20px] cursor-pointer ${
                              dataSourcesShow == e
                                ? "text-white font-medium"
                                : "text-gray-500"
                            }`}
                            onClick={() => {
                              setDataSourcesShow(e);
                            }}
                            key={i}
                          >
                            {e}
                          </h3>
                        );
                      })}
                    </div>
                    {dataSourcesShow == "My Data Sources" ? (
                      <div className="h-[87%] overflow-y-auto small-scroller rounded-lg">
                        <div className="grid md:grid-cols-4 gap-3 md:gap-4">
                          {platformsData?.platforms?.map((e, i) => {
                            return (
                              <Block
                                name={formatName(e?.platform)}
                                original_name={e?.platform}
                                img={e?.logo}
                                time={e?.last_run}
                                isDataSource={true}
                                key={i}
                                idx={i + 1}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="h-[87%] overflow-y-auto small-scroller rounded-lg">
                        <div className="grid md:grid-cols-4 gap-3 md:gap-4">
                          {allDataSources?.map((e, i) => {
                            return (
                              <Block
                                name={formatName(e?.platform)}
                                original_name={e?.platform}
                                img={
                                  e?.logo_link ||
                                  "https://storage.googleapis.com/sightshark-portal/platforms_logo/facebook_insight.svg"
                                }
                                time={e?.last_run}
                                isDataSource={true}
                                isNew={true}
                                key={i}
                                idx={i + 1}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : currentlyVisible === "Reporting" ? (
                  <div className="h-full rounded-lg">
                    <div className="flex items-center gap-x-4 md:gap-x-8 mb-4">
                      {["Platforms", "Dashboard Templates"]?.map((e, i) => {
                        return (
                          <h3
                            className={`text-sm md:text-base min-[1600px]:text-[20px] cursor-pointer ${
                              selectReporting == e
                                ? "text-white font-medium"
                                : "text-gray-500"
                            }`}
                            onClick={() => {
                              setSelectReporting(e);
                            }}
                            key={i}
                          >
                            {e}
                          </h3>
                        );
                      })}
                    </div>
                    {selectReporting == "Platforms" ? (
                      <div className="h-full overflow-y-auto small-scroller rounded-lg">
                        <div className="grid md:grid-cols-4 gap-3 md:gap-4">
                          <Block
                            name="Looker Studio"
                            img="/looker-icon-svgrepo-com.svg"
                            values={
                              userData?.role === "superadmin"
                                ? [
                                    {
                                      title: !lookerStudioSecret
                                        ? "Connect"
                                        : "Reconnect",
                                      link: `${process.env.NEXT_PUBLIC_ADMIN_BACKEND_URI}/looker/login`,
                                    },
                                  ]
                                : []
                            }
                          />
                        </div>{" "}
                      </div>
                    ) : (
                      <div className="h-[87%] w-full overflow-y-auto small-scroller rounded-lg">
                        <div className="grid md:grid-cols-3 gap-x-5 min-[1600px]:gap-x-4 mt-2">
                          {mainTemplates?.map((e, i) => {
                            return (
                              <div
                                key={i}
                                onClick={() => {
                                  setLinkToEmbed(e?.template_link);
                                  history.push("/view-report");
                                }}
                                className="border flex flex-col items-center justify-center border-gray-500/10 rounded-xl bg-[#171C2A]/50 cursor-pointer py-3 px-3"
                              >
                                <Image
                                  src={e?.template_image}
                                  alt={e?.template_image?.src}
                                  width={1000}
                                  height={1000}
                                  className="min-[1600px]:h-[29vh] md:h-[26vh] h-[23vh] object-cover rounded-lg"
                                />
                                <p className="mt-2.5">{e?.template_name}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-4 gap-3 md:gap-4">
                    <Block name="Big Query" img="/big query.png" />
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
