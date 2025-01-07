"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import AgencyDetails from "@/app/Components/agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/agencies/AgencyDetailsTopbar";
import { BiPencil } from "react-icons/bi";
import { MdDelete, MdKeyboardArrowDown } from "react-icons/md";
import DeleteAgency from "@/app/Components/agencies/DeleteAgency";
import Context from "@/app/Context/Context";
import { useRouter } from "next/navigation";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import Required from "@/app/Components/Utils/Required";
import axios from "axios";
import { BsCheckLg, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
let databar = ["Client Details", "Key Contact Information", "Data Sources"];

function formatName(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Overview = ({ params }) => {
  const { setSelectedClientDetails } = useContext(Context);
  const [status, setStatus] = useState("Active");
  const [selected, setSelected] = useState("Client Details");
  const [deleteAgency, setDeleteAgency] = useState(false);
  const [file, setFile] = useState("");
  const [fileInput, setFileInput] = useState();
  const [data, setData] = useState({
    name: "",
    profile: "",
    website: "",
    location: "",
    keyContact: {
      name: "",
      profile: "",
      designation: "",
      email: "",
      phone: "",
    },
    dataSources: [],
    agency_id: "",
    credentials: { email: "", password: "" },
    timezone: "",
    report_start_date: "",
    parent_name: "",
  });
  const fileInputRef = React.useRef(null);
  const {
    agencies,
    getAgencies,
    selectedClientDetails,
    getCredentialsForClient,
    timezones,
  } = useContext(Context);
  const { name } = params;
  const [original_data, setOriginal_data] = useState(selectedClientDetails);
  const history = useRouter();

  useEffect(() => {
    updateDataTemp();
    getCredentialsForClient(original_data?.client_id);
  }, [name, agencies]);

  const updateDataTemp = () => {
    let temp = agencies?.data?.find(
      (e) => e?.client_name.replaceAll(" ", "-") == decodeURIComponent(name)
    );
    setSelectedClientDetails(temp);
    setOriginal_data(temp);
    setData({
      name: temp?.client_name,
      website: temp?.website,
      location: temp?.location,
      agency_id: temp?.agency_id,
      keyContact: {
        name: temp?.key_contact_name,
        designation: temp?.key_contact_designation,
        phone: temp?.key_contact_phone,
        email: temp?.key_contact_email_address,
      },
      credentials: {
        email: temp?.email_address,
      },
      timezone: temp?.time_zone,
      report_start_date: temp?.report_start_date,
      parent_name: temp?.parent_name,
      ...temp,
    });
    setStatus(temp?.status);
    setFile(temp?.profile_picture);
  };

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileInput(file);
      setFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <DeleteAgency
        showSubscribe={deleteAgency}
        setShowSubscribe={setDeleteAgency}
        name={data?.name}
        id={original_data?.client_id}
      />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg flex flex-row-reverse items-start justify-between px-6">
            <AgencyDetails data={original_data} />
            <div className="w-[69%] min-[1600px]:h-[82vh] h-fit">
              <AgencyDetailsTopbar name={name} />
              <div className="border border-gray-500/5 min-[1600px]:h-[83vh] h-fit w-full rounded-lg p-3 min-[1600px]:p-4 flex flex-col justify-between">
                <div className="h-[90%]">
                  <div className="flex items-center">
                    {databar.map((e, i) => {
                      return (
                        <h4
                          key={i}
                          className={`min-[1600px]:text-lg cursor-pointer mr-5 ${
                            selected === e ? "text-blue-600" : "text-gray-300"
                          }`}
                          onClick={() => {
                            setSelected(e);
                          }}
                        >
                          {e}
                        </h4>
                      );
                    })}
                  </div>
                  <div className="gradient-line min-[1600px]:my-4 my-2"></div>
                  {selected == databar[0] ? (
                    <div className="flex items-start justify-between mt-4 px-3">
                      <div className="flex items-center w-1/12">
                        <div className="relative flex items-center justify-center">
                          <div
                            onClick={() => {
                              fileInputRef.current.click();
                            }}
                            className="absolute bg-newBlue text-xl py-1.5 px-1.5 -bottom-1 cursor-pointer -right-1 rounded-full"
                          >
                            <BiPencil />
                          </div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChangeProfile}
                          />
                          <Image
                            src={file ? file : "/Agency/individual/logo.png"}
                            alt="Agency Img"
                            width={1000}
                            height={1000}
                            className="rounded-full aspect-square object-cover border border-gray-300/30"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-11/12 pl-[2vw]">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="mb-1.5 min-[1600px]:text-base text-sm w-fit relative"
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
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>{" "}
                        <div className="flex flex-col">
                          <label
                            htmlFor="parent_name"
                            className="mb-1.5 min-[1600px]:text-base text-sm w-fit relative"
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
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="website"
                            className="mb-1.5 min-[1600px]:text-base text-sm w-fit relative"
                          >
                            Website <Required />
                          </label>
                          <input
                            id="website"
                            value={data?.website}
                            onChange={(e) => {
                              setData({ ...data, website: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter Website"
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
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
                        </div>{" "}
                        <div className="flex flex-col">
                          <label
                            htmlFor="deployment"
                            className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                          >
                            Report Start Date <Required />
                          </label>
                          <input
                            id="deployment"
                            value={data?.report_start_date}
                            onChange={(e) => {
                              setData({
                                ...data,
                                report_start_date: e.target.value,
                              });
                            }}
                            type="date"
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="mb-1.5 min-[1600px]:text-base text-sm w-fit relative"
                          >
                            Status
                          </label>

                          <div className="relative w-full">
                            <select
                              name="status"
                              id="status"
                              className="glass h-[45px] w-full outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm appearance-none pr-10"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              {["active", "offline", "hold"].map((e, i) => (
                                <option value={e} key={i} className="bg-main">
                                  {e[0]?.toUpperCase() + e.slice(1)}
                                </option>
                              ))}
                            </select>

                            {/* Custom dropdown icon */}
                            <span className="absolute z-50 right-3 top-1/2 text-2xl -translate-y-1/2 pointer-events-none">
                              <MdKeyboardArrowDown />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selected == databar[1] ? (
                    <div className="flex items-start justify-between mt-4 px-3">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full">
                        <div className="flex flex-col">
                          <label
                            htmlFor="namekey"
                            className="mb-1.5 min-[1600px]:text-base text-sm w-fit relative"
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
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="designation"
                            className="mb-1.5 min-[1600px]:text-base text-sm w-fit relative"
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
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="email"
                            className="mb-1.5 min-[1600px]:text-base text-sm w-fit relative"
                          >
                            Email Address
                            <Required />
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
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="phone"
                            className="mb-1.5 min-[1600px]:text-base text-sm w-fit relative"
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
                            className="glass h-[45px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between mt-4 px-3">
                      <div className="grid grid-cols-4 gap-x-4 gap-y-6 w-full">
                        {selectedClientDetails?.platforms_images?.map(
                          (e, i) => {
                            return (
                              <DataSourceBox
                                key={i}
                                e={e}
                                original_data={original_data}
                              />
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex h-[10%] items-center justify-between min-[1600px]:mt-0 mt-6">
                  <button
                    className={`bg-red-600 min-[1600px]:font-semibold min-[1600px]:px-8 px-5 py-2 min-[1600px]:text-base text-sm rounded-xl min-[1600px]:rounded-xl flex items-center ml-4`}
                    onClick={() => {
                      setDeleteAgency(!deleteAgency);
                    }}
                  >
                    <MdDelete className="mr-1 text-xl" />
                    Delete Client
                  </button>
                  <div>
                    <button
                      className={`bg-[#898989]/15 min-[1600px]:font-semibold min-[1600px]:px-8 px-5 py-2 min-[1600px]:text-base text-sm rounded-xl min-[1600px]:rounded-xl ml-4`}
                      onClick={() => {
                        updateDataTemp();
                        toast.success("Changes Discarded");
                      }}
                    >
                      Discard
                    </button>
                    <button
                      className={`bg-newBlue min-[1600px]:font-semibold min-[1600px]:px-8 px-5 py-2 min-[1600px]:text-base text-sm rounded-xl min-[1600px]:rounded-xl ml-4`}
                      onClick={() => {
                        if (
                          data?.name &&
                          data?.website &&
                          data?.keyContact?.email
                        ) {
                          const filteredData = Object.fromEntries(
                            Object.entries(selectedClientDetails).filter(
                              ([key, value]) => value != null
                            )
                          );

                          const queryParams = new URLSearchParams({
                            client_name: data?.name,
                            website: data?.website,
                            location: data?.location,
                            key_contact_name: data?.keyContact?.name,
                            key_contact_designation:
                              data?.keyContact?.designation,
                            key_contact_email_address: data?.keyContact?.email,
                            key_contact_phone: data?.keyContact?.phone,
                            service_account_cloud: data?.serviceAcc?.acc1,
                            service_account_api: data?.serviceAcc?.acc2,
                            email_address: data?.credentials?.email,
                            status,
                            time_zone: data?.timezone,
                            parent_name: data?.parent_name,
                            ...filteredData,
                          }).toString();

                          const formData = new FormData();
                          formData.append(
                            "profile_picture",
                            fileInput ? fileInput : ""
                          );
                          formData.append(
                            "profile_picture_filename",
                            fileInput?.name ? fileInput?.name : ""
                          );
                          formData.append(
                            "profile_picture_content_type",
                            fileInput?.type ? fileInput?.type : ""
                          );

                          try {
                            axios
                              .put(
                                `${BACKEND_URI}/client/update/${original_data?.client_id}?${queryParams}`,
                                formData, // Send formData directly
                                {
                                  headers: {
                                    Accept:
                                      "application/json, application/xml, text/plain, text/html, *.*",
                                    Authorization: `Bearer ${getCookie(
                                      "token"
                                    )}`,
                                  },
                                }
                              )
                              .then((res) => {
                                if (res.data.msg) {
                                  getAgencies();
                                  toast.success("Client updated successfully");
                                  history.push(
                                    `/clients/${data?.name?.replaceAll(
                                      " ",
                                      "-"
                                    )}/edit-profile`
                                  );
                                }
                                if (res.data.detail) {
                                  toast.error(res.data.detail);
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          } catch (error) {
                            console.log(error);
                          }
                        } else {
                          toast.error("Please fill all the details");
                        }
                      }}
                    >
                      Save
                    </button>
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

const DataSourceBox = ({ e, original_data }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [account_id, setAccount_id] = useState("");
  const { dataSourceStructure, getAgencies, getCredentialsForClient } =
    useContext(Context);

  useEffect(() => {
    if (dataSourceStructure) {
      setAccount_id(
        dataSourceStructure?.find((item) => item?.platform === e?.platform)
          ?.creds_structure?.account_id
      );
    }
  }, [e]);

  return (
    <div className="flex flex-col items-center justify-between h-fit relative border rounded-2xl border-gray-300/30 bg-[#171C2A]/50 p-2">
      <div className="flex items-center flex-col gap-2 h-[8vw] w-[6vw] justify-center">
        <Image
          src={e?.logo}
          alt={e?.platform}
          width={1000}
          height={1000}
          className="min-[1600px]:w-10 min-[1600px]:h-14 w-10 h-14 aspect-square object-contain"
        />
        <label
          htmlFor={e?.platform}
          className="text-[14px] min-[1600px]:text-[1.15rem] capitalize text-center cursor-pointer"
        >
          {formatName(e?.platform)}
        </label>
      </div>
      <div>
        {!showMenu ? (
          <BsThreeDotsVertical
            className="text-gray-300 w-1/12 cursor-pointer text-lg absolute right-2 top-3"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        ) : (
          <AiOutlineClose
            className="text-gray-300 w-1/12 cursor-pointer absolute text-lg right-2 top-3"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        )}
        {showMenu && (
          <div className="absolute -right-[6.5vw] top-10 backdrop-blur-2xl text-sm border border-gray-200/20 rounded-md">
            <p
              onClick={() => {
                setIsEditable(!isEditable);
                setShowMenu(false);
              }}
              className="px-2 py-1.5 hover:bg-gray-200/10 cursor-pointer rounded-md"
            >
              Edit Account ID
            </p>
            <p
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${BACKEND_URI}/client/delete-platform-credentials?client_id=${original_data?.client_id}&platform_name=${e?.platform}`,
                    {},
                    {
                      headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${getCookie("token")}`,
                      },
                    }
                  );

                  if (response.data) {
                    getAgencies();
                    // getCredentialsForClient(original_data?.client_id);
                    setShowMenu(false);
                    setIsEditable(false);
                    toast.success("Data Source Deleted Successfully");
                  }
                } catch (err) {
                  toast.error(err.message);
                }
              }}
              className="px-2 py-1.5 hover:bg-gray-200/10 cursor-pointer rounded-md"
            >
              Delete Data Source
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center w-full px-2 justify-between gap-x-2 relative">
        {isEditable ? (
          <div className="flex items-center w-full justify-between gap-x-2">
            <input
              type="text"
              value={account_id}
              placeholder="Account ID"
              onChange={(eve) => setAccount_id(eve.target.value)}
              className="bg-transparent w-11/12 outline-none border border-gray-400/30 text-gray-400 rounded-2xl px-3"
            />
            <BsCheckLg
              className="text-green-800 cursor-pointer rounded-full text-3xl"
              onClick={async () => {
                try {
                  let platforms = dataSourceStructure
                    .filter((item) =>
                      original_data?.platform_name.includes(item?.platform)
                    )
                    .reduce((acc, item) => {
                      acc[item?.platform] = {
                        ...item.creds_structure,
                        ...(item?.platform === e?.platform && { account_id }),
                        report_start_date: "2024-01-11",
                        account_filter: "blank",
                      };
                      return acc;
                    }, {});

                  if (Object.keys(platforms)) {
                    const response = await axios.post(
                      `${BACKEND_URI}/client/update-client-credentials?client_id=${original_data?.client_id}&parent_name=${original_data?.parent_name}`,
                      { platforms },
                      {
                        headers: {
                          Accept: "application/json",
                          Authorization: `Bearer ${getCookie("token")}`,
                        },
                      }
                    );

                    if (response.data) {
                      // getAgencies();
                      getCredentialsForClient(original_data?.client_id);
                      toast.success("Updated Data Sources Successfully");
                      setIsEditable(false);
                    }
                  }
                } catch (err) {
                  console.error(err.response?.data || err.message);
                  toast.error(err.message);
                }
              }}
            />
          </div>
        ) : (
          <p className="w-11/12">Account ID: {account_id}</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
