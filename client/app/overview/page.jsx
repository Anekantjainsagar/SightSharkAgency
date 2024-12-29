"use client";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import Context from "../Context/Context";
import { useContext } from "react";
import { useRouter } from "next/navigation";

function formatName(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Overview = () => {
  const history = useRouter();
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
            <div className="mb-3 text-lg">
              <h5 className="cursor-pointer w-fit">
                Agency Name:-{" "}
                <span className="font-semibold">{actualUser?.agency_name}</span>{" "}
                <span className="mx-2">|</span> Client Portal:-{" "}
                <span
                  onClick={() => {
                    const validUrl =
                      actualUser?.client_portal.startsWith("http://") ||
                      actualUser?.client_portal.startsWith("https://")
                        ? actualUser?.client_portal
                        : `https://${actualUser?.client_portal}`;
                    window.open(validUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="hover:underline hover:text-blue-300 transition-all"
                >
                  View Portal
                </span>
              </h5>
            </div>
            <div className="grid grid-cols-4 gap-x-6">
              {[
                {
                  name: "Total Clients",
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
                  value: `${actualUser?.current_number_of_clients ? actualUser?.current_number_of_clients : ""}/${actualUser?.license_limit ? actualUser?.license_limit: ""}`,
                  img: "/Overview/Icons/satisfaction.png",
                },
                {
                  name: "Warranty Period",
                  value: `${calculateRemainingDays(actualUser?.deployment_date,actualUser?.warrenty_period)} days left`,
                  img: "/Overview/Icons/dashboard.png",
                }
                
              ].map((e, i) => {
                return (
                  <div
                    key={i}
                    className="bg-[#171C2A]/50 flex items-center justify-between p-4 min-[1600px]:p-6 border border-gray-500/5 rounded-xl"
                  >
                    <div>
                      <p className="text-sm min-[1600px]:text-base text-[#CECFD2]">
                        {e?.name}
                      </p>
                      <p className="text-[20px] min-[1600px]:text-[30px] font-semibold mt-1">
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
                );
              })}
            </div>
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-4 min-[1600px]:mt-6">
              <h3 className="text-lg min-[1600px]:text-[20px]">Data Sources</h3>{" "}
              <div className="gradient-line my-2 min-[1600px]:my-4"></div>
              <div className="h-[14vh] overflow-y-auto small-scroller bg-[#171C2A]/70 rounded-lg border border-gray-500/5">
                <div className="h-fit overflow-y-auto small-scroller grid grid-cols-5 gap-y-3 min-[1600px]:gap-y-5 p-3 min-[1600px]:p-4 rounded-lg">
                  {mainDataSource?.map((e, i) => {
                    return (
                      <div key={i} className="flex items-center">
                        <div className="flex items-center">
                          <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/40 w-9 min-[1600px]:w-10 aspect-square p-2 mr-3 min-[1600px]:mr-4">
                            <Image
                              src={e?.img_link}
                              alt={e?.img_link?.src}
                              width={1000}
                              height={1000}
                              className="aspect-squre object-contain"
                            />{" "}
                          </div>
                          <p className="text-sm min-[1600px]:text-base cursor-pointer">
                            {formatName(e?.name)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-4 min-[1600px]:mt-6">
              <h3
                className="text-lg min-[1600px]:text-[20px]"
                onClick={() => {}}
              >
                Templates
              </h3>{" "}
              <div className="gradient-line my-2 min-[1600px]:my-4"></div>
              <div className="grid grid-cols-3 gap-x-5 min-[1600px]:gap-x-4 mt-2 h-[27vh]">
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
                        className="h-[26vh] object-cover rounded-lg"
                      />
                      <p className="mt-2.5">{e?.template_name}</p>
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
