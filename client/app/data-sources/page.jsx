"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import AddAgency from "@/app/Components/agencies/AddAgency";
import Context from "../Context/Context";
import Image from "next/image";
import { IoReload } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import toast from "react-hot-toast";
import { BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

function formatName(input) {
  return input
    .toLowerCase()
    .split("_")
    .map((word) => {
      // Check if the word contains "id" or "url"
      if (word.includes("id") || word.includes("url") || word.includes("Id")) {
        return word.toUpperCase();
      }
      // Otherwise, capitalize the first letter of the word
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
const DataSources = () => {
  const { platformsData, getDataSourcesDataFromAPI } = useContext(Context);
  const [addAgency, setAddAgency] = useState(false);

  const refreshByAgencyId = async (platformList) => {
    let platforms = platformList?.map((e) => e?.platform);

    try {
      const token = getCookie("token");

      const response = await fetch(`${BACKEND_URI}/data-refresh/refersh-all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(platforms),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData?.msg?.includes("Failed")) {
        toast.error(responseData.msg);
      } else {
        toast.success(responseData.msg);
      }
      getDataSourcesDataFromAPI();
    } catch (err) {
      console.error("Fetch Error:", err.message);
      toast.error("Internal Server Error");
    }
  };

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
              <h3 className="text-xl min-[1600px]:text-2xl font-semibold">
                All Data Sources{" "}
                <span className="text-lg min-[1600px]:text-xl text-white/80">
                  ({platformsData?.platforms?.length})
                </span>
              </h3>
              <button
                onClick={() => {
                  refreshByAgencyId(platformsData?.platforms);
                }}
                className="bg-newBlue text-white flex items-center gap-x-2 rounded-lg px-6 py-3"
              >
                <TfiReload />
                Refresh All
              </button>
            </div>
            <div className="mt-5 border border-gray-200/5 h-[75vh] rounded-2xl">
              <div className="h-fit p-6 grid grid-cols-6 gap-5">
                {platformsData?.platforms?.map((e, i) => {
                  return <Block e={e} key={i} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

const Block = ({ e }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    platforms: [],
  });
  const {
    userData,
    getDataSourcesDataFromAPI,
    dataSourceStructure,
    getDataSourceStructure,
  } = useContext(Context);
  const [isRotating, setIsRotating] = useState(false);
  const [credentialsState, setCredentialsState] = useState([]);
  const [isNewPlatform, setIsNewPlatform] = useState(false);
  function closeModal() {
    setIsModalOpen(false);
  }
  useEffect(() => {
    console.log(dataSourceStructure);
    const areCredentialsEmpty = (creds) => {
      console.log(creds);
      return Object.values(creds).every((value) => value === null);
    };
    dataSourceStructure?.map((item) => {
      if (item?.platform == e?.platform) {
        setIsNewPlatform(
          areCredentialsEmpty(item?.creds_structure?.credentials)
        );
      }
    });
    // dataSourceStructure.map((item));
  }, [dataSourceStructure]);
  const handleReloadClick = async () => {
    setIsRotating(true);

    const token = getCookie("token");
    const url = `${BACKEND_URI}/data-refresh/refersh?agency_id=${encodeURIComponent(
      userData?.agency_id
    )}&script_name=${encodeURIComponent(e?.platform)}`;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token.trim()}`,
    };

    try {
      const response = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        console.error("Fetch Error:", response.statusText);
        toast.error("Internal Server Error");
        return;
      }

      const responseData = await response.json();
      if (responseData?.message?.includes("Failed")) {
        toast.error(responseData.message);
      } else {
        toast.success(responseData.message);
      }
      getDataSourcesDataFromAPI();
    } catch (err) {
      console.error("Fetch Error:", err.message);
      toast.error("Internal Server Error");
    }

    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  const addClientCredentials = async () => {
    try {
      let credentials = credentialsState[0]?.creds_structure?.credentials;
      console.log(credentialsState[0]?.creds_structure);
      const response = await axios.post(
        `${BACKEND_URI}/client/connect-datasource?platform_name=${credentialsState[0]?.platform}`,
        { ...credentials },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      if (response.data) {
        setIsModalOpen(false);
        toast.success(response.data.msg);
        // getDataSourcesDataFromAPI();
        getDataSourceStructure();
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An error occurred while creating the user");
    }
  };

  return (
    <div className="border border-gray-400/20 rounded-2xl p-2">
      {
        <div
          className={`mr-4 w-full flex justify-end items-end ${
            !isNewPlatform ? "visible" : "invisible"
          } cursor-pointer`}
        >
          <svg
            className="w-4 min-[1600px]:w-5 h-4 min-[1600px]:h-5"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setIsModalOpen(true)}
          >
            <path
              d="M9.1665 3.33332H5.6665C4.26637 3.33332 3.56631 3.33332 3.03153 3.6058C2.56112 3.84549 2.17867 4.22794 1.93899 4.69834C1.6665 5.23312 1.6665 5.93319 1.6665 7.33332V14.3333C1.6665 15.7335 1.6665 16.4335 1.93899 16.9683C2.17867 17.4387 2.56112 17.8212 3.03153 18.0608C3.56631 18.3333 4.26637 18.3333 5.6665 18.3333H12.6665C14.0666 18.3333 14.7667 18.3333 15.3015 18.0608C15.7719 17.8212 16.1543 17.4387 16.394 16.9683C16.6665 16.4335 16.6665 15.7335 16.6665 14.3333V10.8333M6.66648 13.3333H8.06193C8.46959 13.3333 8.67341 13.3333 8.86522 13.2873C9.03528 13.2464 9.19786 13.1791 9.34698 13.0877C9.51517 12.9847 9.6593 12.8405 9.94755 12.5523L17.9165 4.58332C18.6069 3.89296 18.6069 2.77368 17.9165 2.08332C17.2261 1.39296 16.1069 1.39296 15.4165 2.08332L7.44753 10.0523C7.15928 10.3405 7.01515 10.4847 6.91208 10.6528C6.8207 10.802 6.75336 10.9645 6.71253 11.1346C6.66648 11.3264 6.66648 11.5302 6.66648 11.9379V13.3333Z"
              stroke="#85888E"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      }
      <div className="py-10 border-b-[2px] border-gray-400/20  cursor-pointer flex flex-col text-white justify-center items-center lg:px-0 px-0 h-fit">
        <Image
          src={e?.logo}
          alt={e?.logo?.src}
          width={1000}
          height={1000}
          className="aspect-square object-contain w-2/12"
        />
        <p className="text-sm text-center min-[1600px]:text-base cursor-pointer mt-2">
          {formatName(e?.platform)}
        </p>
      </div>
      <div className="mt-2 flex items-end justify-between px-2">
        {isNewPlatform && e?.platform !== "shopify" && (
          <p
            className="text-[10px] w-full text-center justify-center min-[1600px]:text-xs cursor-pointer bg-newBlue text-white flex items-center gap-x-2 rounded-lg px-6 py-3"
            onClick={() => setIsModalOpen(true)}
          >
            Setup Platform
          </p>
        )}
        {(!isNewPlatform || e?.platform === "shopify") && (
          <>
            <p className="text-[10px] min-[1600px]:text-xs cursor-pointer">
              Last Refresh Time
              <br />
              {new Date(e?.last_run).toString().slice(4, 21)}
            </p>
            <IoReload
              className={`text-lg cursor-pointer transition-transform ${
                isRotating ? "animate-spin" : ""
              }`}
              onClick={handleReloadClick}
            />
          </>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
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
          <div className="mb-12">
            <p className="text-center text-3xl mb-5">{"Platform Setup"}</p>
          </div>
          <div className="h-[45vh] min-[1600px]:h-[40vh]">
            <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
              <Page4
                credentialsState={credentialsState}
                setCredentialsState={setCredentialsState}
                selectedPlatform={e?.platform}
                data={data}
              />
            </div>
          </div>
          <div className="border-t border-t-gray-100/30 px-[3vw] min-[1600px]:px-[5vw] w-full flex items-center justify-end py-6 mt-10 mainText20">
            <button
              onClick={() => {
                addClientCredentials();
              }}
              className={`text-white text-base min-[1600px]:text-lg bg-newBlue w-[150px] min-[1600px]:w-[170px] h-10 min-[1600px]:h-12 rounded-lg`}
            >
              {"Submit"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Page4 = ({
  credentialsState,
  setCredentialsState,
  selectedPlatform,
  data,
}) => {
  const { mainDataSource, dataSourceStructure } = useContext(Context);

  const handleFileUpload = (event,platform,key) => {
    const file = event.target.files[0];
    // setserviceAcc1(file);
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target.result;
        try {
          // Check if the file content is not empty before parsing
          if (result) {
            const content = JSON.parse(result);
            handleInputChange(platform,key,JSON.stringify(content),true)
          } else {
            throw new Error("Empty file content");
          }
        } catch (error) {
          console.error("Invalid JSON:", error);
          toast.error("Invalid JSON file. Please check the file format.");
        }
      };

      reader.onerror = () => {
        console.error("File reading error:", reader.error);
        toast.error("An error occurred while reading the file.");
      };

      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid JSON file.");
    }
  };

  useEffect(() => {
    if (credentialsState?.length == 0) {
      console.log(dataSourceStructure);
      const newCredentials = dataSourceStructure
        ?.filter((e) => selectedPlatform === e?.platform)
        ?.map((e) => {
          if (e?.creds_structure) {
            e.creds_structure["report_start_date"] = data?.report_start_date;
          }
          let temp = mainDataSource?.find((item) => item?.name === e?.platform);
          if (temp?.img_link) {
            return { ...e, img_link: temp?.img_link, report_start_date: "" };
          }
          return e;
        });
      setCredentialsState(newCredentials);
    }
  }, [dataSourceStructure, mainDataSource, selectedPlatform]);
  console.log(credentialsState);
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
    <div className="flex flex-col w-full mb-6">
      <Accordion>
        {credentialsState?.map((e, i) => (
          <AccordionItem
            key={i}
            initialEntered={true}
            header={({ state }) => (
              <div className="w-[100%] mt-3 flex flex-row justify-between items-center border-2 border-gray-300/30 px-3 p-3 rounded-tl-lg rounded-tr-lg">
                <div
                  className={`flex items-center ${
                    state.isEnter ? "visible" : "visible"
                  }`}
                >
                  <Image
                    src={e?.img_link}
                    alt={e?.platform}
                    width={1000}
                    height={1000}
                    className={`min-[1600px]:w-8 min-[1600px]:h-8 w-6 h-6 mr-2 aspect-square object-contain ${
                      state.isEnter ? "invisible" : "visible"
                    }`}
                  />
                  <label
                    htmlFor={e?.platform}
                    className="text-[13px] min-[1600px]:text-base cursor-pointer"
                  >
                    {formatName(e?.platform)}
                  </label>
                </div>
              </div>
            )}
          >
            <div
              key={i}
              className="border-b-2 border-l-2 border-r-2 gap-2 border-gray-300/30 px-3 pt-3 flex w-full h-full flex-row justify-between items-center rounded-bl-lg rounded-br-lg"
            >
              <div
                className={`flex items-center flex-col gap-4 justify-center basis-[30%]`}
              >
                <Image
                  src={e?.img_link}
                  alt={e?.platform}
                  width={1000}
                  height={1000}
                  className="min-[1600px]:w-12 min-[1600px]:h-16 w-12 h-16 mr-2 aspect-square object-contain"
                />
                <label
                  htmlFor={e?.platform}
                  className="text-[15px] min-[1600px]:text-[1.25rem] capitalize cursor-pointer"
                >
                  {formatName(e?.platform)}
                </label>
              </div>
              <div className="border-[0.5px] border-gray-300/30 h-[200px]"></div>
              <div className="mt-3 flex-1 px-6">
                {/* Show inputs only for the current platform */}

                {Object.keys(e?.creds_structure?.credentials || {}).map(
                  (key) => {
                    <p className="text-white">{key}</p>
                    if (key !== "google_service_account") {
                      return (
                        <div
                          key={key}
                          className="flex flex-row justify-between items-center"
                        >
                          <label
                            htmlFor={e?.platform}
                            className="text-[15px] min-[1600px]:text-[1rem] cursor-pointer"
                          >
                            {formatName(key)}
                          </label>
                          <input
                            type="text"
                            placeholder={formatName(key)}
                            value={
                              e?.creds_structure?.credentials[key]?.length > 0
                                ? e?.creds_structure?.credentials[key]
                                : ""
                            }
                            onChange={(event) =>
                              handleInputChange(
                                e.platform,
                                key,
                                event.target.value,
                                true
                              )
                            }
                            className="bg-transparent border border-gray-200/20 px-4 py-1.5 outline-none rounded-lg mr-4 mb-3"
                          />
                        </div>
                      );
                    } else if (key === "google_service_account") {
                      return (
                        <div
                          key={key}
                          className="flex flex-row justify-between items-center"
                        >
                          <label
                            htmlFor={e?.platform}
                            className="text-[15px] min-[1600px]:text-[1rem] cursor-pointer"
                          >
                            {formatName(key)}
                          </label>
                          <div className="flex flex-col">
                            {/* {e?.creds_structure?.credentials[key]?.length >
                              0 && (
                              <p className="text-sm text-gray-500 mb-2">
                                File already exists:{" "}
                                {e?.creds_structure?.credentials[key]}
                              </p>
                            )} */}
                            <input
                              placeholder={formatName(key)}
                              type="file"
                              onChange={(file)=>handleFileUpload(file,e?.platform,key)}
                              // ref={fileInputRef}
                              // value="" // File inputs generally shouldn't have a controlled `value`.
                              className="bg-transparent border border-gray-200/20 px-4 py-1.5 outline-none rounded-lg"
                            />
                          </div>
                          {/* <input
                            type="text"
                            placeholder={formatName(key)}
                            value={
                              e?.creds_structure?.credentials[key]?.length > 0
                                ? e?.creds_structure?.credentials[key]
                                : ""
                            }
                            onChange={(event) =>
                              handleInputChange(
                                e.platform,
                                key,
                                event.target.value,
                                true
                              )
                            }
                            className="bg-transparent border border-gray-200/20 px-4 py-1.5 outline-none rounded-lg mr-4 mb-3"
                          /> */}
                        </div>
                      );
                    }
                    return null; // Return null for cases not handled above
                  }
                )}
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DataSources;
