"use client";
import Context from "@/app/Context/Context";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const { userData } = useContext(Context);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="text-white py-4 flex items-center justify-between w-full px-6">
      <div>
        <h3 className="bigFont font-semibold">Hello {userData?.name},</h3>
        <p className="text-sm min-[1600px]:text-base text-[#85888E]">
          Here’s your overview of the agencies
        </p>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="relative flex items-center w-[340px] min-[1600px]:w-[500px]">
          <FaSearch className="absolute left-4 z-40 text-white" />{" "}
          {/* Search Icon */}
          <input
            type="search"
            placeholder="Search"
            className="outline-none text-sm min-[1600px]:text-base border border-gray-200/5 bg-transparent px-6 glass py-2 min-[1600px]:py-3 rounded-lg pl-12 w-full" // Add padding to the left for the icon
          />
        </div>
        <div className="w-10 min-[1600px]:w-12 h-9 min-[1600px]:h-12 rounded-lg glass flex items-center justify-center border border-gray-200/5 relative">
          {!showNotifications ? (
            <svg
              className="w-5 min-[1600px]:w-6 h-5 min-[1600px]:h-6 cursor-pointer"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setShowNotifications(!showNotifications);
              }}
            >
              <path
                d="M14.0008 21.5H10.0008M18.0008 8.5C18.0008 6.9087 17.3686 5.38258 16.2434 4.25736C15.1182 3.13214 13.5921 2.5 12.0008 2.5C10.4095 2.5 8.88333 3.13214 7.75811 4.25736C6.63289 5.38258 6.00075 6.9087 6.00075 8.5C6.00075 11.5902 5.22122 13.706 4.35042 15.1054C3.61588 16.2859 3.24861 16.8761 3.26208 17.0408C3.27699 17.2231 3.31561 17.2926 3.46253 17.4016C3.59521 17.5 4.19334 17.5 5.38961 17.5H18.6119C19.8082 17.5 20.4063 17.5 20.539 17.4016C20.6859 17.2926 20.7245 17.2231 20.7394 17.0408C20.7529 16.8761 20.3856 16.2859 19.6511 15.1054C18.7803 13.706 18.0008 11.5902 18.0008 8.5Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <AiOutlineClose
              className="cursor-pointer text-2xl"
              onClick={() => {
                setShowNotifications(!showNotifications);
              }}
            />
          )}
          {showNotifications && (
            <div className="absolute top-[6vh] right-0 w-[22vw] min-[1600px]:w-[20vw] z-50 bg-main border border-gray-500/20 rounded-xl p-2 small-scroller h-[20vh] overflow-y-auto">
              {[1, 2, 3].map((e) => {
                return (
                  <div
                    key={e}
                    className="border border-gray-500/15 rounded-xl p-2 flex items-start mb-2"
                  >
                    <Image
                      src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                      width={1000}
                      height={1000}
                      alt="User img"
                      className="w-[2.5vw] aspect-square rounded-full"
                    />
                    <div className="flex flex-col ml-2.5 min-[1600px]:ml-4 w-full">
                      <h5 className="text-gray-300 min-[1600px]:text-base text-sm">
                        <span className="text-white">Alpha Solutions</span> new
                        Agency Added successfully
                      </h5>
                      <p className="text-gray-300 text-end text-xs min-[1600px]:text-sm">
                        1 day ago
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
