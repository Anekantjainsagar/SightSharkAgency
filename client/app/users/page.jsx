"use client";
import React, { useContext, useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import UserDetailBlock from "@/app/Components/Users/UserDetailBlock";
import { FaPlus } from "react-icons/fa";
import AddUsers from "@/app/Components/Users/AddUsers";
import Context from "../Context/Context";
import SortByButton from "../Components/Users/SortByButton";
import {
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

let sort_by_options = [
  "created_at",
  "first_name",
  "status",
  "last_online",
  "access",
];

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const { users, getUsers, userData } = useContext(Context);
  const [showSubscribe, setShowSubscribe] = useState(false);

  useEffect(() => {
    if (userData?.id) {
      setLoading(false);
    }
  }, [userData]);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar loading={loading} />
      <AddUsers
        showSubscribe={showSubscribe}
        setShowSubscribe={setShowSubscribe}
      />
      <div className="md:w-[85%] w-full bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar loading={loading} />
          <div className="text-white w-full rounded-lg py-2 md:px-6 min-[1600px]:py-6">
            <div className="flex items-center justify-between">
              {loading ? (
                <div className="flex items-center space-x-2">
                  {/* Skeleton for the "Dashboards" text */}
                  <div className="bg-gray-300 animate-pulse h-6 md:h-7 min-[1600px]:h-8 w-32 rounded-md"></div>
                  {/* Skeleton for the count */}
                  <div className="bg-gray-300 animate-pulse h-5 md:h-6 min-[1600px]:h-7 w-10 rounded-md"></div>
                </div>
              ) : (
                <h3 className="text-lg md:text-xl min-[1600px]:text-[22px] font-semibold">
                  Users{" "}
                  <span className="md:text-lg min-[1600px]:text-xl text-white/80">
                    ({users?.total_count})
                  </span>
                </h3>
              )}
              <div className="flex items-center">
                {loading ? (
                  <div className="bg-newBlue px-4 md:px-6 py-2 md:py-2.5 min-[1600px]:py-3 rounded-xl ml-4 flex items-center gap-x-1.5 md:gap-x-2 text-[12px] md:text-sm min-[1600px]:text-base animate-pulse">
                    <div className="w-4 h-4 bg-gray-300 rounded-full md:w-5 md:h-5"></div>
                    <div className="w-20 h-4 bg-gray-300 rounded ml-2"></div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowSubscribe(!showSubscribe);
                    }}
                    className="bg-newBlue px-4 md:px-6 py-2 md:py-2.5 min-[1600px]:py-3 rounded-xl ml-4 flex items-center gap-x-1.5 md:gap-x-2 text-[12px] md:text-sm min-[1600px]:text-base"
                  >
                    <FaPlus className="text-[9px] md:text-sm" /> Add Users
                  </button>
                )}
                <SortByButton
                  sort_by_options={sort_by_options}
                  loading={loading}
                />
              </div>
            </div>
            <div className="min-[1600px]:mt-5 mt-4 border border-gray-200/5 rounded-2xl">
              <div className="grid bg-[#030021]/40 py-4 px-4 md:px-7 userBlockGrid items-center rounded-2xl">
                {["Name", "Access", "Status", "Joined", "Last Online"].map(
                  (e, i) => {
                    return (
                      <h5
                        key={i}
                        className={`text-[12px] min-[1600px]:text-base ${
                          (e == "Status" ||
                            e === "Joined" ||
                            e === "Last Online") &&
                          "md:block hidden"
                        } font-light tracking-wider ${
                          e?.includes("Name")
                            ? "min-[1600px]:ml-0 ml-2"
                            : "text-center"
                        }`}
                      >
                        {loading ? (
                          <div
                            className={`w-24 h-3 bg-gray-300 animate-pulse rounded-md ${
                              e?.includes("Name") ? "ml-2" : "mx-auto"
                            }`}
                          ></div>
                        ) : (
                          e
                        )}
                      </h5>
                    );
                  }
                )}
              </div>
              <div className="h-[76vh] md:h-[66.5vh] min-[1600px]:h-[68vh]">
                <div className="overflow-y-auto small-scroller h-[90%] min-[1600px]:h-[86%]">
                  {users?.data?.map((e, i) => {
                    return (
                      <UserDetailBlock data={e} key={i} loading={loading} />
                    );
                  })}
                </div>
                {loading ? (
                  <div className="h-[14%] gap-x-4 px-6 flex items-center justify-center bg-[#030021]/40 rounded-2xl animate-pulse">
                    {/* Left Double Arrow */}
                    <div className="h-8 w-8 bg-gray-700 rounded-md"></div>

                    {/* Left Arrow */}
                    <div className="h-8 w-8 bg-gray-700 rounded-md"></div>

                    {/* Page Numbers Placeholder */}
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-[35px] md:w-[30px] min-[1600px]:w-[40px] h-[35px] md:h-[30px] min-[1600px]:h-[40px] bg-gray-700 rounded-lg"
                      ></div>
                    ))}

                    {/* Right Arrow */}
                    <div className="h-8 w-8 bg-gray-700 rounded-md"></div>

                    {/* Right Double Arrow */}
                    <div className="h-8 w-8 bg-gray-700 rounded-md"></div>
                  </div>
                ) : (
                  <div className="h-[10%] min-[1600px]:h-[14%] gap-x-4 px-6 flex items-center justify-center bg-[#030021]/40 rounded-2xl">
                    {" "}
                    <MdOutlineKeyboardDoubleArrowLeft
                      onClick={() => {
                        if (users?.current_page != 1) {
                          getUsers(1);
                        }
                      }}
                      className={`text-2xl ${
                        users?.current_page != 1
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                    <MdOutlineChevronLeft
                      onClick={() => {
                        if (users?.current_page != 1) {
                          getUsers(users?.current_page - 1);
                        }
                      }}
                      className={`text-2xl ${
                        users?.current_page != 1
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                    {[...Array(users?.total_pages).keys()]
                      .map((i) => i + 1)
                      ?.map((e, i) => {
                        return (
                          <div
                            className={`w-[35px] md:w-[30px] cursor-pointer min-[1600px]:w-[40px] h-[35px] md:h-[30px] text-sm min-[1600px]:text-base min-[1600px]:h-[40px] rounded-lg flex items-center justify-center ${
                              users?.current_page == e
                                ? "bg-newBlue"
                                : "text-[#85888E]"
                            }`}
                            key={i}
                            onClick={() => {
                              getUsers(e);
                            }}
                          >
                            {e}
                          </div>
                        );
                      })}{" "}
                    <MdOutlineChevronRight
                      onClick={() => {
                        if (users?.current_page != users?.total_pages) {
                          getUsers(users?.current_page + 1);
                        }
                      }}
                      className={`text-2xl ${
                        users?.current_page != users?.total_pages
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />{" "}
                    <MdOutlineKeyboardDoubleArrowRight
                      onClick={() => {
                        if (users?.current_page != users?.total_pages) {
                          getUsers(users?.total_pages);
                        }
                      }}
                      className={`text-2xl ${
                        users?.current_page != users?.total_pages
                          ? "text-gray-300"
                          : "text-gray-600"
                      } cursor-pointer`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
