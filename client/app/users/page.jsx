"use client";
import React, { useContext, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import UserDetailBlock from "@/app/Components/Users/UserDetailBlock";
import { FaPlus } from "react-icons/fa";
import AddUsers from "@/app/Components/Users/AddUsers";
import Context from "../Context/Context";
import SortByButton from "../Components/Users/SortByButton";

let sort_by_options = [
  "created_at",
  "first_name",
  "status",
  "last_online",
  "access",
];

const Overview = () => {
  const { users, getUsers } = useContext(Context);
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <AddUsers
        showSubscribe={showSubscribe}
        setShowSubscribe={setShowSubscribe}
      />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full rounded-lg py-2 px-6 min-[1600px]:py-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl min-[1600px]:text-2xl">
                Users{" "}
                <span className="text-lg min-[1600px]:text-xl text-white/80">
                  ({users?.total_count})
                </span>
              </h3>{" "}
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setShowSubscribe(!showSubscribe);
                  }}
                  className="bg-newBlue px-6 py-2.5 min-[1600px]:py-3 rounded-xl ml-4 flex items-center gap-x-2 text-sm min-[1600px]:text-base"
                >
                  <FaPlus className="text-sm" /> Add Users
                </button>
                <SortByButton sort_by_options={sort_by_options} />
              </div>
            </div>
            <div className="min-[1600px]:mt-5 mt-4 border border-gray-200/5 rounded-2xl">
              <div className="grid bg-[#030021]/40 py-4 px-7 userBlockGrid items-center rounded-2xl">
                {["Name", "Access", "Status", "Joined", "Last Online"].map(
                  (e, i) => {
                    return (
                      <h5
                        key={i}
                        className={`text-[13px] min-[1600px]:text-base font-light tracking-wider ${
                          e?.includes("Name")
                            ? "min-[1600px]:ml-0 ml-2"
                            : "text-center"
                        }`}
                      >
                        {e}
                      </h5>
                    );
                  }
                )}
              </div>
              <div className="h-[68vh] min-[1600px]:h-[70vh]">
                <div className="overflow-y-auto small-scroller h-[89%]">
                  {users?.data?.map((e, i) => {
                    return (
                      <UserDetailBlock status={"Online"} data={e} key={i} />
                    );
                  })}
                </div>
                <div className="h-[10%] min-[1600px]:h-[14%] gap-x-4 px-6 flex items-center justify-center bg-[#030021]/40 rounded-2xl">
                  {[...Array(users?.total_pages).keys()]
                    .map((i) => i + 1)
                    ?.map((e, i) => {
                      return (
                        <div
                          className={`w-[30px] cursor-pointer min-[1600px]:w-[40px] h-[30px] text-sm min-[1600px]:text-base min-[1600px]:h-[40px] rounded-lg flex items-center justify-center ${
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
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
