"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BACKEND_URI } from "../utils/url";
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
    border: "none",
  },
};

const PasswordReset = ({ showSubscribe, setShowSubscribe }) => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  function closeModal() {
    setShowSubscribe(false);
  }

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
          <h4 className="mainText20 w-11/12 text-center mb-1.5 mt-5">
            {!sent ? "Forgot your Password?" : "Password Reset Email Sent."}
          </h4>
          <p className="w-10/12 mx-auto text-center">
            {sent
              ? "Please check your inbox for the password reset link."
              : "Enter the email address associated with your account to recover your password."}
          </p>
          {!sent && (
            <div className="flex flex-col mt-4 w-full">
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                disabled={sent}
                placeholder="Enter Email"
                className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
              />
            </div>
          )}
          <button
            className={`bg-newBlue w-full py-2 mt-5 rounded-lg text-sm min-[1600px]:text-base text-center`}
            onClick={() => {
              if (sent) {
                setShowSubscribe(false);
              } else {
                if (email) {
                  const formData = new URLSearchParams();
                  formData.append("email", email);

                  axios
                    .post(`${BACKEND_URI}/user/recover-password`, formData, {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: `Bearer ${getCookie("token")}`,
                      },
                    })
                    .then((res) => {
                      if (res.status == 200) {
                        toast.success("Password reset email sent");
                        setSent(true);
                      }
                    })
                    .catch((err) => {
                      if (err.response.status === 404) {
                        toast.error("User not found");
                      }
                    });
                } else {
                  toast.error("Please enter an email address");
                }
              }
            }}
          >
            {sent ? "Ok" : "Submit"}
          </button>{" "}
        </div>
      </Modal>
    </div>
  );
};

export default PasswordReset;
