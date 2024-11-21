"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Required from "../Utils/Required";
import Context from "@/app/Context/Context";
import axios from "axios";
import { BACKEND_URI } from "@/app/utils/url";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { getCookie } from "cookies-next";

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
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const AddAgency = ({ showSubscribe, setShowSubscribe }) => {
  const { mainDataSource, mainTemplates, getAgencies } = useContext(Context);
  let maxPage = 6;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [fileInput, setFileInput] = useState();
  const [credentialsState, setCredentialsState] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    profile: "",
    name: "",
    parent_name: "",
    website: "",
    location: "",
    keyContact: {
      name: "",
      profile: "",
      designation: "",
      email: "",
      phone: "",
    },
    platforms: [],
    templates: {},
    credentials: { email: "", password: "" },
  });
  const fileInputRef = React.useRef(null);

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileInput(file);
      setData({ ...data, profile: URL.createObjectURL(file) });
    } else {
      console.log("No file selected");
    }
  };

  function closeModal() {
    setShowSubscribe(false);
  }

  let nav_data = [
    "Client Details",
    "Key Contact Details",
    "Data Sources",
    "Data Sources Ids",
    "Dashboard Templates",
    "Credentials",
  ];

  const addClientCredentials = async (client_id, parent_name) => {
    if ((client_id, parent_name)) {
      try {
        const platforms = credentialsState.reduce((acc, e) => {
          acc[e?.platform] = {
            ...e.creds_structure,
            report_start_date: "2024-01-11",
            account_filter: "blank",
          };
          return acc;
        }, {});

        const response = await axios.post(
          `${BACKEND_URI}/client/add_client_credentials?client_id=${client_id}&parent_name=${parent_name}`,
          { platforms },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${getCookie("token")}`,
            },
          }
        );

        if (response.data) {
          toast.success(response.data.msg);
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
      // Construct query parameters
      const queryParams = new URLSearchParams({
        client_name: data?.name,
        parent_name: data?.parent_name,
        website: data?.website,
        location: data?.location,
        key_contact_name: data?.keyContact?.name,
        key_contact_designation: data?.keyContact?.designation,
        key_contact_email_address: data?.keyContact?.email,
        email_address: data?.credentials?.email || "",
        password: data?.credentials?.password || "",
        key_contact_phone: data?.keyContact?.phone,
        template_link: data?.templates?.template_link,
        template_name: data?.templates?.template_name,
        templat_image: data?.templates?.template_image,
      }).toString();

      const formData = new FormData();
      formData.append("platform_name", data?.platforms);

      // Only append file if it exists
      if (fileInput) {
        formData.append("profile_picture", fileInput);
        formData.append("profile_picture_filename", fileInput?.name);
        formData.append("profile_picture_content_type", fileInput?.type);
      }

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
        }
      } catch (error) {
        console.error("Error creating user:", error);
        toast.error("An error occurred while creating the user");
      }
    } else {
      toast.error("Please fill all the required details");
    }
  };

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
            <div className="grid grid-cols-6 text-sm min-[1600px]:text-base justify-between mt-2 px-[3vw] ml-5">
              {nav_data.map((e, i) => {
                return (
                  <p
                    className={`text-center ${
                      i + 1 == page ? "" : "opacity-0"
                    }`}
                    key={i}
                  >
                    {e}
                  </p>
                );
              })}
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
                      htmlFor="parent_name"
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Parent Name
                      <Required />
                    </label>
                    <input
                      id="parent_name"
                      value={data?.parent_name}
                      onChange={(e) => {
                        setData({ ...data, parent_name: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Parent Name"
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
                </div>
              </div>
            ) : page == 2 ? (
              <div className="px-[4vw] min-[1600px]:px-[8vw] w-full">
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
                          setData({ ...data, templates: e });
                        }}
                        className={`border ${
                          e?.template_name == data?.templates?.template_name &&
                          "border-white"
                        } flex items-center justify-center border-gray-300/20 rounded-xl cursor-pointer h-[18vh]`}
                      >
                        {e?.template_image ? (
                          <Image
                            src={e?.template_image}
                            alt={e?.template_image?.src}
                            width={1000}
                            height={1000}
                          />
                        ) : (
                          <p>{e?.template_name}</p>
                        )}
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
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Email
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
                      className="mb-1.5 text-sm min-[1600px]:text-base"
                    >
                      Password
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
                setPage(page - 1);
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (page == maxPage) {
                  handleSave();
                } else {
                  if (
                    page == 1 &&
                    data?.name &&
                    data?.website &&
                    data?.warrenty &&
                    data?.license
                  ) {
                    setPage(page + 1);
                  } else {
                    if (page == 2 && data?.keyContact?.email) {
                      setPage(page + 1);
                    } else if (page == 3 || page == 4) {
                      setPage(page + 1);
                    } else {
                      toast.error("Please fill all the details");
                    }
                  }
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

const Page4 = ({ credentialsState, setCredentialsState, allowedPlatforms }) => {
  const { mainDataSource, dataSourceStructure } = useContext(Context);

  useEffect(() => {
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
    <div className="grid grid-cols-1 gap-3 mb-6">
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
                  {e?.platform}
                </label>
              </div>
              <div className="mt-3">
                {/* Show inputs only for the current platform */}
                <input
                  type="text"
                  placeholder={e?.creds_structure?.account_id
                    ?.replace("_", " ")
                    .toUpperCase()}
                  // value={e?.creds_structure?.account_id || ""}
                  onChange={(event) =>
                    handleInputChange(
                      e.platform,
                      "account_id",
                      event.target.value
                    )
                  }
                  className="bg-transparent border border-gray-200/20 px-4 py-1.5 outline-none rounded-lg mr-4"
                />

                {/* Dynamically render all credential fields for current platform */}
                {Object.keys(e?.creds_structure?.credentials || {}).map(
                  (key) => (
                    <input
                      key={key}
                      type="text"
                      placeholder={key.replace("_", " ").toUpperCase()}
                      // value={e?.creds_structure?.credentials[key] || ""}
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

export default AddAgency;
