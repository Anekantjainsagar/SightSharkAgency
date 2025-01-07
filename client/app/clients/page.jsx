"use client";
import React, { useContext, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AgencyDetailsBlock from "@/app/Components/Utils/AgencyDetails";
import AddAgency from "@/app/Components/agencies/AddAgency";
import { FaPlus } from "react-icons/fa";
import Context from "../Context/Context";
import { CSVLink } from "react-csv";
import SortByButton from "../Components/agencies/SortByButton";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

let sort_by_options = [
  "created_at",
  "client_name",
  "status",
  // "deployment_date",
];

const Overview = () => {
  const { agencies, getAgencies, setSelectedAgencies, selectedAgencies } =
    useContext(Context);
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
              <h3 className="text-xl min-[1600px]:text-[22px] font-semibold">
                Clients{" "}
                <span className="text-lg min-[1600px]:text-xl text-white/80">
                  ({agencies?.total_count})
                </span>
              </h3>
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setAddAgency(!addAgency);
                  }}
                  className="bg-newBlue px-6 py-2.5 min-[1600px]:py-3 rounded-xl ml-4 flex items-center gap-x-2 text-sm min-[1600px]:text-base"
                >
                  <FaPlus className="text-sm" /> Add Client
                </button>
                {selectedAgencies?.length > 0 && (
                  <CSVLink filename={"clients.csv"} data={selectedAgencies}>
                    <button
                      onClick={() => {}}
                      className="bg-white/10 backdrop-blur-sm px-6 py-2.5 rounded-xl ml-4 text-sm min-[1600px]:text-base flex items-center gap-x-2 border border-gray-200/5"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_1905)">
                          <path
                            d="M23.1201 7.06172L16.1695 0.110156C16.0992 0.0398437 16.004 0 15.9047 0H8.03155C6.1992 0 4.70858 1.49109 4.70858 3.32344V9.90047H1.79202C1.22858 9.90047 0.770142 10.3589 0.770142 10.9223V16.7967C0.770142 17.3602 1.22858 17.8186 1.79202 17.8186H4.70858V20.6766C4.70858 22.5089 6.1992 24 8.03155 24H19.9069C21.7392 24 23.2298 22.5089 23.2298 20.6766V7.32703C23.2298 7.22766 23.1905 7.13203 23.1201 7.06172ZM4.31764 14.663V13.0575C4.31764 12.1842 5.0278 11.4736 5.90061 11.4736C6.77295 11.4736 7.48311 12.1842 7.48311 13.0575C7.48311 13.2647 7.3153 13.4325 7.10811 13.4325C6.90139 13.4325 6.73358 13.2647 6.73358 13.0575C6.73358 12.5977 6.35999 12.2231 5.90061 12.2231C5.44124 12.2231 5.06717 12.5977 5.06717 13.0575V14.663C5.06717 15.1223 5.44124 15.4959 5.90061 15.4959C6.35999 15.4959 6.73358 15.1223 6.73358 14.663C6.73358 14.4558 6.90139 14.288 7.10811 14.288C7.3153 14.288 7.48311 14.4558 7.48311 14.663C7.48311 15.5353 6.77295 16.2455 5.90061 16.2455C5.0278 16.2455 4.31764 15.5353 4.31764 14.663ZM22.4803 20.6766C22.4803 22.0959 21.3258 23.2505 19.9069 23.2505H8.03155C6.61264 23.2505 5.45811 22.0959 5.45811 20.6766V17.8186H17.8045C18.368 17.8186 18.8264 17.3602 18.8264 16.7967V10.9223C18.8264 10.3589 18.368 9.90047 17.8045 9.90047H5.45811V3.32344C5.45811 1.90406 6.61264 0.749531 8.03155 0.749531H15.5297V6.57609C15.5297 7.19672 16.034 7.70156 16.6537 7.70156H22.4803V20.6766ZM9.91733 14.235C9.59999 14.235 9.13545 14.212 8.76795 14.0128C8.47827 13.8558 8.1328 13.5277 8.1328 12.8545C8.1328 12.0938 8.75155 11.475 9.51186 11.475H10.11C10.7648 11.475 11.2978 12.0075 11.2978 12.6619C11.2978 12.8686 11.13 13.0364 10.9233 13.0364C10.7161 13.0364 10.5483 12.8686 10.5483 12.6619C10.5483 12.4205 10.3519 12.2245 10.11 12.2245H9.51186C9.16452 12.2245 8.88186 12.5072 8.88186 12.8545C8.88186 13.1995 8.96014 13.4855 9.91733 13.4855C10.6786 13.4855 11.2978 14.1042 11.2978 14.865C11.2978 15.6258 10.6786 16.2455 9.91733 16.2455H9.31921C8.66483 16.2455 8.1328 15.7125 8.1328 15.0577C8.1328 14.8505 8.30061 14.6827 8.50733 14.6827C8.71452 14.6827 8.88186 14.8505 8.88186 15.0577C8.88186 15.2991 9.07827 15.4959 9.31921 15.4959H9.91733C10.2651 15.4959 10.5483 15.2128 10.5483 14.865C10.5483 14.5177 10.2651 14.235 9.91733 14.235ZM12.1167 11.4928C12.3131 11.4277 12.525 11.5341 12.5901 11.7305L13.5689 14.6808L14.5481 11.7305C14.6137 11.5341 14.8256 11.4277 15.022 11.4928C15.2184 11.558 15.3248 11.7703 15.2597 11.9667L13.9242 15.9886C13.8731 16.1419 13.7301 16.2455 13.5684 16.2455C13.4878 16.2455 13.4119 16.2197 13.349 16.1747C13.2872 16.1297 13.2384 16.065 13.2131 15.9886L11.879 11.9667C11.8139 11.7703 11.9203 11.558 12.1167 11.4928Z"
                            fill="#ECECED"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_1905">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Export as CSV
                    </button>
                  </CSVLink>
                )}
                <SortByButton sort_by_options={sort_by_options} />
              </div>
            </div>
            <div className="mt-5 border border-gray-200/5 rounded-2xl">
              <div className="grid bg-[#030021]/40 py-4 px-7 agencyBlockGrid items-center rounded-2xl">
                <div className="inline-flex items-start">
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-6 w-6 rounded-md cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                      id="check"
                      onChange={(e) => {
                        if (e?.target?.checked) {
                          setSelectedAgencies(agencies?.data);
                        } else {
                          setSelectedAgencies([]);
                        }
                      }}
                      checked={
                        selectedAgencies?.length == agencies?.data?.length
                      }
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
                {[
                  "Client Name",
                  "Status",
                  "Key Contact",
                  "Email",
                  "Created Date",
                ].map((e, i) => {
                  return (
                    <h5
                      key={i}
                      className={`text-[13px] min-[1600px]:text-sm ${
                        !e?.includes("Name")
                          ? "text-center"
                          : "min-[1600px]:ml-0 ml-2"
                      } font-light tracking-wider`}
                    >
                      {e}
                    </h5>
                  );
                })}
              </div>
              <div className="h-[69.5vh] min-[1600px]:h-[66vh]">
                <div className="overflow-y-auto small-scroller h-[86%]">
                  {agencies?.data?.map((e, i) => {
                    return <AgencyDetailsBlock key={i} data={e} />;
                  })}
                </div>
                <div className="h-[14%] gap-x-4  px-6 flex items-center justify-center bg-[#030021]/40 rounded-2xl">
                  <MdOutlineKeyboardDoubleArrowLeft
                    onClick={() => {
                      if (agencies?.current_page != 1) {
                        getAgencies(1);
                      }
                    }}
                    className={`text-2xl ${
                      agencies?.current_page != 1
                        ? "text-gray-300"
                        : "text-gray-600"
                    } cursor-pointer`}
                  />
                  <MdOutlineChevronLeft
                    onClick={() => {
                      if (agencies?.current_page != 1) {
                        getAgencies(agencies?.current_page - 1);
                      }
                    }}
                    className={`text-2xl ${
                      agencies?.current_page != 1
                        ? "text-gray-300"
                        : "text-gray-600"
                    } cursor-pointer`}
                  />
                  {[...Array(agencies?.total_pages).keys()]
                    .map((i) => i + 1)
                    ?.map((e, i) => {
                      return (
                        <div
                          className={`w-[30px] cursor-pointer min-[1600px]:w-[40px] h-[30px] text-sm min-[1600px]:text-base min-[1600px]:h-[40px] rounded-lg flex items-center justify-center ${
                            agencies?.current_page == e
                              ? "bg-newBlue"
                              : "text-[#85888E]"
                          }`}
                          key={i}
                          onClick={() => {
                            getAgencies(e);
                          }}
                        >
                          {e}
                        </div>
                      );
                    })}
                  <MdOutlineChevronRight
                    onClick={() => {
                      if (agencies?.current_page != agencies?.total_pages) {
                        getAgencies(agencies?.current_page + 1);
                      }
                    }}
                    className={`text-2xl ${
                      agencies?.current_page != agencies?.total_pages
                        ? "text-gray-300"
                        : "text-gray-600"
                    } cursor-pointer`}
                  />{" "}
                  <MdOutlineKeyboardDoubleArrowRight
                    onClick={() => {
                      if (agencies?.current_page != agencies?.total_pages) {
                        getAgencies(agencies?.total_pages);
                      }
                    }}
                    className={`text-2xl ${
                      agencies?.current_page != agencies?.total_pages
                        ? "text-gray-300"
                        : "text-gray-600"
                    } cursor-pointer`}
                  />
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
