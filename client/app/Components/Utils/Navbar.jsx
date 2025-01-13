"use client";
import Context from "@/app/Context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";

const Navbar = () => {
  const pathname = usePathname();
  const history = useRouter();
  const {
    userData,
    setSearchTextClients,
    searchTextClients,
    agencies,
    showLeftMenu,
    setShowLeftMenu,
  } = useContext(Context);

  return (
    <div className="text-white md:py-6 py-4 flex items-center justify-between w-full md:px-6">
      <h3 className="text-xl md:text-[28px] min-[1600px]:text-[36px] font-semibold md:w-fit w-6/12">
        Hello {userData?.first_name},
      </h3>
      <div className="flex items-center justify-end">
        <div className="relative flex items-center w-10/12 md:w-[340px] min-[1600px]:w-[500px]">
          <FaSearch className="absolute left-4 z-40 text-white text-sm md:text-base" />{" "}
          <form autoComplete="off" className="w-full relative">
            <input type="text" style={{ display: "none" }} />
            <input
              type="search"
              placeholder="Search"
              autoCorrect="false"
              autoComplete="off"
              value={searchTextClients}
              onChange={(e) => {
                setSearchTextClients(e.target.value);
              }}
              className="outline-none text-sm min-[1600px]:text-base border border-gray-200/5 bg-transparent pr-4 md:pr-6 glass py-2 min-[1600px]:py-3 rounded-lg md:pl-12 pl-10 w-full"
            />
            {pathname !== "/clients" && searchTextClients && (
              <div className="absolute right-0 top-12 min-[1600px]:top-16 w-full md:w-[350px] min-[1600px]:w-[500px] z-50 bg-main rounded-md min-h-[10vh] md:min-h-[15vh] overflow-y-auto p-2">
                {agencies?.data?.map((e, i, arr) => {
                  return (
                    <div
                      key={i}
                      className={`hover:bg-gray-700/20 text-[13px] min-[1600px]:text-base cursor-pointer px-2 py-1 rounded-sm transition-all flex items-center justify-between ${
                        i + 1 !== arr.length && "border-b border-b-gray-100/10"
                      }`}
                      onClick={() => {
                        history.push(`/clients/${e?.client_name}`);
                        setSearchTextClients("");
                      }}
                    >
                      <p>{e?.client_name}</p>
                      <p className="md:block hidden">{`> clients > ${e?.client_name?.replaceAll(
                        " ",
                        "-"
                      )}`}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </form>
        </div>
        {!showLeftMenu ? (
          <RiMenu3Line
            onClick={() => {
              setShowLeftMenu(!showLeftMenu);
            }}
            className="md:hidden block text-4xl text-gray-300 ml-2 p-1 border border-gray-300/10 rounded-md"
          />
        ) : (
          <AiOutlineClose
            onClick={() => {
              setShowLeftMenu(!showLeftMenu);
            }}
            className="md:hidden block text-4xl text-gray-300 ml-2 p-1 border border-gray-300/10 rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
