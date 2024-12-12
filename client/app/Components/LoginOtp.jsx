"use client";
import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import Context from "../Context/Context";
import { BACKEND_URI } from "../utils/url";
import { setCookie } from "cookies-next";

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
    border: "none",
  },
};

const LoginOtp = ({ showSubscribe, setShowSubscribe, email }) => {
  const [otpVal, setOtpVal] = useState("");
  const history = useRouter();
  const { checkToken } = useContext(Context);

  function closeModal() {
    setShowSubscribe(false);
  }

  const onCheckOtp = () => {
    if (email && otpVal) {
      try {
        axios
          .post(
            `${BACKEND_URI}/auth/verify-otp`,
            { email: email.toLowerCase(), otp: otpVal.toString() },
            {
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data.access_token) {
              setCookie("token", res.data.access_token);
              checkToken();
              history.push("/overview");
            }
            if (res.data.detail) {
              toast.error(res.data.detail);
            }
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response?.data?.msg || "An error occurred");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please fill all the details");
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
        <div className="relative rounded-lg bg-[#0C111D] py-6 border border-gray-500/40 px-4 text-white flex flex-col items-center justify-center w-[30vw] min-[1600px]:w-[25vw]">
          <AiOutlineClose
            className="text-2xl absolute top-4 right-4 cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
          <div className="flex flex-col items-center">
            <h4 className="mainText20 w-11/12 text-center mb-1 mt-5">
              Enter OTP for Verification
            </h4>
            <p className="w-11/12 mx-auto text-center mb-5">
              Please enter the OTP (One-Time Password) sent to your registered
              email address.
            </p>
            <OtpInput
              value={otpVal}
              onChange={(val) => {
                setOtpVal(val);
              }}
              className="w-full border-3 px-3 text-2xl py-1.5 outline-none rounded-md mb-4"
              numInputs={6}
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
              separator={<span style={{ width: "8px" }}></span>}
              isInputNum={true}
              shouldAutoFocus={true}
              inputType="number"
              inputStyle={{
                border: "1px solid transparent",
                borderRadius: "8px",
                width: "54px",
                height: "54px",
                fontSize: "20px",
                color: "#000",
                caretColor: "blue",
                marginRight: "5px",
              }}
              focusStyle={{
                border: "1px solid #aeafb0",
                outline: "none",
              }}
            />
            <div className="flex items-center justify-start w-full mt-4">
              <p>
                Didn&apos;t receive the code?{" "}
                <span className="text-newBlue cursor-pointer">Resend Code</span>
              </p>
            </div>
            <button
              onClick={onCheckOtp}
              className={`bg-newBlue w-full py-2 mt-5 rounded-lg text-sm min-[1600px]:text-base text-center`}
            >
              Verify
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LoginOtp;
