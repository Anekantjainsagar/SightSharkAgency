"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Context from "@/app/Context/Context";

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

function formatName(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const AddDataSouces = ({ showSubscribe, setShowSubscribe }) => {
  const [credentialsState, setCredentialsState] = useState([]);
  const [allowedPlatforms, setAllowedPlatforms] = useState([]);
  const { mainDataSource } = useContext(Context);
  let maxPage = 2;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  function closeModal() {
    setShowSubscribe(false);
  }
  let nav_data = ["Data Sources", "Data Sources Ids"];

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
          />{" "}
          <div className="mb-10 w-full">
            <div className="flex items-center justify-center w-full pl-[20vw]">
              {nav_data.map((e, i, arr) => {
                return (
                  <div key={i} className="flex items-center w-full">
                    <div
                      className={`${
                        page >= i + 1
                          ? "bg-newBlue"
                          : "border border-gray-500/20 bg-[#343745]"
                      } ${
                        i != arr.length - 1 ? "w-[3vw]" : "w-[2.5vw]"
                      } aspect-square rounded-full flex items-center justify-center text-[24px]`}
                    >
                      {page > i + 1 ? <IoMdCheckmark /> : i + 1}
                    </div>
                    {arr.length - 1 !== i && (
                      <div
                        className={`h-[1px] w-full ${
                          page > i + 1 ? "bg-newBlue" : "bg-[#343745]"
                        }`}
                      ></div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-2 text-sm min-[1600px]:text-base justify-between mt-2 px-[10vw]">
              {nav_data.map((e, i) => {
                return (
                  <p className="text-center" key={i}>
                    {e}
                  </p>
                );
              })}
            </div>
          </div>
          {page == 1 ? (
            <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
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
                {mainDataSource
                  ?.filter((e) => {
                    if (search) {
                      return e?.name
                        ?.toLowerCase()
                        ?.includes(search?.toLowerCase());
                    }
                    return e;
                  })
                  .map((e, i) => {
                    return (
                      <DataSourceBox
                        key={i}
                        e={e}
                        setAllowedPlatforms={setAllowedPlatforms}
                        allowedPlatforms={allowedPlatforms}
                      />
                    );
                  })}
              </div>
            </div>
          ) : (
            <Page4
              credentialsState={credentialsState}
              setCredentialsState={setCredentialsState}
              allowedPlatforms={allowedPlatforms}
            />
          )}
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

const DataSourceBox = ({ e, setAllowedPlatforms, allowedPlatforms }) => {
  const [checked, setChecked] = useState(false);
  const { clientCreds } = useContext(Context);

  useEffect(() => {
    if (
      clientCreds?.data?.find((el) => el?.platform_name === e?.name)?.client_id
        ?.length > 0
    ) {
      setChecked(true);
      setAllowedPlatforms([...allowedPlatforms, e?.name]);
    }

    if (allowedPlatforms?.includes(e?.name)) {
      setChecked(true);
    }
  }, [e]);

  return (
    <div className="flex items-center justify-between border border-gray-300/30 px-3 py-3 rounded-full">
      <div className="flex items-center">
        <Image
          src={e?.img_link}
          alt={e?.img_link?.src}
          width={1000}
          height={1000}
          className="min-[1600px]:w-8 min-[1600px]:h-8 w-6 h-6 mr-2 aspect-squre object-contain"
        />
        <label
          htmlFor={e?.name}
          className="text-[13px] min-[1600px]:text-base cursor-pointer"
        >
          {formatName(e?.name)}
        </label>
      </div>
      <div className="inline-flex items-start mr-1">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="before:content[''] peer relative min-[1600px]:h-6 min-[1600px]:w-6 w-5 h-5 rounded-full cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
            id={e?.name}
            onChange={() => {
              if (allowedPlatforms?.includes(e?.name)) {
                setAllowedPlatforms(
                  allowedPlatforms?.filter((el) => el != e?.name)
                );
              } else {
                setAllowedPlatforms([...allowedPlatforms, e?.name]);
              }
              setChecked(!checked);
            }}
            checked={checked}
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
};

const Page4 = ({ credentialsState, setCredentialsState, allowedPlatforms }) => {
  const { mainDataSource, dataSourceStructure } = useContext(Context);

  useEffect(() => {
    if (credentialsState?.length == 0) {
      const newCredentials = dataSourceStructure
        ?.filter((e) => allowedPlatforms?.includes(e?.platform))
        ?.map((e) => {
          let temp = mainDataSource?.find((item) => item?.name === e?.platform);
          if (temp?.img_link) {
            return { ...e, img_link: temp?.img_link };
          }
          return e;
        });
      setCredentialsState(newCredentials);
    }
  }, [dataSourceStructure, mainDataSource, allowedPlatforms]);

  const handleInputChange = (platform, field, value, isCredential = false) => {
    setCredentialsState((prevState) =>
      prevState.map((item) =>
        item.platform === platform
          ? {
              ...item,
              creds_structure: {
                ...item.creds_structure,
                ...(isCredential
                  ? {
                      credentials: {
                        ...item.creds_structure.credentials,
                        [field]: value,
                      },
                    }
                  : { [field]: value }),
              },
            }
          : item
      )
    );
  };

  return (
    <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
      {credentialsState?.map(
        (e, i) =>
          e?.img_link && (
            <div
              key={i}
              className="border border-gray-300/30 px-3 py-3 rounded-lg"
            >
              <div className="flex items-center">
                <Image
                  src={e?.img_link}
                  alt={e?.platform}
                  width={1000}
                  height={1000}
                  className="min-[1600px]:w-8 min-[1600px]:h-8 w-6 h-6 mr-2 aspect-square object-contain"
                />
                <label
                  htmlFor={e?.platform}
                  className="text-[13px] min-[1600px]:text-base cursor-pointer"
                >
                  {formatName(e?.platform)}
                </label>
              </div>
              <div className="mt-3">
                {/* Show inputs only for the current platform */}
                <input
                  type="text"
                  placeholder={e?.creds_structure?.account_id
                    ?.replace("_", " ")
                    .toUpperCase()}
                  value={
                    e?.creds_structure?.account_id === "account_id"
                      ? ""
                      : e?.creds_structure?.account_id
                  }
                  onChange={(event) =>
                    handleInputChange(
                      e.platform,
                      "account_id",
                      event.target.value
                    )
                  }
                  className="bg-transparent border border-gray-200/20 px-4 py-1.5 outline-none rounded-lg mr-4"
                />

                {Object.keys(e?.creds_structure?.credentials || {}).map(
                  (key) => (
                    <input
                      key={key}
                      type="text"
                      placeholder={formatName(key)}
                      value={
                        e?.creds_structure?.credentials[key] === key
                          ? ""
                          : e?.creds_structure?.credentials[key]
                      }
                      onChange={(event) =>
                        handleInputChange(
                          e.platform,
                          key,
                          event.target.value,
                          true
                        )
                      }
                      className="bg-transparent border border-gray-200/20 px-4 py-1.5 outline-none rounded-lg mr-4"
                    />
                  )
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default AddDataSouces;
