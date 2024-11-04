"use client";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Required from "../Utils/Required";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import Context from "@/app/Context/Context";
import { LuEye, LuEyeOff } from "react-icons/lu";

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

const UpdateUser = ({ showSubscribe, setShowSubscribe, userData }) => {
  let maxPage = 1;
  const { setUsers, users } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    access: "guest",
    profile: "",
    phone: "",
    postal_code: "",
    country: "India",
    password: "",
    profile: "",
  });
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    setData({
      ...userData,
      firstName: userData?.first_name,
      lastName: userData?.last_name,
      access: userData?.role,
    });
  }, [userData]);

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setData({ ...data, profile: file });
    }
  };

  function closeModal() {
    setShowSubscribe(false);
  }

  const updateUsers = () => {
    if (data?.firstName && data?.lastName && data?.email && data?.access) {
      const queryParams = new URLSearchParams({
        email: data?.email,
        password: data?.password,
        first_name: data?.firstName,
        last_name: data?.lastName,
        phone: data?.phone || "",
        postal_code: data?.postal_code || "",
        role: data?.access || "admin",
        country: data?.country || "",
        status: data?.status || "active",
      }).toString();

      let formdata = new FormData();

      if (data?.profile instanceof File || data?.profile instanceof Blob) {
        formdata.append("file_content", data?.profile); // The file itself
        formdata.append("filename", data?.profile.name); // The filename
        formdata.append("content_type", data?.profile.type); // The MIME type
      } else {
        console.log(
          "Profile picture is not a valid file or blob, skipping upload."
        );
      }

      try {
        fetch(`${BACKEND_URI}/user/update/${userData?.id}?${queryParams}`, {
          headers: {
            Accept:
              "application/json, application/xml, text/plain, text/html, *.*",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          method: "PUT",
          body: formdata,
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.msg) {
              let temp = users?.data?.filter((e) => e?.id != userData?.id);
              setUsers({ ...users, data: [...temp, res.data] });
              toast.success("User updated successfully");
              closeModal();
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
            <h1 className="mainLogoSize font-semibold">Update User Details</h1>
          </div>
          <div className="h-fit px-[8vw] w-full">
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
                  className="absolute bg-newBlue flex items-center justify-center text-2xl px-2 bottom-0 min-[1600px]:-bottom-2 cursor-pointer right-0 min-[1600px]:-right-2 rounded-full"
                >
                  +
                </div>
                <Image
                  src={data?.profile ? data?.profile : "/Agency/temp_logo.png"}
                  alt="Agency Img"
                  width={1000}
                  height={1000}
                  className="w-[6vw] min-[1600px]:w-[4vw] rounded-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="mb-1.5 text-sm min-[1600px]:text-base"
                >
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
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 h-9 min-[1600px]:h-[45px] px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="mb-1.5 text-sm min-[1600px]:text-base"
                >
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
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1.5 text-sm min-[1600px]:text-base"
                >
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
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
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
                  className="glass outline-none border border-gray-500/5 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                  value={data?.access}
                  onChange={(e) => {
                    setData({ ...data, access: e.target.value });
                  }}
                >
                  {["admin", "superadmin", "guest"].map((e, i) => {
                    return (
                      <option value={e} key={i} className="bg-main">
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>{" "}
              {/* <div className="flex flex-col">
                {" "}
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
                    value={data?.password}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
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
              </div> */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="mb-1.5 text-sm min-[1600px]:text-base"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  value={data?.phone}
                  onChange={(e) => {
                    setData({ ...data, phone: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Phone"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>{" "}
              <div className="flex flex-col">
                <label
                  htmlFor="postal_code"
                  className="mb-1.5 text-sm min-[1600px]:text-base"
                >
                  Postal Code
                </label>
                <input
                  id="postal_code"
                  value={data?.postal_code}
                  onChange={(e) => {
                    setData({ ...data, postal_code: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Postal Code"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="country"
                  className="mb-1.5 text-sm min-[1600px]:text-base"
                >
                  Country
                </label>
                <input
                  id="country"
                  value={data?.country}
                  onChange={(e) => {
                    setData({ ...data, country: e.target.value });
                  }}
                  type="text"
                  placeholder="Enter Country"
                  className="bg-[#898989]/15 outline-none border border-gray-500/20 px-4 py-2 min-[1600px]:text-base text-sm rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="px-[5vw] w-full flex items-center justify-end py-5 text-sm min-[1600px]:text-base">
            <button
              onClick={() => {
                if (page == maxPage) {
                  updateUsers();
                } else {
                  setPage(page + 1);
                }
              }}
              className={`text-white bg-newBlue w-[170px] h-12 rounded-lg`}
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUser;
