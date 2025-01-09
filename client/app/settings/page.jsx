"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import SettingsLeftbar from "@/app/Components/Settings/Leftbar";
import { BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";
import Context from "../Context/Context";
import toast from "react-hot-toast";

const Settings = () => {
  const { userData, checkToken } = useContext(Context);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    postal_code: "",
  });

  useEffect(() => {
    setData({
      firstName: userData?.first_name,
      lastName: userData?.last_name,
      ...userData,
    });
  }, [userData]);

  const updateUsers = () => {
    if (data?.firstName && data?.lastName && data?.email) {
      const queryParams = new URLSearchParams({
        ...userData,
        email: data?.email,
        password: data?.password,
        first_name: data?.firstName,
        last_name: data?.lastName,
        phone: data?.phone || "",
        country: data?.country,
        postal_code: data?.postal_code,
      }).toString();

      try {
        fetch(`${BACKEND_URI}/user/update/${userData?.id}?${queryParams}`, {
          headers: {
            Accept:
              "application/json, application/xml, text/plain, text/html, *.*",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          method: "PUT",
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.msg) {
              toast.success("Profile updated successfully");
              checkToken();
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
  };

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="md:w-[85%] w-full bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute left-0 bottom-0 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute left-[40%] top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-0 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5">
          <Navbar />
          <div className="md:h-[85vh] h-[90vh] w-full flex md:flex-row flex-col gap-x-5 justify-between items-start text-white md:px-6">
            <SettingsLeftbar />
            <div className="md:w-8/12 h-[66%] md:h-fit justify-between flex flex-col items-start border border-gray-500/5 rounded-lg px-3 md:px-6 py-2 md:py-4 text-white">
              <div className="w-full">
                <h4 className="mainText20">Account</h4>{" "}
                <div className="gradient-line my-2 md:my-4"></div>
                <h6 className="text-base min-[1600px]:text-[20px] font-medium mt-2 md:mt-5">
                  Profile
                </h6>{" "}
                <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 mt-4 w-full">
                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 text-[13px] min-[1600px]:text-base w-fit relative"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      value={data?.firstName}
                      onChange={(e) => {
                        setData({ ...data, firstName: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter First Name"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-[13px] min-[1600px]:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 text-[13px] min-[1600px]:text-base w-fit relative"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      value={data?.lastName}
                      onChange={(e) => {
                        setData({ ...data, lastName: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter Last Name"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-[13px] min-[1600px]:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="mb-1.5 text-[13px] min-[1600px]:text-base w-fit relative"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      value={data?.email}
                      onChange={(e) => {
                        setData({ ...data, email: e.target.value });
                      }}
                      type="email"
                      placeholder="Enter Email"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-[13px] min-[1600px]:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="mb-1.5 text-[13px] min-[1600px]:text-base w-fit relative"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      value={data?.phone}
                      onChange={(e) => {
                        setData({ ...data, phone: e.target.value });
                      }}
                      type="number"
                      placeholder="Enter Phone"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-[13px] min-[1600px]:text-base"
                    />
                  </div>{" "}
                  <div className="flex flex-col">
                    <label
                      htmlFor="country"
                      className="mb-1.5 text-[13px] min-[1600px]:text-base w-fit relative"
                    >
                      Country
                    </label>
                    <input
                      id="country"
                      value={data?.country}
                      onChange={(e) => {
                        setData({ ...data, country: e.target.value });
                      }}
                      type="country"
                      placeholder="Enter Country"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-[13px] min-[1600px]:text-base"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="postal"
                      className="mb-1.5 text-[13px] min-[1600px]:text-base w-fit relative"
                    >
                      Postal Code
                    </label>
                    <input
                      id="postal"
                      value={data?.postal_code}
                      onChange={(e) => {
                        setData({ ...data, postal_code: e.target.value });
                      }}
                      type="number"
                      placeholder="Enter Postal Code"
                      className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md text-[13px] min-[1600px]:text-base"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-end w-full">
                <button
                  className={`bg-[#898989]/15 font-semibold min-[1600px]:w-[160px] w-[120px] min-[1600px]:py-3 py-2 min-[1600px]:text-base text-sm rounded-xl ml-4`}
                  onClick={() => {
                    setData({
                      firstName: userData?.first_name,
                      lastName: userData?.last_name,
                      ...userData,
                    });
                    toast.success("Changes Discarded");
                  }}
                >
                  Discard
                </button>
                <button
                  className={`bg-newBlue font-semibold min-[1600px]:w-[160px] w-[120px] min-[1600px]:py-3 py-2 min-[1600px]:text-base text-sm rounded-xl ml-4`}
                  onClick={() => {
                    updateUsers();
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
  );
};

export default Settings;
