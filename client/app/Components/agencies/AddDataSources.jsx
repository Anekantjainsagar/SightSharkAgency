"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Context from "@/app/Context/Context";
import { getCookie } from "cookies-next";
import { BACKEND_URI } from "@/app/utils/url";
import axios from "axios";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { Switch } from "antd";

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

let nav_data = ["Data Sources", "Data Sources Ids"];

function formatName(input) {
  return input
    ?.split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const AddDataSouces = ({ showSubscribe, setShowSubscribe, data }) => {
  let maxPage = 2;
  const [credentialsState, setCredentialsState] = useState([]);
  const [allowedPlatforms, setAllowedPlatforms] = useState([]);
  const { mainDataSource,agencies,clientId,selectedClientDetails, clientCreds, getCredentialsForClient,dataSourceStructure } =
    useContext(Context);
  
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  function closeModal() {
    setShowSubscribe(false);
  }
  console.log(allowedPlatforms);

  useEffect(() => {
    let temp = agencies?.data?.find(
      (e) => e?.client_id == clientId
    );
    console.log(temp)
    if (selectedClientDetails?.platform_name) {
      setAllowedPlatforms((prevPlatforms) => {
        const newPlatforms = temp?.platform_name.map((e) => e);
        return Array.from(new Set([...prevPlatforms, ...newPlatforms]));
      });
    }
  }, [clientCreds]);

  return (
    <div className="z-50">
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
            <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
              <Page4
                credentialsState={credentialsState}
                setCredentialsState={setCredentialsState}
                allowedPlatforms={allowedPlatforms}
              />
            </div>
          )}
          <div className="border-t border-t-gray-100/30 px-[3vw] min-[1600px]:px-[5vw] w-full flex items-center justify-between py-6 mt-10 mainText20">
            <button
              className={`text-white text-base min-[1600px]:text-lg w-[150px] min-[1600px]:w-[170px] ${
                page == 1 ? "bg-[#898989]/15 invisible" : "bg-newBlue cursor-pointer visible"
              } h-10 min-[1600px]:h-12 rounded-lg`}
              disabled={page == 1}
              onClick={() => {
                // setAllowedPlatforms([])
                setPage(page - 1);
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (page == maxPage) {
                  const difference = clientCreds?.data
                    ?.map((cred) => cred.platform_name)
                    ?.filter((name) => !allowedPlatforms?.includes(name));

                  if (difference?.length > 0 && data?.client_id) {
                    let cookie = getCookie("token");
                    console.log(difference);
                    Promise.all(
                      difference.map((item) => {
                        const url = `${BACKEND_URI}/client/delete-client-credentials?client_id=${encodeURIComponent(
                          data?.client_id?.trim()
                        )}&platform_name=${encodeURIComponent(item.trim())}`;

                        return axios
                          .delete(url, {
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${cookie}`,
                            },
                          })
                          .then((response) => {
                            return response.data;
                          })
                          .catch((error) => {
                            if (error.response) {
                              throw {
                                status: error.response.status,
                                ...error.response.data,
                              };
                            } else {
                              throw { message: error.message };
                            }
                          });
                      })
                    )
                      .then(() => {
                        toast.success("Tables removed successfully!");
                        setShowSubscribe(false);
                        getCredentialsForClient(data?.client_id);
                      })
                      .catch((error) => {
                        if (error.status === 401) {
                          toast.error(
                            "Authentication failed. Please log in again."
                          );
                        } else {
                          console.error("Error:", error);
                          toast.error(error.message || "Error adding tables");
                        }
                      });
                  }
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
        ?.length > 0 &&
      !allowedPlatforms?.includes(e?.name)
    ) {
      setChecked(true);
      setAllowedPlatforms([...allowedPlatforms, e?.name]);
    }

    if (allowedPlatforms?.includes(e?.name)) {
      setChecked(true);
    }
  }, [e?.name]);

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
  const [isEditable, setIsEditable] = useState({
    index: 1000,
    isEditable: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const { mainDataSource, getClient } = useContext(Context);

  const handleEditClick = (index) => {
    setIsEditable({ index: index, isEditable: true });
  };
  console.log(dataSourceStructure)

  useEffect(() => {
    if (credentialsState?.length == 0) {
      console.log(dataSourceStructure);
      const newCredentials = dataSourceStructure
        ?.filter((e) => allowedPlatforms?.includes(e?.platform))
        ?.map((e) => {
          // if(e?.creds_structure.type === "custom"){
          //   setIsChecked(true);
          // }

          let temp = mainDataSource?.find((item) => item?.name === e?.platform);
          if (temp?.img_link) {
            return { ...e, img_link: temp?.img_link, report_start_date: "" };
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
    <div className="flex flex-col w-full mb-6">
      <Accordion>
        {credentialsState?.map((e, i) => (
          <AccordionItem
            initialEntered={i === 0}
            key={i}
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
                <div className="">
                  {state.isEnter ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
            )}
          >
            <div
              key={i}
              className="border-b-2 border-l-2 border-r-2 gap-2 border-gray-300/30 px-3 pt-3 flex w-full h-full flex-row justify-between items-center rounded-bl-lg rounded-br-lg"
            >
              <div
                className={`flex items-center h-full flex-col gap-4 justify-center basis-[30%]`}
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
              <div className="border-[0.5px]  border-gray-300/30 h-[200px]"></div>
              <div className="mt-3 flex-1 flex min-h-[200px] flex-col px-6">
                {/* Show inputs only for the current platform */}
                <div className="flex flex-row justify-between border-b-2 pb-2 border-gray-300/30 items-center">
                  <p className="font-[500] text-[1.25rem]">Credentials</p>
                  {
                    <div className="flex flex-row justify-center items-center">
                      <p>Customize Data Source</p>
                      <Switch
                        checked={
                          e?.creds_structure?.type === "custom"
                            ? true
                            : isEditable.index === i
                        }
                        onChange={(checked) => {
                          handleInputChange(
                            e.platform,
                            "type",
                            checked ? "custom" : "default"
                          );
                          setIsChecked(checked);
                          setIsEditable((prevState) => ({
                            index: checked ? i : null,
                            isEditable: checked,
                          }));
                        }}
                        style={{
                          backgroundColor: (
                            e?.creds_structure?.type === "custom"
                              ? true
                              : isEditable.index === i
                          )
                            ? "#339a35"
                            : "#e9e9ea",
                          transform: "scale(1.0)",
                          marginRight: "20px",
                          marginLeft: "20px",
                          fontFamily: "Outfit, sans-serif",
                          borderColor: "black",
                        }}
                      />
                    </div>
                  }
                </div>
                {
                  <div className="flex mt-3 flex-row gap-2 justify-between capitalize items-center">
                    <label
                      htmlFor={e?.platform}
                      className="text-[15px] min-[1600px]:text-[1rem] capitalize cursor-pointer"
                    >
                      {formatName("account_ID") + " :"}
                    </label>
                    <input
                      type="text"
                      placeholder={formatName("account_id")}
                      value={
                        e?.creds_structure?.account_id?.length > 0
                          ? e?.creds_structure?.account_id
                          : null
                      }
                      onChange={(event) =>
                        handleInputChange(
                          e.platform,
                          "account_id",
                          event.target.value
                        )
                      }
                      className="bg-transparent border border-gray-200/20 px-4 py-1.5 outline-none rounded-lg mr-4 mb-3"
                    />
                  </div>
                }

                {e?.creds_structure?.account_filter && (
                  <div className="flex flex-row justify-between items-center">
                    <label
                      htmlFor={e?.platform}
                      className="text-[15px] min-[1600px]:text-[1rem] capitalize cursor-pointer"
                    >
                      {formatName("account_filter")}
                    </label>
                    <input
                      type="text"
                      placeholder={formatName("account_filter")}
                      value={
                        e?.creds_structure?.account_filter?.length > 0
                          ? e?.creds_structure?.account_filter
                          : null
                      }
                      onChange={(event) =>
                        handleInputChange(
                          e.platform,
                          "account_filter",
                          event.target.value
                        )
                      }
                      className="bg-transparent border border-gray-200/20 px-4 py-1.5 capitalize outline-none rounded-lg mr-4 mb-3"
                    />
                  </div>
                )}
                {(e?.creds_structure?.type === "custom"
                  ? true
                  : isEditable.index === i) &&
                  Object.keys(e?.creds_structure?.credentials || {}).map(
                    (key) => (
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
                          key={key}
                          readOnly={
                            isEditable.index !== i &&
                            e?.creds_structure?.credentials[key]?.length === 0
                          }
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
                    )
                  )}
              </div>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AddDataSouces;
