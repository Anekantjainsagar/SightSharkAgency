"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import AgencyDetails from "@/app/Components/agencies/AgencyDetails";
import AgencyDetailsTopbar from "@/app/Components/agencies/AgencyDetailsTopbar";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import DeleteAgency from "@/app/Components/agencies/DeleteAgency";
import Context from "@/app/Context/Context";
import { useRouter } from "next/navigation";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import Required from "@/app/Components/Utils/Required";
let databar = ["Agency Details", "Key Contact Information"];

const Overview = ({ params }) => {
  const [status, setStatus] = useState("Active");
  const [selected, setSelected] = useState("Agency Details");
  const [deleteAgency, setDeleteAgency] = useState(false);
  const [original_data, setOriginal_data] = useState();
  const [file, setFile] = useState("");
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
  });
  const fileInputRef = React.useRef(null);
  const { agencies, getAgencies } = useContext(Context);
  const { name } = params;
  const history = useRouter();

  useEffect(() => {
    updateDataTemp();
  }, [name, agencies]);

  const updateDataTemp = () => {
    let temp = agencies?.data?.find(
      (e) => e?.client_name?.replaceAll(" ", "-") == name
    );
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
    });
    setStatus(temp?.status);
    setFile(temp?.profile_picture);
  };

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
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
                          </div>{" "}
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
                            className="rounded-full border border-gray-300/30"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-11/12 pl-[2vw]">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="mb-1.5 min-[1600px]:text-base text-sm"
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="website"
                            className="mb-1.5 min-[1600px]:text-base text-sm"
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="location"
                            className="mb-1.5 min-[1600px]:text-base text-sm"
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="mb-1.5 min-[1600px]:text-base text-sm"
                          >
                            Status
                          </label>
                          <select
                            name="status"
                            id="status"
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {["active", "offline", "hold"].map((e, i) => {
                              return (
                                <option value={e} key={i} className="bg-main">
                                  {e[0]?.toUpperCase() + e.slice(1)}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between mt-4 px-3">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-full">
                        <div className="flex flex-col">
                          <label
                            htmlFor="namekey"
                            className="mb-1.5 min-[1600px]:text-base text-sm"
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="designation"
                            className="mb-1.5 min-[1600px]:text-base text-sm"
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="email"
                            className="mb-1.5 min-[1600px]:text-base text-sm"
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="phone"
                            className="mb-1.5 min-[1600px]:text-base text-sm"
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md min-[1600px]:text-base text-sm"
                          />
                        </div>
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
                      onClick={updateDataTemp}
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
                          }).toString();

                          try {
                            fetch(
                              `${BACKEND_URI}/client/update/${original_data?.client_id}?${queryParams}`,
                              {
                                headers: {
                                  Accept:
                                    "application/json, application/xml, text/plain, text/html, *.*",
                                  Authorization: `Bearer ${getCookie("token")}`,
                                },
                                method: "PUT",
                              }
                            )
                              .then((res) => {
                                return res.json();
                              })
                              .then((res) => {
                                if (res.msg) {
                                  getAgencies();
                                  toast.success("Client updated successfully");
                                  history.push("/clients");
                                }
                                if (res.detail) {
                                  toast.error(res.detail);
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

export default Overview;
