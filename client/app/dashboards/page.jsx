"use client";
import React, { useContext, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AddAgency from "@/app/Components/agencies/AddAgency";
import Context from "../Context/Context";
import FilterData from "@/app/Components/agencies/FilterData";
import { useRouter } from "next/navigation";

const Overview = () => {
  const history = useRouter();
  const { agencies, setLinkToEmbed, agencyReports } = useContext(Context);
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
          <div className="text-white w-full rounded-lg py-2 px-6 min-[1600px]:py-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl min-[1600px]:text-2xl font-semibold">
                Dashboards{" "}
                <span className="text-lg min-[1600px]:text-xl text-white/80">
                  ({agencyReports ? agencyReports?.total_count : 0})
                </span>
              </h3>
              <FilterData />
            </div>
            <div className="mt-5 border border-gray-200/5 rounded-2xl">
              <div className="grid bg-[#030021]/40 py-4 px-7 dashboardPage items-center rounded-2xl">
                {[
                  "Report Name",
                  "Report Type",
                  "Template Name",
                  "Created Date",
                ].map((e, i) => {
                  return (
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
              <div className="h-[72vh] overflow-y-auto small-scroller min-[1600px]:h-[70vh]">
                {agencyReports?.map((data, i) => {
                  return (
                    <div
                      key={i}
                      className="py-4 px-7 border-gray-200/5 border-y grid dashboardPage items-center cursor-pointer text-textGrey text-sm min-[1600px]:text-base"
                    >
                      <h5
                        className="underline hover:text-blue-400 transition-all"
                        onClick={() => {
                          setLinkToEmbed(data?.template_link);
                          history.push("/view-report");
                        }}
                      >
                        {data?.client_name}
                      </h5>
                      <p className="text-center">Parent Report</p>
                      <h5
                        className="text-center underline hover:text-blue-400 transition-all"
                        onClick={() => {
                          setLinkToEmbed(data?.template_link);
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
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
