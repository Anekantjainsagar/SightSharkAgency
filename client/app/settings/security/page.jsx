"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import SettingsLeftbar from "@/app/Components/Settings/Leftbar";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Required from "@/app/Components/Utils/Required";
import Context from "@/app/Context/Context";
import { getCookie } from "cookies-next";
import { BACKEND_URI } from "@/app/utils/url";
import toast from "react-hot-toast";
import axios from "axios";
import Info from "@/app/Components/Login/Info";

const Settings = () => {
  const { userData, setUserData, checkPasswordCriteria } = useContext(Context);
  const [showOriginalPassword, setShowOriginalPassword] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordC, setShowNewPasswordC] = useState(false);
  const [data, setData] = useState({
    oldPass: "",
    newPassword: "",
    reNewPassword: "",
  });

  const criteria_old = checkPasswordCriteria(data?.newPassword);
  const criteria = checkPasswordCriteria(data?.oldPass);

  useEffect(() => {
    if (userData?.two_factor_authentication) {
      setTwoFactorAuth(userData?.two_factor_authentication !== "disabled");
    }
  }, [userData]);

  const toggle2factorAuth = (checked) => {
    let cookie = getCookie("token");
    if (cookie && userData?.id) {
      axios
        .put(
          `${BACKEND_URI}/user/two-factor-authentication?agency_id=${userData?.id.trim()}&two_factor_authentication=${
            checked ? "enabled" : "disabled"
          }`,
          {}, // empty object for the data (payload) since it's a PUT without a body
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            // Update state after the successful response
            setUserData({
              ...userData,
              two_factor_authentication: checked ? "enabled" : "disabled",
            });
            setTwoFactorAuth(checked); // update local state

            // Show success message
            if (checked) {
              toast.success("Two Factor Authentication Enabled");
            } else {
              toast.success("Two Factor Authentication Disabled");
            }
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error enabling/disabling Two Factor Authentication");
        });
    } else {
      toast.error("Login Error");
    }
  };

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute left-0 bottom-0 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[30vw] h-[30vh] absolute left-[40%] top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-0 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5">
          <Navbar />
          <div className="h-[85vh] px-6 w-full flex gap-x-5 justify-between items-start text-white">
            <SettingsLeftbar />
            <div className="w-8/12 h-fit justify-between flex flex-col items-start border border-gray-500/5 rounded-lg px-6 py-4 text-white">
              <div className="w-full">
                <h4 className="mainLogoSize font-semibold">Security</h4>
                <div className="mt-5">
                  <h6 className="text-lg min-[1600px]:text-[20px] font-medium">
                    Change your password
                  </h6>{" "}
                  <div className="grid grid-cols-1 gap-y-5 mt-4 w-full">
                    <div className="flex flex-col">
                      <label
                        htmlFor="currentPass"
                        className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                      >
                        Current Password <Required />{" "}
                        <Info text="Current Password" />
                      </label>
                      <div className="w-full relative mt-1">
                        <input
                          type={showOriginalPassword ? "text" : "password"}
                          name="Password"
                          id="currentPass"
                          className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md w-full min-[1600px]:text-base text-sm"
                          placeholder="Your Current Password"
                          value={data?.oldPass}
                          onChange={(e) =>
                            setData({ ...data, oldPass: e.target.value })
                          }
                        />
                        <div
                          className="absolute z-50 top-1/2 -translate-y-1/2 text-white right-5 min-[1600px]:text-2xl text-gl cursor-pointer"
                          onClick={(e) => {
                            setShowOriginalPassword(!showOriginalPassword);
                          }}
                        >
                          {showOriginalPassword ? <LuEye /> : <LuEyeOff />}
                        </div>
                      </div>{" "}
                      <div className="text-sm mt-2">
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
                            criteria.hasNumber
                              ? "text-green-500"
                              : "text-red-500"
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
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="newPass"
                        className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                      >
                        New Password
                        <Required /> <Info text="New Password" />
                      </label>
                      <div className="w-full relative mt-1">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="Password"
                          id="newPass"
                          className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md w-full min-[1600px]:text-base text-sm"
                          placeholder="Your New Password"
                          value={data?.newPassword}
                          onChange={(e) =>
                            setData({ ...data, newPassword: e.target.value })
                          }
                        />
                        <div
                          className="absolute z-50 top-1/2 -translate-y-1/2 text-white right-5 min-[1600px]:text-2xl text-gl cursor-pointer"
                          onClick={(e) => {
                            setShowNewPassword(!showNewPassword);
                          }}
                        >
                          {showNewPassword ? <LuEye /> : <LuEyeOff />}
                        </div>
                      </div>{" "}
                      <div className="text-sm mt-2">
                        <p
                          className={
                            criteria_old.hasUppercase
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {criteria_old.hasUppercase ? "✔" : "✘"} At least one
                          uppercase letter
                        </p>
                        <p
                          className={
                            criteria_old.hasLowercase
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {criteria_old.hasLowercase ? "✔" : "✘"} At least one
                          lowercase letter
                        </p>
                        <p
                          className={
                            criteria_old.hasNumber
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {criteria_old.hasNumber ? "✔" : "✘"} At least one
                          number
                        </p>
                        <p
                          className={
                            criteria_old.hasSpecialChar
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {criteria.hasSpecialChar ? "✔" : "✘"} At least one
                          special character
                        </p>
                      </div>
                    </div>{" "}
                    <div className="flex flex-col">
                      <label
                        htmlFor="retypeNewPassword"
                        className="mb-1.5 text-sm min-[1600px]:text-base w-fit relative"
                      >
                        Confirm New Password
                        <Required />
                        <Info text="Confirmed New Password" />
                      </label>
                      <div className="w-full relative mt-1">
                        <input
                          type={showNewPasswordC ? "text" : "password"}
                          name="Password"
                          id="retypeNewPassword"
                          className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md w-full min-[1600px]:text-base text-sm"
                          placeholder="Your Confirm New Password"
                          value={data?.reNewPassword}
                          onChange={(e) =>
                            setData({ ...data, reNewPassword: e.target.value })
                          }
                        />
                        <div
                          className="absolute z-50 top-1/2 -translate-y-1/2 text-white right-5 min-[1600px]:text-2xl text-gl cursor-pointer"
                          onClick={(e) => {
                            setShowNewPasswordC(!showNewPasswordC);
                          }}
                        >
                          {showNewPasswordC ? <LuEye /> : <LuEyeOff />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[1px] w-full my-10 bg-gray-600/50"></div>{" "}
                <h4 className="text-lg min-[1600px]:text-[20px] font-semibold">
                  Security preferences
                </h4>
                <p className="text-[#B2B4BA] mainText18 my-1">
                  Keep your account safe by setting these preferences
                </p>
                <div className="mt-5 flex items-center justify-between w-full">
                  <h6 className="text-sm min-[1600px]:text-base text-[#fff]">
                    Enable two-step authentication
                  </h6>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={twoFactorAuth}
                      onChange={() => {
                        setTwoFactorAuth(!twoFactorAuth);
                      }}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              <div className="mt-10 flex items-center justify-end w-full">
                <button
                  className={`bg-[#898989]/15 font-semibold min-[1600px]:w-[160px] w-[120px] min-[1600px]:py-3 py-2 min-[1600px]:text-base text-sm rounded-xl ml-4`}
                  onClick={() => {
                    setData({
                      oldPass: "",
                      newPassword: "",
                      reNewPassword: "",
                    });
                    if (userData?.two_factor_authentication) {
                      setTwoFactorAuth(
                        userData?.two_factor_authentication !== "disabled"
                      );
                    }
                    toast.success("Changes Discarded");
                  }}
                >
                  Discard
                </button>
                <button
                  className={`bg-newBlue font-semibold min-[1600px]:w-[160px] w-[120px] min-[1600px]:py-3 py-2 min-[1600px]:text-base text-sm rounded-xl ml-4`}
                  onClick={() => {
                    toggle2factorAuth(twoFactorAuth);
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
