"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AgencyDetails from "@/app/Components/agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/agencies/AgencyDetailsTopbar";
import AddDataSouces from "../../Components/agencies/AddDataSources";
import TemplateBlock from "@/app/Components/agencies/TemplateBlock";
import Context from "@/app/Context/Context";
import Info from "@/app/Components/Login/Info";
import UnpublishedReports from "@/app/Components/agencies/UnpublishedReports";

const Overview = ({ params }) => {
  const {
    agencies,
    getCredentialsForClient,
    getRawReports,
    setSelectedClientDetails,
    publishedReports,
    getPublishedReports,
  } = useContext(Context);
  const [data, setData] = useState();
  const [addDataSouces, setAddDataSouces] = useState(false);
  const { name } = params;

  useEffect(() => {
    let temp = agencies?.data?.find(
      (e) => e?.client_name.replaceAll(" ", "-") == decodeURIComponent(name)
    );
    setSelectedClientDetails(temp);
    setData(temp);
    getCredentialsForClient(temp?.client_id);
    getRawReports(temp?.client_id);
    getPublishedReports(temp?.client_id);
  }, [name, agencies]);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />{" "}
      <AddDataSouces
        showSubscribe={addDataSouces}
        setShowSubscribe={setAddDataSouces}
      />
      <div className="md:w-[85%] w-full bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg flex flex-col md:flex-row-reverse items-start justify-between md:px-6">
            <AgencyDetails data={data} />
            <div className="w-full md:w-[69%] md:mt-0 mt-6">
              <AgencyDetailsTopbar name={name} />
              <div className="border border-gray-500/5 min-[1600px]:h-[83vh] md:h-[80vh] h-fit w-full rounded-lg p-3 min-[1600px]:p-4 md:mb-0 mb-4">
                <UnpublishedReports />
                <div className="bg-[#171C2A]/40 p-3 min-[1600px]:p-4 min-[1600px]:h-[51vh] md:h-[48.5vh] h-[31vh] rounded-2xl border border-gray-500/5">
                  <div className="flex items-center justify-between">
                    <h4 className="min-[1600px]:text-xl text-sm">
                      Published Reports{" "}
                      <Info
                        placement={"bottom"}
                        text="This section provides access to all the latest reports saved in your Looker Studio account, specifically for this client."
                      />
                    </h4>{" "}
                    {/* <button
                      onClick={() => {}}
                      className="bg-newBlue p-2.5 mr-3 justify-center rounded-full flex items-center gap-x-2 my text-sm min-[1600px]:text-base"
                    >
                      <FaPlus className="text-sm" />
                    </button> */}
                  </div>
                  <div className="gradient-line min-[1600px]:my-4 my-3"></div>
                  <div className="h-[85%] overflow-y-auto small-scroller">
                    {publishedReports?.length > 0 ? (
                      <div className="grid md:grid-cols-3 gap-4 mt-2 relative pr-4">
                        {publishedReports?.map((data, i) => {
                          return (
                            <TemplateBlock
                              key={i}
                              data={{
                                template_name: data?.report_name,
                                template_link: data?.link,
                                templat_image: data?.report_image,
                              }}
                              original_data={data}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <div className="mt-2 text-center">
                        No Published Reports
                      </div>
                    )}
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

export default Overview;
