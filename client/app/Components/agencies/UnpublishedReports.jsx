import React, { useContext } from "react";
import Context from "../../Context/Context";
import Info from "@/app/Components/Login/Info";
import { useRouter } from "next/navigation";

const UnpublishedReports = () => {
  const { rawReportsClient } = useContext(Context);

  return (
    <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 h-[38vh] md:h-[26.5vh] overflow-y-auto small-scroller rounded-2xl border border-gray-500/5 mb-3 min-[1600px]:mb-4">
      <h4 className="min-[1600px]:text-xl text-sm">
        Unpublished Reports ({rawReportsClient ? rawReportsClient?.length : 0})
        <Info
          placement={"bottom"}
          text="These reports are dynamically generated and temporary. To save them to your Looker Studio account, follow the steps outlined in the tutorial here: [link]"
        />
      </h4>
      <div className="gradient-line min-[1600px]:my-4 my-3"></div>
      {rawReportsClient?.length > 0 ? (
        <div className="mt-1 px-1">
          <div
            className="grid bg-[#030021]/40 py-2 md:px-0 px-2 rounded-t-xl items-center border-x border-x-gray-200/10 border-t border-t-gray-200/10"
            style={{ gridTemplateColumns: "25% 25% 25% 25%" }}
          >
            {[
              "Report Name",
              "Template Name",
              "Created Date",
              "Report Link",
            ]?.map((e, i) => {
              return (
                <p key={i} className="text-center text-xs min-[1600px]:text-sm">
                  {e}
                </p>
              );
            })}
          </div>
          <div className="border-x border-x-gray-200/10 rounded-b-xl">
            {rawReportsClient?.map((e, idx, arr) => {
              return (
                <div
                  key={idx}
                  className={`grid py-2 rounded-t-xl items-center border-b md:px-0 px-2 border-b-gray-200/10 ${
                    idx === arr.length - 1 && "rounded-b-xl"
                  }`}
                  style={{ gridTemplateColumns: "25% 25% 25% 25%" }}
                >
                  {[
                    e?.report_name,
                    e?.client_name,
                    new Date(e?.created_at)?.toISOString()?.slice(0, 10),
                    e?.report_url,
                  ]?.map((e, i) => {
                    return (
                      <p
                        key={i}
                        className={`text-center text-[13px] min-[1600px]:text-[15px] break-words px-3 ${
                          i == 3 &&
                          "hover:underline hover:text-blue-500 cursor-pointer"
                        }`}
                        onClick={() => {
                          if (i == 3) {
                            window.open(e, "_blank");
                          }
                        }}
                      >
                        {i == 3 ? "Report Link" : e}
                      </p>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-2 text-center">No Unpublished Reports</div>
      )}
    </div>
  );
};

{
  /* <ul className="list-disc gap-2.5 mt-1.5 px-2 relative">
          {rawReportsClient?.map((e, i) => {
            return (
              <li key={i} className="flex items-start justify-between">
                <span className="break-words w-10/12">
                  <span className="text-xl mr-2">•</span>
                  {e?.report_name?.replaceAll("_", " ")}
                </span>
                <span>
                  (
                  <span
                    className="cursor-pointer hover:text-blue-500 transition-all hover:underline"
                    onClick={() => {
                      setLinkToEmbed(e?.report_url);
                      history.push("/view-report");
                    }}
                  >
                    Report URL
                  </span>
                  )
                </span>
              </li>
            );
          })}
        </ul> */
}

export default UnpublishedReports;
