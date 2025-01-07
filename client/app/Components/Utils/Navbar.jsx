"use client";
import Context from "@/app/Context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const history = useRouter();
  const { userData, setSearchTextClients, searchTextClients, agencies } =
    useContext(Context);

  return (
    <div className="text-white py-6 flex items-center justify-between w-full px-6">
      <h3 className="bigFont font-semibold">Hello {userData?.first_name},</h3>
      <div className="relative flex items-center w-[340px] min-[1600px]:w-[500px]">
        <FaSearch className="absolute left-4 z-40 text-white" />{" "}
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
            className="outline-none text-sm min-[1600px]:text-base border border-gray-200/5 bg-transparent px-6 glass py-2 min-[1600px]:py-3 rounded-lg pl-12 w-full"
          />
          {pathname !== "/clients" && searchTextClients && (
            <div className="absolute right-0 top-12 min-[1600px]:top-16 w-[350px] min-[1600px]:w-[500px] z-50 bg-main rounded-md min-h-[15vh] overflow-y-auto p-2">
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
                    <p>{`> clients > ${e?.client_name?.replaceAll(
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
    </div>
  );
};

export default Navbar;
