"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import AgencyDetails from "@/app/Components/agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/agencies/AgencyDetailsTopbar";
import { FaPlus } from "react-icons/fa";
import AddTemplates from "../../Components/agencies/AddTemplates";
import AddDataSouces from "../../Components/agencies/AddDataSources";
import { useRouter } from "next/navigation";
import TemplateBlock from "@/app/Components/agencies/TemplateBlock";
import Context from "@/app/Context/Context";

const Overview = ({ params }) => {
  const history = useRouter();
  const { agencies, getCredentialsForClient, clientCreds, mainDataSource } =
    useContext(Context);
  const [data, setData] = useState();
  const [addDataSouces, setAddDataSouces] = useState(false);
  const [addTemplates, setAddTemplates] = useState(false);
  const { name } = params;

  useEffect(() => {
    let temp = agencies?.data?.find(
      (e) => e?.client_name?.replaceAll(" ", "-") == name
    );
    setData(temp);
    getCredentialsForClient(temp?.client_id);
  }, [name, agencies]);

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
          <div className="text-white w-full rounded-lg flex flex-row-reverse items-start justify-between px-6">
            <AgencyDetails data={data} />
            <div className="w-[69%]">
              <AgencyDetailsTopbar name={name} />
              <div className="border border-gray-500/5 h-[83vh] w-full rounded-lg p-3 min-[1600px]:p-4">
                <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 rounded-2xl border border-gray-500/5">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="min-[1600px]:text-xl">Data Sources </h4>
                    <button
                      onClick={() => {
                        setAddDataSouces(!addDataSouces);
                      }}
                      className="bg-newBlue px-5 w-[170px] min-[1600px]:w-[185px] justify-center py-2.5 min-[1600px]:py-3 rounded-xl flex items-center gap-x-2 text-sm min-[1600px]:text-base"
                    >
                      <FaPlus className="text-sm" /> Add Source
                    </button>
                  </div>
                  <div className="gradient-line my-4"></div>
                  {clientCreds?.data?.length > 0 ? (
                    <div className="bg-[#171C2A] grid grid-cols-4 gap-y-2 rounded-lg p-3 min-[1600px]:p-4">
                      {clientCreds?.data
                        ?.map((e) => {
                          return {
                            ...e,
                            img_link: mainDataSource?.find(
                              (event) => event?.name == e?.platform_name
                            )?.img_link,
                          };
                        })
                        ?.map((e, i) => {
                          return (
                            <div
                              key={i}
                              className="flex items-center px-2 py-1 rounded-full"
                            >
                              <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/50 from-[75%] w-7 min-[1600px]:w-8 aspect-square p-1.5 mr-3">
                                <Image
                                  src={e?.img_link}
                                  alt={e?.img_link?.src}
                                  width={1000}
                                  height={1000}
                                  className="object-contain"
                                />
                              </div>
                              <label
                                htmlFor={e?.platform_name}
                                className="text-sm min-[1600px]:text-base"
                              >
                                {e?.platform_name}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="bg-[#171C2A] rounded-lg p-3 min-[1600px]:p-4 text-center">
                      No Data Sources Available Please Add some of the Data
                      Sources
                    </div>
                  )}
                </div>
                <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 rounded-2xl border border-gray-500/5 my-3 min-[1600px]:my-4">
                  <h4 className="min-[1600px]:text-xl">Templates </h4>
                  <div className="gradient-line my-4"></div>
                  {data?.template_name?.length > 0 ? (
                    <div className="grid grid-cols-5 gap-x-4 mt-2 relative">
                      <TemplateBlock
                        data={{
                          template_name: data?.template_name,
                          template_link: data?.template_link,
                          templat_image: data?.templat_image,
                        }}
                        original_data={data}
                      />
                    </div>
                  ) : (
                    <div className="mt-2 text-center">
                      No Templates Available Please Add some of the Templates
                    </div>
                  )}
                </div>
                <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 rounded-2xl border border-gray-500/5 my-3 min-[1600px]:my-4 overflow-y-auto small-scroller h-[32vh]">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="min-[1600px]:text-xl">Recent Activity </h4>
                    <p
                      className="text-white text-sm min-[1600px]:text-base flex items-center cursor-pointer"
                      onClick={() =>
                        history.push(`/clients/${name}/recent-activities`)
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

export default Overview;
