"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
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

const AddAgency = ({ showSubscribe, setShowSubscribe }) => {
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
  const fileInputRef = React.useRef(null);
  const fileInputRefAgent = React.useRef(null);

  // Function to handle file selection
  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  const handleFileChangeAgent = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

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
              <div className="bg-newBlue w-[8vw] aspect-square rounded-full flex items-center justify-center text-[24px]">
                {page > 1 ? <IoMdCheckmark /> : "1"}
              </div>
              <div
                className={`line h-[1px] w-full ${
                  page >= 2 ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`w-[8vw] aspect-square rounded-full ${
                  page >= 2
                    ? "bg-newBlue"
                    : "border border-gray-500/20 bg-[#343745]"
                } flex items-center justify-center text-[24px]`}
              >
                {page > 2 ? <IoMdCheckmark /> : "2"}
              </div>
              <div
                className={`line h-[1px] w-full ${
                  page == maxPage ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`w-[8vw] aspect-square rounded-full ${
                  page >= 3
                    ? "bg-newBlue"
                    : "border border-gray-500/20 bg-[#343745]"
                } flex items-center justify-center text-[24px]`}
              >
                {page > 3 ? <IoMdCheckmark /> : "3"}
              </div>
              <div
                className={`line h-[1px] w-full ${
                  page == maxPage ? "bg-newBlue" : "bg-[#343745]"
                }`}
              ></div>
              <div
                className={`w-[8vw] aspect-square rounded-full ${
                  page == maxPage
                    ? "bg-newBlue"
                    : "border border-gray-500/20 bg-[#343745]"
                } flex items-center justify-center text-[24px]`}
              >
                {page > 4 ? <IoMdCheckmark /> : "4"}
              </div>
            </div>
            <div className="grid grid-cols-4 text-sm min-[1600px]:text-lg justify-between mt-2">
              <p className="text-center">Client Details</p>
              <p className="text-center">Key Contact Details</p>
              <p className="text-center">Data Sources</p>
              <p className="text-center">Dashboard Templates</p>
            </div>
          </div>
          <div className="h-[45vh] min-[1600px]:h-[40vh]">
            {page === 1 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChangeProfile}
                    />
                    <div
                      onClick={() => {
                        fileInputRef.current.click();
                      }}
                      className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 -bottom-2 cursor-pointer -right-2 rounded-full"
                    >
                      +
                    </div>
                    <Image
                      src={
                        data?.profile ? data?.profile : "/Agency/temp_logo.png"
                      }
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      className="w-[4vw] rounded-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
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
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="website"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Website
                      <Required />
                    </label>
                    <input
                      id="website"
                      value={data?.website}
                      onChange={(e) => {
                        setData({ ...data, website: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Website"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="location"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      value={data?.location}
                      onChange={(e) => {
                        setData({ ...data, location: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Location"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="warrenty"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Warranty Period
                      <Required />
                    </label>
                    <input
                      id="warrenty"
                      value={data?.warrenty}
                      onChange={(e) => {
                        setData({ ...data, warrenty: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Warranty Period"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="deployment"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Deployment Date
                    </label>
                    <input
                      id="deployment"
                      value={data?.deployment}
                      onChange={(e) => {
                        setData({ ...data, deployment: e.target.value });
                      }}
                      type="date"
                      placeholder="Enter deployment Period"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="license"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      License Limit
                      <Required />
                    </label>
                    <input
                      id="license"
                      value={data?.license}
                      onChange={(e) => {
                        setData({ ...data, license: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter License Limit"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : page == 2 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRefAgent}
                      style={{ display: "none" }}
                      onChange={handleFileChangeAgent}
                    />
                    <div
                      onClick={() => {
                        fileInputRef.current.click();
                      }}
                      className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 -bottom-2 cursor-pointer -right-2 rounded-full"
                    >
                      +
                    </div>
                    <Image
                      src={
                        data?.profile ? data?.profile : "/Agency/temp_logo.png"
                      }
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      className="w-[4vw] rounded-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="namekey"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Name
                    </label>
                    <input
                      id="namekey"
                      value={data?.keyContact?.name}
                      onChange={(e) => {
                        setData({
                          ...data,
                          keyContact: {
                            ...data?.keyContact,
                            name: e.target.value,
                          },
                        });
                      }}
                      type="text"
                      placeholder="Enter Name"
                      className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="designation"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Designation
                    </label>
                    <input
                      id="designation"
                      value={data?.keyContact?.designation}
                      onChange={(e) => {
                        setData({
                          ...data,
                          keyContact: {
                            ...data?.keyContact,
                            designation: e.target.value,
                          },
                        });
                      }}
                      type="text"
                      placeholder="Enter Designation"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      value={data?.keyContact?.email}
                      onChange={(e) => {
                        setData({
                          ...data,
                          keyContact: {
                            ...data?.keyContact,
                            email: e.target.value,
                          },
                        });
                      }}
                      type="email"
                      placeholder="Enter Email Address"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Phone no.
                    </label>
                    <input
                      id="phone"
                      value={data?.keyContact?.phone}
                      onChange={(e) => {
                        setData({
                          ...data,
                          keyContact: {
                            ...data?.keyContact,
                            phone: e.target.value,
                          },
                        });
                      }}
                      type="number"
                      placeholder="Enter Phone no."
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : page == 3 ? (
              <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                {" "}
                <div className="relative flex items-center w-[350px] min-[1600px]:w-[456px]">
                  <FaSearch className="absolute left-4 z-40 text-white" />{" "}
                  {/* Search Icon */}
                  <input
                    type="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    className="outline-none text-sm min-[1600px]:text-base border border-gray-500/20 px-6 bg-[#898989]/15 py-1.5 min-[1600px]:py-2 rounded-lg pl-12 w-full" // Add padding to the left for the icon
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
                              className="min-[1600px]:w-8 min-[1600px]:h-8 w-6 h-6 mr-2 aspect-squre object-contain"
                            />
                            <label
                              htmlFor={e?.title}
                              className="text-[13px] min-[1600px]:text-base cursor-pointer"
                            >
                              {e?.title}
                            </label>
                          </div>
                          <div className="inline-flex items-start mr-1">
                            <label className="relative flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="before:content[''] peer relative min-[1600px]:h-6 min-[1600px]:w-6 w-5 h-5 rounded-full cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                                id="check"
                              />
                              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="min-[1600px]:h-4 min-[1600px]:w-4 w-3 h-3"
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
            ) : (
              <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                <div className="grid grid-cols-4 gap-x-4 mt-2">
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
          <div className="border-t border-t-gray-100/30 px-[3vw] min-[1600px]:px-[5vw] w-full flex items-center justify-between py-6 mt-10 mainText20">
            <button
              className={`text-white text-base min-[1600px]:text-lg w-[150px] min-[1600px]:w-[170px] ${
                page == 1 ? "bg-[#898989]/15" : "bg-newBlue cursor-pointer"
              } h-10 min-[1600px]:h-12 rounded-lg`}
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
              className={`text-white text-base min-[1600px]:text-lg bg-newBlue w-[150px] min-[1600px]:w-[170px] h-10 min-[1600px]:h-12 rounded-lg`}
            >
              {page == maxPage ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddAgency;
