"use client";
import Context from "@/app/Context/Context";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";

const Navbar = ({ loading = false }) => {
  const pathname = usePathname();
  const history = useRouter();
  const {
    userData,
    setSearchTextClients,
    searchTextClients,
    agencies,
    showLeftMenu,
    setShowLeftMenu,
    criticalNotifications,
    alerts,
    users,
    agencyReports,
    archivedReports,
  } = useContext(Context);

  return loading ? (
    <div className="text-white md:py-6 py-4 flex items-center justify-between w-full md:px-6 animate-pulse">
      <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
      <div className="flex items-center justify-end">
        <div className="relative flex items-center w-10/12 md:w-[340px]">
          <div className="absolute left-4 z-40 text-white text-sm md:text-base h-6 w-6 rounded-full bg-gray-200"></div>
          <form className="w-full relative">
            <input className="outline-none text-sm border border-gray-200/5 bg-transparent pr-4 md:pr-6 py-2 rounded-lg md:pl-12 pl-10 w-full h-8 bg-gray-200"></input>
          </form>
        </div>
        <div className="md:hidden block text-4xl text-gray-300 ml-2 p-1 border border-gray-300/10 rounded-md h-12 w-12 bg-gray-200"></div>
      </div>
    </div>
  ) : (
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
            {pathname === "/overview" && searchTextClients && (
              <div className="absolute right-0 top-16 w-[500px] bg-main rounded-md min-h-[15vh] max-h-[20vh] small-scroller z-20 overflow-y-auto px-2 pb-2">
                {agencies?.data?.length > 0 && (
                  <p className="text-gray-200 px-2 py-0.5 text-sm">Clients</p>
                )}
                {agencies?.data?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                      onClick={() => {
                        history.push(
                          `/agencies/${e?.agency_name?.replaceAll(" ", "-")}`
                        );
                        setSearchTextAgency("");
                      }}
                    >
                      <p className="w-5/12 break-words">{e?.client_name}</p>
                      <p className="text-sm">{`/agencies/${e?.client_name?.replaceAll(
                        " ",
                        "-"
                      )}`}</p>
                    </div>
                  );
                })}
                <Title text="Users" condition={users?.data?.length > 0} />
                {users?.data?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                      onClick={() => {
                        history.push(`/users`);
                        setSearchTextAgency("");
                      }}
                    >
                      <p className="w-full break-words">
                        {e?.first_name + " " + e?.last_name}
                      </p>
                      {/* <p className="text-sm">{`/agencies/${e?.client_name?.replaceAll(
                        " ",
                        "-"
                      )}`}</p> */}
                    </div>
                  );
                })}
                <Title
                  text="Recent Reports"
                  condition={agencyReports?.length > 0}
                />
                {agencyReports?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                      onClick={() => {
                        history.push(`/dashboards`);
                        setSearchTextAgency("");
                      }}
                    >
                      <p className="w-full break-words">
                        {e?.report_name?.replaceAll("_", " ")}
                      </p>
                      {/* <p className="text-sm">{`/agencies/${e?.client_name?.replaceAll(
                        " ",
                        "-"
                      )}`}</p> */}
                    </div>
                  );
                })}{" "}
                <Title
                  text="Archived Reports"
                  condition={archivedReports?.length > 0}
                />
                {archivedReports?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                      onClick={() => {
                        history.push(`/dashboards`);
                        setSearchTextAgency("");
                      }}
                    >
                      <p className="w-full break-words">
                        {e?.report_name?.replaceAll("_", " ")}
                      </p>
                      {/* <p className="text-sm">{`/agencies/${e?.client_name?.replaceAll(
                        " ",
                        "-"
                      )}`}</p> */}
                    </div>
                  );
                })}
                <Title
                  text="Critical Notifications"
                  condition={criticalNotifications?.notifications?.length > 0}
                />
                {criticalNotifications?.notifications?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                      onClick={() => {
                        history.push(`/alerts`);
                        setSearchTextAgency("");
                      }}
                    >
                      <p className="w-full break-words">{e?.message}</p>
                      {/* <p className="text-sm">{`/agencies/${e?.client_name?.replaceAll(
                        " ",
                        "-"
                      )}`}</p> */}
                    </div>
                  );
                })}
                <Title text="Alerts" condition={alerts?.alerts?.length > 0} />
                {alerts?.alerts?.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="hover:bg-gray-700/20 cursor-pointer px-2 py-1 rounded-md flex items-center justify-between"
                      onClick={() => {
                        history.push(`/alerts`);
                        setSearchTextAgency("");
                      }}
                    >
                      <p className="break-words">{e?.message}</p>
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

const Title = ({ text, condition }) => {
  return (
    condition && (
      <div className="w-full">
        {text !== "Clients" && <Line />}
        <p className="text-gray-200 px-2 py-0.5 text-sm">{text}</p>
      </div>
    )
  );
};

const Line = () => {
  return <div className="h-[1px] w-11/12 my-3 bg-gray-300/10 mx-auto"></div>;
};

export default Navbar;
