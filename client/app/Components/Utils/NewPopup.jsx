"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Required from "../Utils/Required";

const customStyles = {
  overlay: { zIndex: 50 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    width: "65vw",
    border: "none",
  },
};

const connectorsData = [
  {
    title: "Amazon Selling Partner",
    img: "/Agency/connectors/Amazon Selling Partner.svg",
  },
  {
    title: "Bamboo HR",
    img: "/Agency/connectors/BambooHR.svg",
  },
  {
    title: "Facebook Ads",
    img: "/Agency/connectors/Facebook Ads.svg",
  },
  {
    title: "Facebook Insights",
    img: "/Agency/connectors/Facebook Insights.svg",
  },
  {
    title: "Google Ads Manager",
    img: "/Agency/connectors/Google Ads Manager.svg",
  },
  {
    title: "Google Ads",
    img: "/Agency/connectors/Google Ads.svg",
  },
  {
    title: "Google Analytics",
    img: "/Agency/connectors/Google Analytics 4.svg",
  },
  {
    title: "Google DV360",
    img: "/Agency/connectors/Google DV360.svg",
  },
  {
    title: "Google My Business",
    img: "/Agency/connectors/Google My Business.svg",
  },
  {
    title: "Google Search Console",
    img: "/Agency/connectors/Google Search Console.svg",
  },
  {
    title: "Google Sheets",
    img: "/Agency/connectors/Google Sheets.svg",
  },
  {
    title: "HubSpot",
    img: "/Agency/connectors/HubSpot.svg",
  },
  {
    title: "Instagram Ads",
    img: "/Agency/connectors/Instagram Ads.svg",
  },
  {
    title: "Instagram Insights",
    img: "/Agency/connectors/Instagram Insights.svg",
  },
  {
    title: "JSON",
    img: "/Agency/connectors/JSON.svg",
  },
  {
    title: "Klaviyo",
    img: "/Agency/connectors/Klaviyo.svg",
  },
  {
    title: "LinkedIn",
    img: "/Agency/connectors/LinkedIn.svg",
  },
  {
    title: "Outbrain",
    img: "/Agency/connectors/Outbrain.svg",
  },
  {
    title: "PayPal",
    img: "/Agency/connectors/PayPal.svg",
  },
  {
    title: "Shopify",
    img: "/Agency/connectors/Shopify.svg",
  },
  {
    title: "Stripe",
    img: "/Agency/connectors/Stripe.svg",
  },
  {
    title: "Taboola",
    img: "/Agency/connectors/Taboola.svg",
  },
  {
    title: "TikTok",
    img: "/Agency/connectors/TikTok.svg",
  },
  {
    title: "X Ads",
    img: "/Agency/connectors/X Ads.svg",
  },
  {
    title: "Xero",
    img: "/Agency/connectors/Xero.svg",
  },
  {
    title: "Klaviyo",
    img: "/Agency/connectors/Klaviyo.svg",
  },
  {
    title: "YouTube",
    img: "/Agency/connectors/YouTube.svg",
  },
];

const NewPopup = ({ showSubscribe, setShowSubscribe }) => {
  let maxPage = 4;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    name: "",
    profile: "",
    website: "",
    location: "",
    warrenty: "",
    deployment: "",
    license: "",
    keyContact: {
      name: "",
      profile: "",
      designation: "",
      email: "",
      phone: "",
    },
    dataSources: [],
  });

  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-main pt-10 text-white">
          <AiOutlineClose
            size={40}
            onClick={closeModal}
            className="absolute top-2 right-2 px-2 cursor-pointer"
          />
          <div className="mb-10">
            <div className="flex items-center px-[8vw]">
              <div className="bg-newBlue w-[9vw] aspect-square rounded-full flex items-center justify-center text-[24px]">
                {page > 1 ? <IoMdCheckmark /> : "1"}
              </div>
              <div
                className={`line h-[1px] w-full ${
                  page >= 2 ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`w-[9vw] aspect-square rounded-full ${
                  page >= 2
                    ? "bg-newBlue"
                    : "border border-gray-500/20 bg-[#343745]"
                } flex items-center justify-center text-[24px]`}
              >
                {page > 2 ? <IoMdCheckmark /> : "2"}
              </div>
              <div
                className={`line h-[1px] w-full ${
                  page == 3 ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`w-[9vw] aspect-square rounded-full ${
                  page >= 3
                    ? "bg-newBlue"
                    : "border border-gray-500/20 bg-[#343745]"
                } flex items-center justify-center text-[24px]`}
              >
                {page > 3 ? <IoMdCheckmark /> : "3"}
              </div>{" "}
              <div
                className={`line h-[1px] w-full ${
                  page >= maxPage ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`w-[9vw] aspect-square rounded-full ${
                  page == maxPage
                    ? "bg-newBlue"
                    : "border border-gray-500/20 bg-[#343745]"
                } flex items-center justify-center text-[24px]`}
              >
                {page > 4 ? <IoMdCheckmark /> : "4"}
              </div>
            </div>
            <div className="items-center grid grid-cols-4 mx-[2vw] mt-2">
              <p className="text-center">Client Details</p>
              <p className="text-center">Data Sources</p>
              <p className="text-center">Data Source IDs</p>
              <p className="text-center">Dashboard Templates</p>
            </div>
          </div>
          <div className="h-[40vh]">
            {page === 1 ? (
              <div className="px-[8vw] w-full">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1.5 text-base">
                    Client Name
                    <Required />
                  </label>
                  <input
                    id="name"
                    value={data?.name}
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Client Name"
                    className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] px-4 py-2 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-8 mt-6">
                  <div className="flex flex-col">
                    <label htmlFor="website" className="mb-1.5 text-base">
                      Report Start Date
                      <Required />
                    </label>
                    <input
                      id="website"
                      value={data?.website}
                      onChange={(e) => {
                        setData({ ...data, website: e.target.value });
                      }}
                      type="date"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="location" className="mb-1.5 text-base">
                      Refresh Frequency
                    </label>
                    <select
                      id="location"
                      value={data?.location}
                      onChange={(e) => {
                        setData({ ...data, location: e.target.value });
                      }}
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                    >
                      <option value=""></option>
                    </select>
                  </div>
                </div>
              </div>
            ) : page == 2 ? (
              <div className="px-[4vw] h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                {" "}
                <div className="relative flex items-center w-[456px]">
                  <FaSearch className="absolute left-4 z-40 text-white" />{" "}
                  {/* Search Icon */}
                  <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    className="outline-none text-base border border-gray-500/20 px-6 bg-[#898989]/15 py-2 rounded-lg pl-12 w-full" // Add padding to the left for the icon
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-5">
                  {connectorsData
                    ?.filter((e) => {
                      if (search) {
                        return e?.title
                          ?.toLowerCase()
                          ?.includes(search?.toLowerCase());
                      }
                      return e;
                    })
                    .map((e, i) => {
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between border border-gray-300/30 px-3 py-3 rounded-full"
                        >
                          <div className="flex items-center">
                            <Image
                              src={e?.img}
                              alt={e?.img?.src}
                              width={1000}
                              height={1000}
                              className="w-8 h-8 mr-2 aspect-squre object-contain"
                            />
                            <label
                              htmlFor={e?.title}
                              className="mainText14 cursor-pointer"
                            >
                              {e?.title}
                            </label>
                          </div>
                          <div className="inline-flex items-start mr-1">
                            <label className="relative flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="before:content[''] peer relative h-6 w-6 rounded-full cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                                id="check"
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
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : page == 3 ? (
              <div className="px-[4vw] h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                <div className="grid grid-cols-2 gap-3 mt-5">
                  {connectorsData.map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="border border-gray-300/30 p-4 rounded-md"
                      >
                        <div className="flex items-center">
                          <Image
                            src={e?.img}
                            alt={e?.img?.src}
                            width={1000}
                            height={1000}
                            className="w-8 h-8 mr-2 aspect-squre object-contain"
                          />
                          <label
                            htmlFor={e?.title}
                            className="mainText14 cursor-pointer"
                          >
                            {e?.title}
                          </label>
                        </div>{" "}
                        <div className="mt-3 flex flex-col">
                          <label
                            htmlFor={`name${e?.title
                              ?.toLowerCase()
                              ?.replaceAll(" ", "")}`}
                            className="mb-1.5 text-base"
                          >
                            Enter Account Id
                            <Required />
                          </label>
                          <input
                            id={`name${e?.title
                              ?.toLowerCase()
                              ?.replaceAll(" ", "")}`}
                            value={data?.name}
                            onChange={(e) => {
                              setData({ ...data, name: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter Client Name"
                            className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] px-4 py-2 rounded-lg"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="px-[4vw] h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                <div className="grid grid-cols-4 gap-x-4">
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
            )}
          </div>
          <div className="border-t border-t-gray-100/30 px-[5vw] w-full flex items-center justify-between py-6 mt-10 mainText20">
            <button
              className={`text-white w-[170px] ${
                page == 1 ? "bg-[#898989]/15" : "bg-newBlue cursor-pointer"
              } h-12 rounded-lg`}
              disabled={page == 1}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (page == maxPage) {
                } else {
                  setPage(page + 1);
                }
              }}
              className={`text-white bg-newBlue w-[170px] h-12 rounded-lg`}
            >
              {page == maxPage ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewPopup;
