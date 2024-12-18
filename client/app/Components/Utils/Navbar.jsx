"use client";
import Context from "@/app/Context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const history = useRouter();
  const pathname = usePathname();
  const { userData } = useContext(Context);

  return (
    <div className="text-white py-6 flex items-center justify-between w-full px-6">
      <h3 className="bigFont font-semibold">Hello {userData?.first_name},</h3>
      {pathname == "/view-report" ? (
        <AiOutlineClose
          onClick={() => {
            history.push("/overview");
          }}
          className="text-2xl cursor-pointer"
        />
      ) : (
        <div className="relative flex items-center w-[340px] min-[1600px]:w-[500px]">
          <FaSearch className="absolute left-4 z-40 text-white" />{" "}
          {/* Search Icon */}
          <input
            type="search"
            placeholder="Search"
            className="outline-none text-sm min-[1600px]:text-base border border-gray-200/5 bg-transparent px-6 glass py-2 min-[1600px]:py-3 rounded-lg pl-12 w-full" // Add padding to the left for the icon
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
