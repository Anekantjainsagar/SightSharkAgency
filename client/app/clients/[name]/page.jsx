"use client";
import React, { useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import AgencyDetails from "@/app/Components/Agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/Agencies/AgencyDetailsTopbar";
import { FaPlus } from "react-icons/fa";
import AddTemplates from "../../Components/Agencies/AddTemplates";
import AddDataSouces from "../../Components/Agencies/AddDataSources";
import { useRouter } from "next/navigation";

const Overview = ({ params }) => {
  const history = useRouter();
  const [addDataSouces, setAddDataSouces] = useState(false);
  const [addTemplates, setAddTemplates] = useState(false);
  const { name } = params;

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />{" "}
      <AddDataSouces
        showSubscribe={addDataSouces}
        setShowSubscribe={setAddDataSouces}
      />
      <AddTemplates
        showSubscribe={addTemplates}
        setShowSubscribe={setAddTemplates}
      />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg flex items-start justify-between px-6">
            <AgencyDetails />
            <div className="w-[69%]">
              <AgencyDetailsTopbar />
              <div className="border border-gray-500/5 h-[83vh] w-full rounded-lg p-3 min-[1600px]:p-4">
                <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 rounded-2xl border border-gray-500/5">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="min-[1600px]:text-xl">Data Sources </h4>
                    <button
                      onClick={(e) => {
                        setAddDataSouces(!addDataSouces);
                      }}
                      className="bg-newBlue px-5 w-[170px] min-[1600px]:w-[185px] justify-center py-2.5 min-[1600px]:py-3 rounded-xl flex items-center gap-x-2 text-sm min-[1600px]:text-base"
                    >
                      <FaPlus className="text-sm" /> Add Source
                    </button>
                  </div>
                  <div className="gradient-line my-4"></div>
                  <div className="bg-[#171C2A] grid grid-cols-4 gap-y-2 rounded-lg p-3 min-[1600px]:p-4">
                    {[
                      {
                        img: "/Agency/logo/facebook.svg",
                        title: "Meta Ads",
                      },
                      {
                        img: "/Agency/logo/facebook.svg",
                        title: "Meta Insights",
                      },
                      {
                        img: "/Agency/logo/google analytics.svg",
                        title: "Google Analytics",
                      },
                      {
                        img: "/Agency/logo/hubspot.svg",
                        title: "HubSpot",
                      },
                      {
                        img: "/Agency/logo/amazon.svg",
                        title: "Amazon",
                      },
                      {
                        img: "/Agency/logo/shopify.svg",
                        title: "Shopify",
                      },
                      {
                        img: "/Agency/logo/google ads.svg",
                        title: "Google Ads",
                      },
                      {
                        img: "/Agency/logo/linkedin.svg",
                        title: "Linkedin",
                      },
                    ].map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center px-2 py-1 rounded-full"
                        >
                          <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/50 from-[75%] w-7 min-[1600px]:w-8 aspect-square p-1.5 mr-3">
                            <Image
                              src={e?.img}
                              alt={e?.img?.src}
                              width={1000}
                              height={1000}
                              className="object-contain"
                            />
                          </div>
                          <label
                            htmlFor={e?.title}
                            className="text-sm min-[1600px]:text-base"
                          >
                            {e?.title}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 rounded-2xl border border-gray-500/5 my-3 min-[1600px]:my-4">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="min-[1600px]:text-xl">Templates </h4>
                    <button
                      onClick={() => {
                        setAddTemplates(!addTemplates);
                      }}
                      className="bg-newBlue px-5 py-2.5 min-[1600px]:py-3 w-[170px] min-[1600px]:w-[185px] rounded-xl flex items-center justify-center gap-x-2 text-sm min-[1600px]:text-base"
                    >
                      <FaPlus className="text-sm" /> Add Template
                    </button>
                  </div>{" "}
                  <div className="gradient-line my-4"></div>
                  <div className="grid grid-cols-5 gap-x-4 mt-2">
                    {[
                      {
                        img: "/Agency/individual/templates/1 (2).png",
                      },
                      {
                        img: "/Agency/individual/templates/1 (1).png",
                      },
                      { img: "/Agency/individual/templates/1 (4).png" },
                      {
                        img: "/Agency/individual/templates/1 (3).png",
                      },
                      {
                        img: "/Agency/individual/templates/1 (2).png",
                      },
                    ].map((e, i) => {
                      return (
                        <div key={i}>
                          <Image
                            src={e?.img}
                            alt={e?.img?.src}
                            width={1000}
                            height={1000}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 rounded-2xl border border-gray-500/5 my-3 min-[1600px]:my-4 overflow-y-auto small-scroller h-[33vh]">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="min-[1600px]:text-xl">Recent Activity </h4>
                    <p
                      className="text-white text-sm min-[1600px]:text-base flex items-center cursor-pointer"
                      onClick={() =>
                        history.push(`/agencies/${name}/recent-activities`)
                      }
                    >
                      View All
                      <HiOutlineArrowNarrowRight className="text-base ml-2" />
                    </p>
                  </div>
                  <div className="gradient-line my-4"></div>
                  <div>
                    <div className="">
                      <span className="bg-[#5F5F5F]/10 px-4 py-1 w-fit rounded border border-gray-500/5 text-sm min-[1600px]:text-base">
                        14 August 2024
                      </span>
                      <div className="mt-4">
                        {[1, 2, 3]?.map((e, i) => {
                          return (
                            <div
                              key={i}
                              className={`flex items-center justify-between mb-4`}
                            >
                              <div className="flex items-center gap-x-3 ml-12">
                                <Circle0 />
                                <h6 className="text-[13px] min-[1600px]:text-base">
                                  <span className="font-semibold">
                                    ProWiz Analytics
                                  </span>{" "}
                                  - Assigned “SightShark” Google Ads, Meta Ads
                                  and LinkedIn Ads data sources
                                </h6>
                              </div>
                              <p className="text-[13px] min-[1600px]:text-base">
                                02:30 PM
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
          </div>
        </div>
      </div>
    </div>
  );
};

const Circle0 = () => {
  return (
    <div className="bg-[#FFE8CC] p-2 w-7 rounded-full aspect-square">
      <div className="bg-[#FDC53E] w-full h-full rounded-full"></div>
    </div>
  );
};

const Circle1 = () => {
  return (
    <div className="bg-[#FFE8CC] p-2 w-7 rounded-full aspect-square">
      <div className="bg-[#FF8A00] w-full h-full rounded-full"></div>
    </div>
  );
};

const Circle2 = () => {
  return (
    <div className="bg-[#B7FFD8] p-2 w-7 rounded-full aspect-square">
      <div className="bg-[#37BA73] w-full h-full rounded-full"></div>
    </div>
  );
};

export default Overview;
