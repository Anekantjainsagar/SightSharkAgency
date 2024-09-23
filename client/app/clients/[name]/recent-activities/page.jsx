"use client";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AgencyDetails from "@/app/Components/clients/AgencyDetails";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";

const RecentActivites = () => {
  const history = useRouter();

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg flex items-start justify-between">
            <AgencyDetails />
            <div className="w-[69%]">
              <div className="border border-gray-500/5 h-[88vh] w-full rounded-lg p-4">
                <div className="bg-[#171C2A]/40 p-4 rounded-2xl border border-gray-500/5 h-full">
                  <div className="flex items-center justify-between w-full">
                    <h4 className="mainText20">Recent Activity </h4>
                    <p
                      className="text-white flex items-center cursor-pointer text-xl"
                      onClick={() => history.push("/clients/alpha-solutions")}
                    >
                      <AiOutlineClose />
                    </p>
                  </div>
                  <div className="gradient-line my-4"></div>
                  <div>
                    {[1, 2, 3, 4].map((e, idx) => {
                      return (
                        <div key={idx} className="mb-6">
                          <span className="bg-[#5F5F5F]/10 px-4 py-1 w-fit rounded border border-gray-500/20">
                            14 August 2024
                          </span>
                          <div className="mt-4">
                            {[1, 2]?.map((e, i) => {
                              return (
                                <div
                                  key={i}
                                  className={`flex items-center justify-between mb-4`}
                                >
                                  <div className="flex items-center gap-x-3 ml-12">
                                    {idx % 3 == 0 ? (
                                      <Circle0 />
                                    ) : idx % 3 == 1 ? (
                                      <Circle1 />
                                    ) : (
                                      <Circle2 />
                                    )}
                                    <h6 className="mainText14">
                                      <span className="font-semibold">
                                        ProWiz Analytics
                                      </span>{" "}
                                      - Assigned “SightShark” Google Ads, Meta
                                      Ads and LinkedIn Ads data sources
                                    </h6>
                                  </div>
                                  <p className="mainText14">02:30 PM</p>
                                </div>
                              );
                            })}
                          </div>
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

export default RecentActivites;
