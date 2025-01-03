"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Required from "../Utils/Required";
import Context from "@/app/Context/Context";
import axios from "axios";
import { BACKEND_URI } from "@/app/utils/url";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { getCookie } from "cookies-next";
import Info from "../Login/Info";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Accordion, AccordionItem } from "@szhsin/react-accordion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
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

const AddAgency = ({ showSubscribe, setShowSubscribe }) => {
  const {
    mainDataSource,
    mainTemplates,
    getAgencies,
    checkPasswordCriteria,
    timezones,
    dataSourceStructure,
    getDataSourceStructure,
  } = useContext(Context);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [fileInput, setFileInput] = useState();
  const [credentialsState, setCredentialsState] = useState([]);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    profile: "",
    name: "",
    parent_name: "",
    report_start_date: "",
    website: "",
    location: "",
    timezone: "",
    keyContact: {
      name: "",
      profile: "",
      designation: "",
      email: "",
      phone: "",
    },
    platforms: [],
    templates: [],
    credentials: { email: "", password: "", cpassword: "" },
  });
  const fileInputRef = React.useRef(null);
  const criteria = checkPasswordCriteria(data?.credentials?.password);

  const isAllDataSourceConfigured = () => {
    let flag = true;
    let unConfiguredPlatform = "";
    for (const platform of data?.platforms || []) {
      for (const item of dataSourceStructure || []) {
        if (item?.platform === platform) {
          if (item?.creds_structure?.credentials) {
            const areCredentialsEmpty = (creds) =>
              Object.values(creds).every((value) => value === null);
            if (item?.platform === "shopify") {
              continue;
            }
            if (areCredentialsEmpty(item?.creds_structure?.credentials)) {
              flag = false;
              unConfiguredPlatform = item?.platform;
              break;
            }
          }
        }
      }
      if (!flag) break;
    }
    if (!flag) {
      toast.error(
        `${unConfiguredPlatform
          .replaceAll("_", " ")
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          ) // Capitalize the first letter
          .join(" ")} data source is not configured`
      );
    } else {
      setPage(page + 1);
    }
  };

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileInput(file);
      setData({ ...data, profile: URL.createObjectURL(file) });
    } else {
      console.log("No file selected");
    }
  };

  const handleClearProfile = () => {
    setFileInput(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setData({
      ...data,
      profile: "",
    });
  };

  function closeModal() {
    setShowSubscribe(false);
  }

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChangeProfile({ target: { files: [file] } });
    }
  };

  const handlePaste = (e) => {
    const clipboardItem = e.clipboardData.items[0];
    if (clipboardItem && clipboardItem.type.startsWith("image")) {
      const file = clipboardItem.getAsFile();
      handleFileChangeProfile({ target: { files: [file] } });
    }
  };

  let nav_data = [
    "Client Details",
    "Key Contact Details",
    "Data Sources",
    "Data Sources IDs",
    "Dashboard Templates",
    "Credentials",
  ];

  const validateDataSources = () => {
    const errorsMap = {};

    // Collect errors for each platform
    credentialsState.forEach((credential) => {
      const { platform, creds_structure } = credential;

      if (!creds_structure) {
        errorsMap[platform] = ["Missing credentials structure"];
        return;
      }

      // Check for required fields
      const requiredFields = [
        "account_id",
        ...Object.keys(creds_structure.credentials || {}),
      ];
      // requiredFields.forEach((field) => {
      //   const fieldValue =
      //     creds_structure[field] || creds_structure.credentials?.[field];
      //   if (!fieldValue || fieldValue.length === 0) {
      //     if (!errorsMap[platform]) {
      //       errorsMap[platform] = [];
      //     }
      //     errorsMap[platform].push(formatName(field));
      //   }
      // });
    });

    // Prepare grouped error messages
    const groupedErrors = Object.entries(errorsMap).map(
      ([platform, fields]) =>
        `${platform.replace("_", " ")}: ${fields.join(", ")} is missing`
    );

    if (groupedErrors.length > 0) {
      toast.error(
        <div className="w-[auto]">
          <p>Please fill all fields for data source:</p>
          <ul>
            {groupedErrors.map((error, index) => (
              <li className="capitalize" key={index}>
                {error}
              </li>
            ))}
          </ul>
        </div>,
        { duration: 5000, className: "custom-toast-container" }
      );
      return false; // Validation failed
    }

    return true; // Validation passed
  };

  const addClientCredentials = async (client_id, parent_name) => {
    if ((client_id, parent_name)) {
      try {
        const platforms = credentialsState.reduce((acc, e) => {
          let prefilled_platform = dataSourceStructure?.find(
            (ds) => e?.platform == ds?.platform
          );
          if (e?.platform === "recharge" || e?.platform == "shopify") {
            acc[e?.platform] = {
              ...e?.creds_structure,
              account_filter: e?.creds_structure?.account_filter || "blank",
            };
          } else {
            acc[e?.platform] = {
              type: e?.creds_structure?.type,
              account_id: e?.creds_structure?.account_id,
              report_start_date: e?.creds_structure?.report_start_date,
              account_filter: e?.creds_structure?.account_filter || "blank",
              credentials: prefilled_platform.creds_structure.credentials,
            };
          }
          return acc;
        }, {});

        const response = await axios.post(
          `${BACKEND_URI}/client/update-client-credentials?client_id=${client_id}&parent_name=${parent_name}`,
          { platforms },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        if (response.data) {
          toast.success("Client Created Successfully");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("An error occurred while creating the user");
      }
    }
  };

  const handleSave = async () => {
    if (
      data?.name &&
      data?.website &&
      data?.keyContact?.email &&
      data?.parent_name
    ) {
      if (data?.credentials?.password === data?.credentials?.cpassword) {
        // Construct query parameters
        const queryParams = new URLSearchParams({
          client_name: data?.name,
          parent_name: data?.parent_name,
          website: data?.website,
          location: data?.location,
          email_address: data?.credentials?.email || "",
          password: data?.credentials?.password || "",
          key_contact_name: data?.keyContact?.name,
          key_contact_designation: data?.keyContact?.designation,
          key_contact_email_address: data?.keyContact?.email,
          key_contact_phone: data?.keyContact?.phone,
          time_zone: data?.timezone,
          report_start_date: data?.report_start_date,
          ...data,
        }).toString();

        const formData = new FormData();
        formData.append("platform_name", data?.platforms || []);
        formData.append("template_ids", data?.templates || []);

        formData.append("profile_picture", fileInput || "");
        formData.append("profile_picture_filename", fileInput?.name || "");
        formData.append("profile_picture_content_type", fileInput?.type || "");

        try {
          const response = await axios.post(
            `${BACKEND_URI}/client/create?${queryParams}`,
            formData,
            {
              headers: {
                Accept:
                  "application/json, application/xml, text/plain, text/html, *.*",
                Authorization: `Bearer ${getCookie("token")}`,
              },
            }
          );

          if (response.data) {
            getAgencies();
            addClientCredentials(
              response.data?.data?.client_id,
              response?.data?.data?.parent_name
            );
            setShowSubscribe(false);
            setData({
              profile: "",
              name: "",
              parent_name: "",
              report_start_date: "",
              website: "",
              location: "",
              timezone: "",
              keyContact: {
                name: "",
                profile: "",
                designation: "",
                email: "",
                phone: "",
              },
              platforms: [],
              templates: [],
              credentials: { email: "", password: "", cpassword: "" },
            });
          }
        } catch (error) {
          console.error("Error creating user:", error);
          toast.error(error.response.data.detail);
        }
      } else {
        toast.error("Both Password should Match!!");
      }
    } else {
      toast.error("Please fill all the required details");
    }
  };

  useEffect(() => {
    // setPage(1);
    getDataSourceStructure();
    setData({ ...data, timezone: timezones[0]?.region_name });
  }, [timezones]);

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
          />
          <div className="mb-12">
            <p className="text-center text-3xl mb-5">{nav_data[page - 1]}</p>
            <div className="flex items-center justify-between pl-[8vw]">
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
          </div>
          <div className="h-[45vh] min-[1600px]:h-[40vh]">
            {page === 1 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div
                  className={`flex flex-col items-center justify-center mb-6 ${
                    isDragging
                      ? "border-2 border-dashed border-blue-500 bg-black/30 cursor-pointer"
                      : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onPaste={handlePaste} // Adding the paste event listener
                >
                  <div className="relative">
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChangeProfile}
                    />
                    <div
                      onClick={() => {
                        if (data?.profile) {
                          handleClearProfile();
                        } else {
                          fileInputRef.current.click();
                        }
                      }}
                      className="absolute bg-newBlue flex items-center justify-center text-2xl w-[1.6vw] aspect-square -bottom-2 cursor-pointer -right-2 rounded-full"
                    >
                      {data?.profile ? (
                        <AiOutlineClose className="text-sm" />
                      ) : (
                        "+"
                      )}
                    </div>
                    <Image
                      src={
                        data?.profile ? data?.profile : "/Agency/temp_logo.png"
                      }
                      alt="Agency Img"
                      width={1000}
                      height={1000}
                      className="w-[4vw] aspect-square object-cover rounded-full"
                    />
                  </div>
                  <p className="text-center mt-3 text-gray-300">
                    {data?.fileInput?.name}
                  </p>
                  {isDragging && (
                    <p className="absolute text-blue-500 mt-3">
                      Drop file to upload
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="name"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      htmlFor="parent_name"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Parent Organization

                      <Info text="If there is no Parent Organization then use the client name" />
                      <Required />
                    </label>
                    <input
                      id="parent_name"
                      value={data?.parent_name}
                      onChange={(e) => {
                        setData({ ...data, parent_name: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Parent Organization"
                      className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="website"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      className="bg-[#898989]/15 outline-none h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="Timezone"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Timezone
                      <Required />
                    </label>

                    <div className="relative w-full">
                      <select
                        value={data?.timezone}
                        onChange={(e) => {
                          setData({ ...data, timezone: e.target.value });
                        }}
                        id="Timezone"
                        className="bg-[#898989]/15 w-full outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 pr-10 rounded-md appearance-none"
                      >
                        {timezones?.map((e, i) => {
                          return (
                            <option
                              value={e?.region_name}
                              key={i}
                              className="bg-main"
                            >
                              {e?.region_name}
                            </option>
                          );
                        })}
                      </select>
                      {/* Custom dropdown icon */}
                      <span className="absolute right-3 top-1/2 text-2xl -translate-y-1/2 pointer-events-none">
                        <MdKeyboardArrowDown />
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="emailKey"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Report Start Date
                      <Required />
                    </label>
                    <input
                      type="date"
                      value={data?.report_start_date}
                      onChange={(event) =>
                        setData({
                          ...data,
                          report_start_date: event.target.value,
                        })
                      }
                      className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : page == 2 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="grid grid-cols-2 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="namekey"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      className="bg-[#898989]/15 outline-none 
h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Email Address <Required />
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
                      className="bg-[#898989]/15 outline-none 
h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
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
                      className="bg-[#898989]/15 outline-none 
h-[45px] border border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            ) : page == 3 ? (
              <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                <div className="relative flex items-center w-[350px] min-[1600px]:w-[456px]">
                  <FaSearch className="absolute left-4 z-40 text-white" />{" "}
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
                        <div
                          key={i}
                          className="flex items-center justify-between border border-gray-300/30 px-3 py-3 rounded-full"
                        >
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
                                onChange={(e) => {
                                  let id = e.target.id;
                                  if (data?.platforms?.includes(id)) {
                                    setData({
                                      ...data,
                                      platforms: data?.platforms?.filter(
                                        (e) => e !== id
                                      ),
                                    });
                                  } else {
                                    setData({
                                      ...data,
                                      platforms: [...data?.platforms, id],
                                    });
                                  }
                                }}
                                checked={data?.platforms?.includes(e?.name)}
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
            ) : page == 4 ? (
              <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                <Page4
                  credentialsState={credentialsState}
                  setCredentialsState={setCredentialsState}
                  allowedPlatforms={data?.platforms}
                  data={data}
                />
              </div>
            ) : page === 5 ? (
              <div className="px-[4vw] h-[45vh] min-[1600px]:h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
                <div className="grid grid-cols-4 gap-x-4 mt-2">
                  {mainTemplates?.map((e, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          setData({ ...data, templates: [e?.id] });
                        }}
                        className={`border ${
                          e?.id == data?.templates[0] && "border-white"
                        } flex items-center p-3 justify-center border-gray-300/20 rounded-xl cursor-pointer`}
                      >
                        <Image
                          src={e?.template_image}
                          alt={e?.template_image?.src}
                          width={1000}
                          height={1000}
                          className="h-[18vh] object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
                <div className="grid grid-cols-1 gap-x-6 min-[1600px]:gap-x-8 gap-y-4 min-[1600px]:gap-y-6">
                  <div className="flex flex-col">
                    <label
                      htmlFor="emailKey"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Portal Owner Email
                      <Required />
                    </label>
                    <input
                      id="emailKey"
                      value={data?.credentials?.email}
                      onChange={(e) => {
                        setData({
                          ...data,
                          credentials: {
                            ...data?.credentials,
                            email: e.target.value,
                          },
                        });
                      }}
                      type="text"
                      placeholder="Enter Email"
                      className="bg-[#898989]/15 outline-none border h-[45px] border-gray-500/20 text-sm min-[1600px]:text-base px-4 py-2 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="passwordKey"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Password <Required />
                    </label>
                    <div className="w-full relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="passwordKey"
                        value={data?.credentials?.password}
                        onChange={(e) => {
                          setData({
                            ...data,
                            credentials: {
                              ...data?.credentials,
                              password: e.target.value,
                            },
                          });
                        }}
                        placeholder="Enter Password"
                        className="bg-[#898989]/15 w-full outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 text-white/80 right-5 text-lg min-[1600px]:text-xl cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? <LuEye /> : <LuEyeOff />}
                      </div>
                    </div>
                  </div>{" "}
                  {data?.credentials?.password && (
                    <div className="text-sm">
                      <p
                        className={
                          criteria.hasUppercase
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {criteria.hasUppercase ? "✔" : "✘"} At least one
                        uppercase letter
                      </p>
                      <p
                        className={
                          criteria.hasLowercase
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {criteria.hasLowercase ? "✔" : "✘"} At least one
                        lowercase letter
                      </p>
                      <p
                        className={
                          criteria.hasNumber ? "text-green-500" : "text-red-500"
                        }
                      >
                        {criteria.hasNumber ? "✔" : "✘"} At least one number
                      </p>
                      <p
                        className={
                          criteria.hasSpecialChar
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {criteria.hasSpecialChar ? "✔" : "✘"} At least one
                        special character
                      </p>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <label
                      htmlFor="passwordKeyConfirm"
                      className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                    >
                      Confirm Password <Required />
                    </label>
                    <div className="w-full relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="passwordKeyConfirm"
                        value={data?.credentials?.cpassword}
                        onChange={(e) => {
                          setData({
                            ...data,
                            credentials: {
                              ...data?.credentials,
                              cpassword: e.target.value,
                            },
                          });
                        }}
                        placeholder="Enter Confirm Password"
                        className="bg-[#898989]/15 w-full outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 text-white/80 right-5 text-lg min-[1600px]:text-xl cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      >
                        {showConfirmPassword ? <LuEye /> : <LuEyeOff />}
                      </div>
                    </div>
                  </div>
                </div>{" "}
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
                if (page == 4) {
                  setCredentialsState([]);
                }
                setPage(page - 1);
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (page == nav_data?.length) {
                  handleSave();
                } else {
                  if (
                    page == 1 &&
                    data?.profile &&
                    data?.name &&
                    data?.website &&
                    data?.parent_name &&
                    data?.timezone &&
                    data?.report_start_date
                  ) {
                    setPage(page + 1);
                  } else if (page == 3) {
                    isAllDataSourceConfigured();
                  } else if (page == 4) {
                    if (validateDataSources()) {
                      setPage(page + 1);
                    }
                  } else {
                    if (page == 2 && data?.keyContact?.email) {
                      setPage(page + 1);
                    } else if (page == 5 || page == 6) {
                      setPage(page + 1);
                    } else {
                      toast.error("Please fill all the details");
                    }
                  }
                }
              }}
              className={`text-white text-base min-[1600px]:text-lg bg-newBlue w-[150px] min-[1600px]:w-[170px] h-10 min-[1600px]:h-12 rounded-lg`}
            >
              {page == nav_data?.length ? "Submit" : "Next"}
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
  allowedPlatforms,
  data,
}) => {
  const [isEditable, setIsEditable] = useState({
    index: 1000,
    isEditable: false,
  });
  const [isChecked, setIsChecked] = useState(false);
  const { mainDataSource, dataSourceStructure } = useContext(Context);

  const handleEditClick = (index) => {
    setIsEditable({ index: index, isEditable: true });
  };

  useEffect(() => {
    if (credentialsState?.length == 0) {
      const newCredentials = dataSourceStructure
        ?.filter((e) => allowedPlatforms?.includes(e?.platform))
        ?.map((e) => {
          if (e?.platform === "recharge" || e?.platform == "shopify") {
            setIsChecked(true);
          }
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
              <div className="flex-1 flex justify-center min-h-[200px] flex-col px-6">
                {/* Show inputs only for the current platform */}
                {false && (
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
                )}
                {
                  <div className="flex mt-3 flex-row gap-2 justify-between capitalize items-center">
                    <label
                      htmlFor={e?.platform}
                      className="text-[15px] min-[1600px]:text-[1rem] capitalize cursor-pointer"
                    >
                      {formatName("account_ID")}
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

                {e?.creds_structure &&
                  Object.keys(e?.creds_structure)?.includes(
                    "account_filter"
                  ) && (
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
                {(e?.platform === "recharge" || e?.platform == "shopify") &&
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

export default AddAgency;
