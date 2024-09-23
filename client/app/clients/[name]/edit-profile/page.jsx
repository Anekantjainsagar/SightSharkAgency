"use client";
import React, { useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import AgencyDetails from "../../../Components/agencies/AgencyDetails";
import AgencyDetailsTopbar from "../../../Components/agencies/AgencyDetailsTopbar";
import { BiPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import DeleteAgency from "../../../Components/agencies/DeleteAgency";

const Overview = () => {
  const [status, setStatus] = useState("Active");
  const [comment, setComment] = useState("");

  const [deleteAgency, setDeleteAgency] = useState(false);
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

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <DeleteAgency
        showSubscribe={deleteAgency}
        setShowSubscribe={setDeleteAgency}
      />

      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg flex items-start justify-between">
            <AgencyDetails />
            <div className="w-[69%] h-[82vh]">
              <AgencyDetailsTopbar />
              <div className="border border-gray-500/5 h-[83vh] w-full rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <div>
                    <h4 className="mainText20">Agency Details</h4>{" "}
                    <div className="gradient-line my-4"></div>
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
                            src={
                              data?.profile
                                ? data?.profile
                                : "/Agency/individual/logo.png"
                            }
                            alt="Agency Img"
                            width={1000}
                            height={1000}
                            className="rounded-full border border-gray-300/30"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-11/12 pl-[2vw]">
                        <div className="flex flex-col">
                          <label htmlFor="name" className="mb-1.5">
                            Agency Name
                          </label>
                          <input
                            id="name"
                            value={data?.name}
                            onChange={(e) => {
                              setData({ ...data, name: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter Agency Name"
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="website" className="mb-1.5">
                            Website
                          </label>
                          <input
                            id="website"
                            value={data?.website}
                            onChange={(e) => {
                              setData({ ...data, website: e.target.value });
                            }}
                            type="text"
                            placeholder="Enter Website"
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="location" className="mb-1.5">
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="warrenty" className="mb-1.5">
                            Warranty Period
                          </label>
                          <select
                            name="status"
                            id="status"
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                            value={data?.warrenty}
                            onChange={(e) => {
                              setData({ ...data, warrenty: e.target.value });
                            }}
                          >
                            {["6 Months", "1 Year"].map((e, i) => {
                              return (
                                <option value={e} key={i} className="bg-main">
                                  {e}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="deployment" className="mb-1.5">
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="license" className="mb-1.5">
                            License Limit
                          </label>
                          <select
                            name="status"
                            id="status"
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                            value={data?.license}
                            onChange={(e) => {
                              setData({ ...data, license: e.target.value });
                            }}
                          >
                            {["50 Clients", "100 Clients"].map((e, i) => {
                              return (
                                <option value={e} key={i} className="bg-main">
                                  {e}
                                </option>
                              );
                            })}
                          </select>
                        </div>{" "}
                        <div className="flex flex-col">
                          <label htmlFor="status" className="mb-1.5">
                            Status
                          </label>
                          <select
                            name="status"
                            id="status"
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {["Active", "Offline", "On Hold"].map((e, i) => {
                              return (
                                <option value={e} key={i} className="bg-main">
                                  {e}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="comment" className="mb-1.5">
                            Comment
                          </label>
                          <input
                            id="comment"
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            type="text"
                            placeholder="Enter Comment"
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h4 className="mainText20">Key Contact Information</h4>{" "}
                    <div className="gradient-line my-4"></div>
                    <div className="flex items-start justify-between mt-4 px-3">
                      <div className="flex items-center w-1/12">
                        <div className="relative flex items-center justify-center">
                          <div
                            onClick={() => {
                              fileInputRefAgent.current.click();
                            }}
                            className="absolute bg-newBlue text-xl py-1.5 px-1.5 -bottom-1 cursor-pointer -right-1 rounded-full"
                          >
                            <BiPencil />
                          </div>{" "}
                          <input
                            type="file"
                            ref={fileInputRefAgent}
                            style={{ display: "none" }}
                            onChange={handleFileChangeAgent}
                          />
                          <Image
                            src={
                              data?.keyContact?.profile
                                ? data?.keyContact?.profile
                                : "/Agency/individual/agent.png"
                            }
                            alt="Agency Img"
                            width={1000}
                            height={1000}
                            className="rounded-full border border-gray-300/30"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 w-11/12 pl-[2vw]">
                        <div className="flex flex-col">
                          <label htmlFor="namekey" className="mb-1.5">
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="designation" className="mb-1.5">
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="email" className="mb-1.5">
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="phone" className="mb-1.5">
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
                            className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between 2xl:mt-0 mt-6">
                  <button
                    className={`bg-red-600 font-semibold px-8 py-2 rounded-xl flex items-center ml-4`}
                    onClick={() => {
                      setDeleteAgency(!deleteAgency);
                    }}
                  >
                    <MdDelete className="mr-1 text-xl" />
                    Delete Agency
                  </button>
                  <div>
                    {" "}
                    <button
                      className={`bg-[#898989]/15 font-semibold px-8 py-2 rounded-xl ml-4`}
                      onClick={() => {}}
                    >
                      Discard
                    </button>
                    <button
                      className={`bg-newBlue font-semibold px-8 py-2 rounded-xl ml-4`}
                      onClick={() => {}}
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
