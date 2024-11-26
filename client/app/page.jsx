"use client";
import React, { useContext, useEffect, useState } from "react";
import RightSide from "@/app/Components/Login/RightSide";
import { LuEye, LuEyeOff } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { BACKEND_URI } from "./utils/url";
import LoginOtp from "@/app/Components/LoginOtp";
import PasswordReset from "@/app/Components/PasswordReset";
import { useRouter } from "next/navigation";
import Context from "./Context/Context";
import { setCookie } from "cookies-next";

const App = () => {
  const history = useRouter();
  const { checkToken } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ password: "", email: "" });
  const [showOtp, setShowOtp] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [recoverPassword, setRecoverPassword] = useState(false);

  const handleRememberMe = () => {
    localStorage.setItem("email", user?.email);
    localStorage.setItem("password", user?.password);
  };

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setRememberMe(true);
    }
    setUser({
      email: localStorage.getItem("email"),
      password: localStorage.getItem("password"),
    });
  }, []);

  const onLogin = () => {
    if (user?.email && user?.password) {
      if (rememberMe) {
        handleRememberMe();
      }
      try {
        const loginData = new URLSearchParams({
          username: user?.email,
          password: user?.password,
        });

        fetch(`${BACKEND_URI}/auth/login`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          method: "POST",
          body: loginData,
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.detail) {
              toast.error(res.detail);
            } else if (res.access_token) {
              setCookie("token", res.access_token);
              checkToken();
              history.push("/overview");
              toast.success("Login Successfully");
            } else {
              toast.success("OTP sent to your registered email address");
              setShowOtp(true);
            }
          })
          .catch((err) => {
            console.log(err);
            if (err.status == 401) {
              toast.error("Invalid credentials");
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
      <LoginOtp
        showSubscribe={showOtp}
        setShowSubscribe={setShowOtp}
        email={user?.email}
      />{" "}
      <PasswordReset
        showSubscribe={recoverPassword}
        setShowSubscribe={setRecoverPassword}
      />
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
          <p className="mainText18 text-white/80 mt-2">Login to your account</p>
          <div className="w-11/12 min-[1600px]:mt-4">
            <div className="flex flex-col mt-5 min-[1600px]:mt-10 mb-3 min-[1600px]:mb-6">
              <label
                htmlFor="email"
                className="mb-1.5 text-sm min-[1600px]:text-base"
              >
                Email
              </label>
              <input
                id="email"
                value={user?.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                type="text"
                placeholder="Enter Email"
                className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
              />
            </div>
            <label
              htmlFor="password"
              className="text-sm min-[1600px]:text-base"
            >
              Password
            </label>
            <div className="w-full relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={user?.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
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
            <div className="my-4 min-[1600px]:my-8 flex items-center justify-between">
              <div className="mainText18 flex items-center gap-x-2 min-[1600px]:gap-x-3">
                <div className="inline-flex items-start">
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative min-[1600px]:h-6 min-[1600px]:w-6 w-5 h-5 rounded-md cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
                      id="check"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
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
                <label htmlFor="remember" className="cursor-pointer">
                  Remember Me
                </label>
              </div>
              <button
                onClick={() => {
                  setRecoverPassword(true);
                }}
                className="text-[#F04438] mainText18"
              >
                Forgot Password
              </button>
            </div>
            <button
              onClick={() => {
                onLogin();
              }}
              className="w-full py-3 bg-newBlue rounded-[10px] mainText18"
            >
              Log In
            </button>
            <div className="flex items-center justify-between w-full my-5 min-[1600px]:my-10">
              <div className="line w-full h-[1px] bg-[#343745]"></div>
              <span className="px-2 whitespace-nowrap text-[#85888E] mainText14">
                Or
              </span>
              <div className="line w-full h-[1px] bg-[#343745]"></div>
            </div>
            <div className="items-stretch flex flex-col gap-y-3">
              <button className="w-full bg-[#898989]/15 rounded-[10px] flex items-center justify-center h-12">
                <Image
                  src="/login/google.png"
                  width={1000}
                  height={1000}
                  alt="Google icon"
                  className="w-5 aspect-square mr-3"
                />
                <p>Sign in with Google</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <RightSide />
    </div>
  );
};

export default App;
