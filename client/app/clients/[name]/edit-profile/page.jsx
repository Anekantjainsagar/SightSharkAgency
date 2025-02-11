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
import EditDataSources from "./EditDataSources";
import EditReportingTemplate from "./EditReportingTemplate";

let databar = [
  "Client Details",
  "Key Contact Information",
  "Data Sources",
  "Reporting Templates",
];

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
    getAssignedTemplates,
  } = useContext(Context);
  const { name } = params;
  const [original_data, setOriginal_data] = useState(selectedClientDetails);
  const history = useRouter();

  useEffect(() => {
    updateDataTemp();
    getCredentialsForClient(original_data?.client_id);
    getAssignedTemplates(original_data?.client_id);
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

  const checkIsChanged = () => {
    if (fileInput?.name?.length > 0) {
      return true;
    } else {
      // First Page Check
      if (
        original_data?.client_name == data?.client_name &&
        original_data?.website === data?.website &&
        original_data?.parent_name === data?.parent_name &&
        original_data?.time_zone == data?.timezone &&
        original_data?.report_start_date === data?.report_start_date &&
        status === original_data?.status
      ) {
        // Second Page Check
        if (
          original_data?.key_contact_name === data?.keyContact?.name &&
          original_data?.key_contact_email_address ===
            data?.keyContact?.email &&
          original_data?.key_contact_phone === data?.keyContact?.phone &&
          original_data?.key_contact_designation ===
            data?.keyContact?.designation
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
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
      <div className="w-full md:w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg flex flex-col md:flex-row-reverse items-start justify-between md:px-6">
            <AgencyDetails data={original_data} />
            <div className="md:w-[69%] min-[1600px]:h-[82vh] h-fit md:mt-0 mt-6">
              <AgencyDetailsTopbar name={name} />
              <div className="border border-gray-500/5 min-[1600px]:h-[82vh] md:h-[80vh] h-[45vh] w-full rounded-lg p-3 min-[1600px]:p-4 flex flex-col justify-between md:mb-0 mb-4">
                <div className="h-[80%]">
                  <div className="flex items-center">
                    {databar.map((e, i) => {
                      return (
                        <h4
                          key={i}
                          className={`min-[1600px]:text-lg text-[13px] md:text-[15px] cursor-pointer mr-2.5 md:mr-5 ${
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
                      <div className="flex items-center w-[22%] md:w-1/12">
                        <div className="relative flex items-center justify-center">
                          <div
                            onClick={() => {
                              fileInputRef.current.click();
                            }}
                            className="absolute bg-newBlue min-[1600px]:text-xl text-base bottom-0 right-0 py-1.5 px-1.5 min-[1600px]:-bottom-1 cursor-pointer min-[1600px]:-right-1 rounded-full"
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
                      <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 min-[1600px]:gap-y-6 md:gap-y-4 gap-y-3 w-[78%] md:w-11/12 ml-3 md:pl-[2vw]">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="mb-1.5 min-[1600px]:text-base text-[13px] w-fit relative"
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
                            className="glass min-[1600px]:h-[45px] h-[35px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-[13px]"
                          />
                        </div>{" "}
                        <div className="flex flex-col">
                          <label
                            htmlFor="parent_name"
                            className="mb-1.5 min-[1600px]:text-base text-[13px] w-fit relative"
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
                            className="glass min-[1600px]:h-[45px] h-[35px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-[13px]"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="website"
                            className="mb-1.5 min-[1600px]:text-base text-[13px] w-fit relative"
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
                            className="glass min-[1600px]:h-[45px] h-[35px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-[13px]"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="Timezone"
                            className="mb-1.5 text-[13px] min-[1600px]:text-base w-fit relative"
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
                              className="bg-[#898989]/15 w-full outline-none min-[1600px]:h-[45px] h-[35px] glass text-[13px] min-[1600px]:text-base px-4 py-2 pr-10 rounded-md appearance-none"
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
                            <span className="absolute right-3 top-1/2 min-[1600px]:text-2xl text-xl z-50 -translate-y-1/2 pointer-events-none">
                              <MdKeyboardArrowDown />
                            </span>
                          </div>
                        </div>{" "}
                        <div className="flex flex-col">
                          <label
                            htmlFor="deployment"
                            className="mb-1.5 text-[13px] min-[1600px]:text-base w-fit relative"
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
                            className="glass min-[1600px]:h-[45px] h-[35px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-[13px]"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="mb-1.5 min-[1600px]:text-base text-[13px] w-fit relative"
                          >
                            Status
                          </label>

                          <div className="relative w-full">
                            <select
                              name="status"
                              id="status"
                              className="glass min-[1600px]:h-[45px] h-[35px] w-full outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-[13px] appearance-none pr-10"
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
                            <span className="absolute z-50 right-3 top-1/2 min-[1600px]:text-2xl text-xl -translate-y-1/2 pointer-events-none">
                              <MdKeyboardArrowDown />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : selected == databar[1] ? (
                    <div className="flex items-start justify-between mt-4 px-3">
                      <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-6 w-full">
                        <div className="flex flex-col">
                          <label
                            htmlFor="namekey"
                            className="mb-1.5 min-[1600px]:text-base text-[13px] w-fit relative"
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
                            className="glass min-[1600px]:h-[45px] h-[35px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-[13px]"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="designation"
                            className="mb-1.5 min-[1600px]:text-base text-[13px] w-fit relative"
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
                            className="glass min-[1600px]:h-[45px] h-[35px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-[13px]"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="email"
                            className="mb-1.5 min-[1600px]:text-base text-[13px] w-fit relative"
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
                            className="glass min-[1600px]:h-[45px] h-[35px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-[13px]"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="phone"
                            className="mb-1.5 min-[1600px]:text-base text-[13px] w-fit relative"
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
                            className="glass min-[1600px]:h-[45px] h-[35px] outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-[13px]"
                          />
                        </div>
                      </div>
                    </div>
                  ) : selected === databar[2] ? (
                    <EditDataSources original_data={original_data} />
                  ) : (
                    <EditReportingTemplate original_data={original_data} />
                  )}
                </div>
                <div className="flex h-[10%] items-center justify-between min-[1600px]:mt-0 mt-6">
                  <button
                    className={`bg-red-600 min-[1600px]:font-semibold min-[1600px]:px-8 md:px-5 px-3 py-2 min-[1600px]:text-base text-[13px] rounded-md md:rounded-xl flex items-center`}
                    onClick={() => {
                      setDeleteAgency(!deleteAgency);
                    }}
                  >
                    <MdDelete className="mr-1 min-[1600px]:text-xl text-lg" />
                    Delete Client
                  </button>
                  <div>
                    <button
                      className={`bg-[#898989]/15 min-[1600px]:font-semibold min-[1600px]:px-8 md:px-5 px-3 py-2 min-[1600px]:text-base text-[13px] rounded-md md:rounded-xl ml-4`}
                      onClick={() => {
                        updateDataTemp();
                        toast.success("Changes Discarded");
                      }}
                    >
                      Discard
                    </button>
                    <button
                      className={`bg-newBlue min-[1600px]:font-semibold min-[1600px]:px-8 px-3 md:px-5 py-2 min-[1600px]:text-base text-[13px] rounded-md md:rounded-xl ml-3 md:ml-4`}
                      onClick={() => {
                        if (
                          data?.name &&
                          data?.website &&
                          data?.keyContact?.email
                        ) {
                          if (checkIsChanged()) {
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
                              key_contact_email_address:
                                data?.keyContact?.email,
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
                                    toast.success(
                                      "Client updated successfully"
                                    );
                                    setFileInput("");
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
                            toast.error(
                              "Change some data to update the client"
                            );
                          }
                        } else {
                          toast.error("Please fill all the required details");
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

export default Overview;
