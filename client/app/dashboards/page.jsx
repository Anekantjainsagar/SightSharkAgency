"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AddAgency from "@/app/Components/agencies/AddAgency";
import Context from "../Context/Context";
import FilterData from "@/app/Components/agencies/FilterData";
import { useRouter } from "next/navigation";

const Overview = () => {
  const [showReports, setShowReports] = useState("Recent Reports");
  const { agencyReports, archivedReports, userData } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    report_name: "",
    report_type: "",
    template_name: "",
  });
  const [addAgency, setAddAgency] = useState(false);

  useEffect(() => {
    if (userData?.id) {
      setLoading(false);
    }
  }, [userData]);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar loading={loading} />
      <AddAgency showSubscribe={addAgency} setShowSubscribe={setAddAgency} />
      <div className="w-full md:w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar loading={loading} />
          <div className="text-white w-full rounded-lg py-2 md:px-6 min-[1600px]:py-6">
            <div className="flex md:flex-row flex-col items-start md:items-center justify-between">
              {loading ? (
                <div className="flex items-center space-x-2">
                  {/* Skeleton for the "Dashboards" text */}
                  <div className="bg-gray-300 animate-pulse h-6 md:h-7 min-[1600px]:h-8 w-32 rounded-md"></div>
                  {/* Skeleton for the count */}
                  <div className="bg-gray-300 animate-pulse h-5 md:h-6 min-[1600px]:h-7 w-10 rounded-md"></div>
                </div>
              ) : (
                <h3 className="text-lg md:text-xl min-[1600px]:text-[22px] font-semibold">
                  Dashboards{" "}
                  <span className="md:text-lg min-[1600px]:text-xl text-white/80">
                    ({agencyReports ? agencyReports?.length : 0})
                  </span>
                </h3>
              )}
              <FilterData
                showReports={showReports}
                filters={filters}
                setFilters={setFilters}
                loading={loading}
              />
            </div>
            <div className="mt-2 md:mt-3">
              <div className="flex items-center gap-x-3 md:gap-x-4">
                {["Recent Reports", "Archived Reports"]?.map((e, i) => {
                  return loading ? (
                    <div
                      key={i}
                      className="bg-gray-300 animate-pulse h-5 md:h-6 rounded-md w-3/4"
                    ></div>
                  ) : (
                    <p
                      key={i}
                      className={`cursor-pointer py-2 md:text-lg ${
                        showReports == e ? "text-white" : "text-gray-500"
                      }`}
                      onClick={() => setShowReports(e)}
                    >
                      {e}
                    </p>
                  );
                })}
              </div>
              {showReports === "Recent Reports" ? (
                <div className="border border-gray-200/5 rounded-2xl">
                  <div className="grid bg-[#030021]/40 py-4 px-7 dashboardPage items-center rounded-2xl">
                    {[
                      "Report Name",
                      "Report Type",
                      "Template Name",
                      "Created Date",
                    ].map((e, i) => {
                      return loading ? (
                        <div
                          key={i}
                          className={`bg-gray-300 animate-pulse h-4 min-[1600px]:h-5 rounded-md ${
                            i !== 0
                              ? "mx-auto text-center w-1/3"
                              : "min-[1600px]:ml-0 ml-2 w-1/2"
                          }`}
                        ></div>
                      ) : (
                        <h5
                          key={i}
                          className={`text-[13px] min-[1600px]:text-base ${
                            i !== 0 ? "text-center" : "min-[1600px]:ml-0 ml-2"
                          } font-light tracking-wider`}
                        >
                          {e}
                        </h5>
                      );
                    })}
                  </div>
                  <div className="h-[66vh] md:h-[62vh] overflow-y-auto small-scroller min-[1600px]:h-[65vh]">
                    {agencyReports
                      ?.filter((e) => {
                        if (filters?.report_name) {
                          return e?.report_name === filters?.report_name;
                        }
                        return e;
                      })
                      ?.filter((e) => {
                        if (filters?.report_type == "Parent Report") {
                          return e?.report_name?.includes("parent");
                        } else if (filters?.report_type == "Child Report") {
                          return !e?.report_name?.includes("parent");
                        }
                        return e;
                      })
                      ?.map((data, i) => {
                        return (
                          <Template key={i} data={data} loading={loading} />
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200/5 rounded-2xl">
                  <div className="grid bg-[#030021]/40 py-4 px-7 dashboardPage items-center rounded-2xl">
                    {[
                      "Report Name",
                      "Report Type",
                      "Template Name",
                      "Created Date",
                    ].map((e, i) => {
                      return loading ? (
                        <div
                          key={i}
                          className={`bg-gray-300 animate-pulse h-4 min-[1600px]:h-5 rounded-md ${
                            i !== 0
                              ? "mx-auto text-center w-1/3"
                              : "min-[1600px]:ml-0 ml-2 w-1/2"
                          }`}
                        ></div>
                      ) : (
                        <h5
                          key={i}
                          className={`text-[13px] min-[1600px]:text-base ${
                            i !== 0 ? "text-center" : "min-[1600px]:ml-0 ml-2"
                          } font-light tracking-wider`}
                        >
                          {e}
                        </h5>
                      );
                    })}
                  </div>
                  <div className="h-[66vh] md:h-[62vh] overflow-y-auto small-scroller min-[1600px]:h-[65vh]">
                    {archivedReports
                      ?.filter((e) => {
                        if (filters?.report_name) {
                          return e?.report_name === filters?.report_name;
                        }
                        return e;
                      })
                      ?.filter((e) => {
                        if (filters?.report_type == "Parent Report") {
                          return e?.report_name?.includes("parent");
                        } else if (filters?.report_type == "Child Report") {
                          return !e?.report_name?.includes("parent");
                        }
                        return e;
                      })
                      ?.map((data, i) => {
                        return (
                          <Template key={i} data={data} loading={loading} />
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
  );
};

const Template = ({ data, loading = false }) => {
  const history = useRouter();
  const { setLinkToEmbed } = useContext(Context);

  return loading && data?.report_name ? (
    <div className="py-4 px-7 border-gray-200/5 border-y grid dashboardPage items-center cursor-pointer text-textGrey text-sm min-[1600px]:text-base">
      <div className="flex items-center">
        <div className="w-[3vw] mr-4 aspect-square bg-gray-300 animate-pulse rounded-full border border-gray-400/10"></div>
        <div className="w-32 h-4 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
      <div className="text-center">
        <div className="w-28 h-4 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
      </div>
      <div className="text-center">
        <div className="w-32 h-4 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
      </div>
      <div className="text-center">
        <div className="w-40 h-4 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
      </div>
    </div>
  ) : (
    <div className="py-4 px-7 border-gray-200/5 border-y grid dashboardPage items-center cursor-pointer text-textGrey text-sm min-[1600px]:text-base">
      <div className="flex items-center">
        {/* <Image
          src={data?.report_image}
          alt={data?.report_name}
          width={1000}
          height={1000}
          className="w-[3vw] mr-4 aspect-square object-cover border border-gray-400/10 rounded-full"
        /> */}
        <div
          className="underline hover:text-blue-400 transition-all"
          onClick={() => {
            setLinkToEmbed(data?.link);
            history.push("/view-report");
          }}
        >
          {data?.report_name?.replaceAll("_", " ")}
        </div>
      </div>
      <p className="text-center">
        {data?.report_name?.includes("parent")
          ? "Parent Report"
          : "Child Report"}
      </p>
      <h5
        className="text-center underline hover:text-blue-400 transition-all"
        onClick={() => {
          setLinkToEmbed(data?.link);
          history.push("/view-report");
        }}
      >
        {data?.template_name}
      </h5>
      <p className="text-center">
        {data?.created_at
          ? new Date(data?.created_at).toString()?.slice(4, 21)
          : ""}
      </p>
    </div>
  );
};

export default Overview;
