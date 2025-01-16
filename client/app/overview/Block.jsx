"use client";
import { useContext, useEffect, useRef, useState } from "react";
import Context from "../Context/Context";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import axios from "axios";
import Modal from "react-modal";
import { BACKEND_URI } from "../utils/url";

const getCustomStyles = () => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;

  return {
    overlay: { zIndex: 50 },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      width: isMobile ? "90vw" : "65vw",
      border: "none",
    },
  };
};

const customStyles = getCustomStyles();

function formatName(input) {
  if (input) {
    return input
      .toLowerCase()
      .split("_")
      .map((word) => {
        if (
          word.includes("id") ||
          word.includes("url") ||
          word.includes("Id")
        ) {
          return word.toUpperCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  }
}

const Block = ({
  name,
  img,
  time,
  values,
  isDataSource,
  original_name,
  isNew,
  idx,
}) => {
  const [clicked, setClicked] = useState(false);
  const dropdownRef = useRef(null);
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
  const [credentialsState, setCredentialsState] = useState([]);
  const [isNewPlatform, setIsNewPlatform] = useState(false);
  const [dropDownValues, setDropDownValues] = useState([]);
  const isConfigured =
    (!isNewPlatform ||
      original_name === "shopify" ||
      original_name === "recharge") &&
    !isNew;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (isDataSource) {
      const areCredentialsEmpty = (creds) => {
        return Object.values(creds).every((value) => value === null);
      };

      dataSourceStructure?.map((item) => {
        if (item?.platform == original_name) {
          setIsNewPlatform(
            areCredentialsEmpty(item?.creds_structure?.credentials)
          );
        }
      });
    }
  }, [dataSourceStructure, original_name]);

  useEffect(() => {
    if (isDataSource) {
      if (isNew) {
        setDropDownValues([
          {
            title: "Request Data Source",
            onClick: () => {
              requestDataSource();
            },
          },
        ]);
      } else {
        if (!isConfigured) {
          setDropDownValues([
            {
              title: "Setup Platform",
              onClick: () => setIsModalOpen(true),
            },
          ]);
        } else {
          setDropDownValues([
            { title: "Edit Connection", onClick: () => setIsModalOpen(true) },
            {
              title: "Refresh Data Source",
              onClick: () => handleReloadClick(),
            },
          ]);
        }
      }
    }
  }, [isDataSource, isNew, isNewPlatform]);

  const handleReloadClick = async () => {
    const token = getCookie("token");
    const url = `${BACKEND_URI}/data-refresh/refersh?agency_id=${encodeURIComponent(
      userData?.agency_id
    )}&script_name=${encodeURIComponent(name)}`;
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
      setClicked(false);
      getDataSourcesDataFromAPI();
    } catch (err) {
      console.error("Fetch Error:", err.message);
      toast.error("Internal Server Error");
    }
  };

  const addClientCredentials = async () => {
    try {
      let credentials = credentialsState[0]?.creds_structure?.credentials;

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

  const requestDataSource = () => {
    let cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/client/requset-datasource?platform_name=${original_name}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            toast.success(res.data.msg);
            setClicked(false);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`flex flex-row items-start gap-x-2 shadow-md ${
        isConfigured || name == "Looker Studio" || name == "Big Query"
          ? "shadow-green-600/40"
          : "shadow-gray-500/10"
      } px-3 md:px-5 py-3 md:py-7 bg-[#171C2A]/50 rounded-xl relative`}
    >
      {name == "Looker Studio" || name == "Big Query" ? (
        <Image
          src={img}
          alt={name + " Logo"}
          width={1000}
          height={1000}
          className="aspect-square object-contain w-16 md:w-12 min-[1600px]:w-14"
        />
      ) : (
        <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/40 w-16 md:w-12 min-[1600px]:w-14 aspect-square p-2 mr-0 min-[1600px]:mr-0">
          <Image
            src={img}
            alt={name + " Logo"}
            width={1000}
            height={1000}
            className="aspect-square object-contain"
          />
        </div>
      )}
      <div className="ml-2">
        <p
          className={`text-sm md:text-base min-[1600px]:text-lg cursor-pointer`}
        >
          {name}
        </p>
        {time && isConfigured && (
          <p className="text-[12px] mt-1 text-gray-500 min-[1600px]:text-sm cursor-pointer">
            Last Refresh
            <br />
            {new Date(time).toString().slice(4, 21)}
          </p>
        )}
        {!isConfigured && !isNew && (
          <p className="text-[12px] mt-0.5 w-10/12 text-gray-500 min-[1600px]:text-sm cursor-pointer">
            Connect your {name} account to fetch data
          </p>
        )}{" "}
        {isNew && (
          <p className="text-[12px] mt-0.5 w-10/12 text-gray-500 min-[1600px]:text-sm cursor-pointer">
            Request access to unlock insights of {name}
          </p>
        )}{" "}
        {name == "Big Query" && (
          <p className="text-[12px] mt-0.5 w-10/12 text-gray-500 min-[1600px]:text-sm cursor-pointer">
            All your data is stored in the Google {name}
          </p>
        )}
        {name == "Looker Studio" && (
          <p className="text-[12px] mt-0.5 w-10/12 text-gray-500 min-[1600px]:text-sm cursor-pointer">
            {values[0]?.title === "Connect"
              ? "Connect to your Looker Studio account to generate dashboards"
              : "Connected! Start building dashboards for your clients"}
          </p>
        )}
      </div>
      {(dropDownValues?.length > 0 || values?.length > 0) && (
        <BsThreeDotsVertical
          onClick={() => {
            setClicked(!clicked);
          }}
          className="absolute right-2 top-2 aspect-square rounded-full p-1.5 text-[28px] cursor-pointer hover:bg-gray-200/20 transition-all text-gray-300"
        />
      )}
      {clicked && (
        <div
          className={`w-fit md:w-[9vw] absolute ${
            idx % 4 !== 0 ? "right-2 md:-right-[7.5vw]" : "right-2"
          } z-50 top-10 shadow-sm text-xs md:text-sm shadow-gray-200/30 bg-main rounded-md`}
        >
          {(values || dropDownValues)?.map((e, i) => (
            <p
              key={i}
              onClick={() => {
                if (e?.link) {
                  window.open(e?.link, "_blank");
                } else {
                  e?.onClick();
                }
              }}
              className="py-2 md:py-3 cursor-pointer px-2 md:px-3 hover:bg-gray-50/20 rounded-md"
            >
              {e?.title}
            </p>
          ))}
        </div>
      )}
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
          <div className="md:mb-12">
            <p className="text-center text-2xl md:text-3xl mb-5">
              {"Platform Setup"}
            </p>
          </div>
          <div className="h-[45vh] min-[1600px]:h-[40vh]">
            <div className="px-[4vw] h-full pb-5 overflow-y-auto small-scroller w-full">
              <Page4
                credentialsState={credentialsState}
                setCredentialsState={setCredentialsState}
                selectedPlatform={original_name}
                data={data}
              />
            </div>
          </div>
          <div className="border-t border-t-gray-100/30 px-[3vw] min-[1600px]:px-[5vw] w-full flex items-center justify-end py-6 mt-10 mainText20">
            <button
              onClick={() => {
                addClientCredentials();
              }}
              className={`text-white text-sm md:text-base min-[1600px]:text-lg bg-newBlue w-[150px] min-[1600px]:w-[170px] h-10 min-[1600px]:h-12 rounded-lg`}
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
  let fileInputRef2 = useRef();
  const { mainDataSource, dataSourceStructure } = useContext(Context);
  const [fileData, setFileData] = useState("");

  const handleFileUpload = (event, platform, key) => {
    const file = event.target.files[0];
    // setserviceAcc1(file);
    setFileData(file);
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target.result;
        try {
          // Check if the file content is not empty before parsing
          if (result) {
            const content = JSON.parse(result);
            handleInputChange(platform, key, JSON.stringify(content), true);
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
                    className={`min-[1600px]:w-8 min-[1600px]:h-8 w-6 h-6 mr-2 aspect-square object-contain`}
                  />
                  <label
                    htmlFor={e?.platform}
                    className="text-[13px] ml-2 min-[1600px]:text-base cursor-pointer"
                  >
                    {formatName(e?.platform)}
                  </label>
                </div>
              </div>
            )}
          >
            <div
              key={i}
              className="gap-2 px-3 py-6 flex md:flex-row flex-col w-full border-r-2 border-l-2 border-b-2 border-gray-300/30 h-full justify-between items-center rounded-bl-lg rounded-br-lg"
            >
              <div
                className={`flex items-center flex-col gap-4 justify-center md:basis-[30%]`}
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
              {/* <div className="border-[0.5px] border-gray-300/30 h-[200px]"></div> */}
              <div className="mt-3 flex-1 md:flex-row flex-col md:px-6 w-full">
                {/* Show inputs only for the current platform */}

                {Object.keys(e?.creds_structure?.credentials || {}).map(
                  (key) => {
                    <p className="text-white">{key}</p>;
                    if (key !== "google_service_account") {
                      return (
                        <div
                          key={key}
                          className="flex md:flex-row flex-col justify-between items-start md:items-center md:mb-0 mb-2"
                        >
                          <label
                            htmlFor={e?.platform}
                            className="text-sm md:text-[15px] min-[1600px]:text-[1rem] cursor-pointer md:mb-0 mb-2"
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
                            className="bg-transparent border border-gray-200/20 md:w-fit w-full px-4 py-1.5 outline-none rounded-lg text-sm md:text-base mr-4 mb-3"
                          />
                        </div>
                      );
                    } else if (key === "google_service_account") {
                      return (
                        <div
                          key={key}
                          className="flex md:flex-row flex-col w-full justify-between items-start md:items-center"
                        >
                          <label
                            htmlFor={e?.platform}
                            className="text-sm md:text-[15px] min-[1600px]:text-[1rem] cursor-pointer md:mb-0 mb-2"
                          >
                            {formatName(key)}
                          </label>
                          {e?.creds_structure?.credentials[key]?.length > 0 ? (
                            <div className="flex flex-col">
                              {/* {e?.creds_structure?.credentials[key]?.length >
                              0 && (
                              <p className="text-sm text-gray-500 mb-2">
                                File already exists:{" "}
                                {e?.creds_structure?.credentials[key]}
                              </p>
                            )} */}{" "}
                              <label
                                className={`border border-gray-300/20 py-1 w-full px-5 rounded-md cursor-pointer`}
                              >
                                {/* Show file name or "Replace file" */}
                                {fileData ? fileData.name : "Replace file"}
                                <input
                                  type="file"
                                  onChange={(file) =>
                                    handleFileUpload(file, e?.platform, key)
                                  }
                                  ref={fileInputRef2}
                                  style={{ display: "none" }} // Hide the input
                                />
                              </label>
                              {/* {fileData && (
                                <AiOutlineClose
                                  className="text-lg cursor-pointer ml-2"
                                  onClick={handleClearFile}
                                />
                              )} */}
                              {/* <label
                                className={`border border-gray-300/20 py-1 px-4 rounded-md cursor-pointer`}
                              >
                                Replace file
                                <input
                                  onChange={(file) =>
                                    handleFileUpload(file, e?.platform, key)
                                  }
                                />
                              </label> */}
                            </div>
                          ) : (
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
                                onChange={(file) =>
                                  handleFileUpload(file, e?.platform, key)
                                }
                                // ref={fileInputRef}
                                // value="" // File inputs generally shouldn't have a controlled `value`.
                                className="bg-transparent border w-full border-gray-200/20 px-4 py-1.5 outline-none rounded-lg"
                              />
                            </div>
                          )}
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

export default Block;
