"use client";
import Block from "./Block";
import Context from "../Context/Context";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import Image from "next/image";

function formatName(input) {
  return input
    ?.split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const BottomOverview = ({ loading }) => {
  const [currentlyVisible, setCurrentlyVisible] = useState("Data Sources");

  return (
    <div className="text-white w-full rounded-xl p-3 md:p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-4 min-[1600px]:mt-6">
      <div className="flex items-center gap-x-4 md:gap-x-8">
        {["Data Sources", "Data Destinations", "Reporting"]?.map((e, i) => {
          return loading ? (
            <div
              key={i}
              className="w-full h-6 md:h-8 bg-gray-300 animate-pulse rounded-sm"
            ></div>
          ) : (
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
        })}
      </div>
      <div className="gradient-line my-2.5 md:my-2 min-[1600px]:my-4"></div>
      <div className="min-[1600px]:h-[41vh] h-[37vh] md:h-[40vh]">
        {currentlyVisible === "Data Sources" ? (
          <DataSources loading={loading} />
        ) : currentlyVisible === "Reporting" ? (
          <Reporting loading={loading} />
        ) : (
          <DataDestinations loading={loading} />
        )}
      </div>
    </div>
  );
};

const DataSources = ({ loading }) => {
  const [dataSourcesShow, setDataSourcesShow] = useState("My Data Sources");
  const { platformsData, allDataSources } = useContext(Context);

  return (
    <div className="h-full rounded-lg">
      <div className="flex items-center gap-x-4 md:gap-x-8 mb-4">
        {["My Data Sources", "All Data Sources"]?.map((e, i) => {
          return loading ? (
            <div
              key={i}
              className="w-full h-6 md:h-8 bg-gray-300 animate-pulse rounded-sm"
            ></div>
          ) : (
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
                  loading={loading}
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
                  loading={loading}
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
  );
};

const Reporting = ({ loading }) => {
  const [selectReporting, setSelectReporting] = useState("Platforms");

  return (
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
        <ReportingPlatforms loading={loading} />
      ) : (
        <Templates />
      )}
    </div>
  );
};

const ReportingPlatforms = ({ loading }) => {
  const { lookerStudioSecret, userData } = useContext(Context);

  return (
    <div className="h-full overflow-y-auto small-scroller rounded-lg">
      <div className="grid md:grid-cols-4 gap-3 md:gap-4">
        <Block
          loading={loading}
          name="Looker Studio"
          img="/looker-icon-svgrepo-com.svg"
          values={
            userData?.role === "superadmin"
              ? [
                  {
                    title: !lookerStudioSecret ? "Connect" : "Reconnect",
                    link: `${process.env.NEXT_PUBLIC_ADMIN_BACKEND_URI}/looker/login`,
                  },
                ]
              : []
          }
        />
      </div>{" "}
    </div>
  );
};

const Templates = () => {
  const history = useRouter();
  const { mainTemplates, setLinkToEmbed } = useContext(Context);

  return (
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
              className="shadow-sm shadow-gray-200/20 flex flex-col items-center justify-center rounded-xl bg-[#171C2A]/50 cursor-pointer py-3 px-3"
            >
              <Image
                src={e?.template_image}
                alt={e?.template_image?.src}
                width={1000}
                height={1000}
                className="min-[1600px]:h-[28.5vh] md:h-[25.5vh] h-[23vh] object-cover rounded-lg"
              />
              <p className="mt-2.5">{e?.template_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DataDestinations = ({ loading }) => {
  return (
    <div className="grid md:grid-cols-4 gap-3 md:gap-4">
      <Block loading={loading} name="Big Query" img="/big query.png" />
    </div>
  );
};

export default BottomOverview;
