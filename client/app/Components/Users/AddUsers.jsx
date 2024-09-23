"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Required from "../Utils/Required";

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
    width: "65vw",
    border: "none",
  },
};

const AddUsers = ({ showSubscribe, setShowSubscribe }) => {
  let maxPage = 3;
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    access: "",
    profile: "",
  });
  const fileInputRef = React.useRef(null);
  const fileInputRefAgent = React.useRef(null);

  // Function to handle file selection
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
        <div className="relative rounded-lg bg-main pt-10 text-white">
          <AiOutlineClose
            size={40}
            onClick={closeModal}
            className="absolute top-2 right-2 px-2 cursor-pointer"
          />
          <div className="mb-5 text-center">
            <h1 className="mainLogoSize font-semibold">User Details</h1>
          </div>
          <div className="h-[40vh] px-[8vw] w-full">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChangeProfile}
                />
                <div
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                  className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 -bottom-2 cursor-pointer -right-2 rounded-full"
                >
                  +
                </div>
                <Image
                  src={data?.profile ? data?.profile : "/Agency/temp_logo.png"}
                  alt="Agency Img"
                  width={1000}
                  height={1000}
                  className="w-[4vw] rounded-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1.5 text-base">
                  First Name
                  <Required />
                </label>
                <input
                  id="name"
                  value={data?.firstName}
                  onChange={(e) => {
                    setData({ ...data, firstName: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter First Name"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 h-[45px] px-4 py-2 rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="mb-1.5 text-base">
                  Last Name
                  <Required />
                </label>
                <input
                  id="lastName"
                  value={data?.lastName}
                  onChange={(e) => {
                    setData({ ...data, lastName: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Last Name"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1.5 text-base">
                  Email
                  <Required />
                </label>
                <input
                  id="email"
                  value={data?.email}
                  onChange={(e) => {
                    setData({ ...data, email: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Email"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 rounded-md"
                />
              </div>{" "}
              <div className="flex flex-col">
                <label htmlFor="access" className="mb-1.5">
                  Access
                  <Required />
                </label>
                <select
                  name="access"
                  id="access"
                  className="glass outline-none border border-gray-500/5 px-4 py-2 rounded-md"
                  value={data?.access}
                  onChange={(e) => {
                    setData({ ...data, access: e.target.value });
                  }}
                >
                  {["Guest"].map((e, i) => {
                    return (
                      <option value={e} key={i} className="bg-main">
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="px-[5vw] w-full flex items-center justify-end py-5 text-base">
            <button
              onClick={() => {
                if (page == maxPage) {
                } else {
                  setPage(page + 1);
                }
              }}
              className={`text-white bg-newBlue w-[170px] h-12 rounded-lg`}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddUsers;
