"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import RightSide from "@/app/Components/Login/RightSide";
import Image from "next/image";
import { BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const history = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokenFromUrl = url.searchParams.get("token");
    setToken(tokenFromUrl);
  }, []);

  const onChangePassword = () => {
    if (token && password) {
      try {
        const formData = new URLSearchParams();
        formData.append("token", token);
        formData.append("new_password", password);

        axios
          .post(`${BACKEND_URI}/user/reset-password`, formData, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${getCookie("token")}`,
            },
          })
          .then((res) => {
            if (res.status == 200) {
              toast.success("Password reset successfully");
              history.push("/");
            }
          })
          .catch((err) => {
            if (err.status === 400) {
              toast.error("User not found");
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please fill all the details");
    }
  };

  return (
    <div className="bg-[#091022] w-full flex items-start justify-between h-[100vh]">
      <Toaster />{" "}
      <div className="w-7/12 p-[2vw] flex flex-col items-center justify-center h-full">
        <div className="text-white flex flex-col items-center w-7/12 px-5">
          <div className="flex items-center gap-x-4 min-[1600px]:gap-x-6 mb-8 min-[1600px]:mb-20">
            <Image
              src="/logo.png"
              alt="Logo"
              width={1000}
              height={1000}
              className="w-12 min-[1600px]:w-[70px]"
            />
            <h4 className="text-4xl min-[1600px]:text-[38.5px] uppercase">
              SIGHTSHARK
            </h4>
          </div>
          <h1 className="text-3xl min-[1600px]:text-[40px] font-semibold">
            Welcome Back
          </h1>
          <p className="mainText18 text-white/80 mt-2">Enter new Password</p>
          <div className="w-11/12 min-[1600px]:my-6">
            <label
              htmlFor="password"
              className="text-sm min-[1600px]:text-base"
            >
              New Password
            </label>
            <div className="w-full relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter New Password"
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
          </div>
          <button
            onClick={() => {
              onChangePassword();
            }}
            className="w-11/12 py-3 bg-newBlue rounded-[10px] mainText18"
          >
            Change Password
          </button>
        </div>
      </div>
      <RightSide />
    </div>
  );
}
