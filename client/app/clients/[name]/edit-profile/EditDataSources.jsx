"use client";
import React, { useContext, useEffect, useState } from "react";
import { BsCheckLg, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Context from "@/app/Context/Context";
import Image from "next/image";
import axios from "axios";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

function formatName(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const EditDataSources = ({ original_data }) => {
  const { selectedClientDetails } = useContext(Context);

  return (
    <div className="flex items-start justify-between mt-4 px-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 w-full">
        {selectedClientDetails?.platforms_images?.map((e, i) => {
          return <DataSourceBox key={i} e={e} original_data={original_data} />;
        })}
      </div>
    </div>
  );
};

const DataSourceBox = ({ e, original_data }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [account_id, setAccount_id] = useState("");
  const { dataSourceStructure, getAgencies, getCredentialsForClient } =
    useContext(Context);

  useEffect(() => {
    if (dataSourceStructure) {
      setAccount_id(
        dataSourceStructure?.find((item) => item?.platform === e?.platform)
          ?.creds_structure?.account_id
      );
    }
  }, [e]);

  return (
    <div className="flex flex-col items-center justify-between h-fit relative border rounded-2xl border-gray-300/30 bg-[#171C2A]/50 p-2">
      <div className="flex items-center flex-col gap-y-1 min-[1600px]:gap-y-2 h-fit md:h-[8vw] md:mb-0 mb-2.5 md:w-[6vw] justify-center">
        <Image
          src={e?.logo}
          alt={e?.platform}
          width={1000}
          height={1000}
          className="min-[1600px]:w-10 min-[1600px]:h-14 w-10 h-14 aspect-square object-contain"
        />
        <label
          htmlFor={e?.platform}
          className="text-[13px] min-[1600px]:text-[1.15rem] capitalize text-center cursor-pointer"
        >
          {formatName(e?.platform)}
        </label>
      </div>
      <div>
        {!showMenu ? (
          <BsThreeDotsVertical
            className="text-gray-300 w-1/12 cursor-pointer text-lg absolute right-2 top-3"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        ) : (
          <AiOutlineClose
            className="text-gray-300 w-1/12 cursor-pointer absolute text-lg right-2 top-3"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          />
        )}
        {showMenu && (
          <div className="absolute -right-[6.5vw] top-10 backdrop-blur-2xl min-[1600px]:text-sm text-xs border border-gray-200/20 rounded-md">
            <p
              onClick={() => {
                setIsEditable(!isEditable);
                setShowMenu(false);
              }}
              className="px-2 py-1.5 hover:bg-gray-200/10 cursor-pointer rounded-md"
            >
              Edit Account ID
            </p>
            <p
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${BACKEND_URI}/client/delete-platform-credentials?client_id=${original_data?.client_id}&platform_name=${e?.platform}`,
                    {},
                    {
                      headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${getCookie("token")}`,
                      },
                    }
                  );

                  if (response.data) {
                    getAgencies();
                    // getCredentialsForClient(original_data?.client_id);
                    setShowMenu(false);
                    setIsEditable(false);
                    toast.success("Data Source Deleted Successfully");
                  }
                } catch (err) {
                  toast.error(err.message);
                }
              }}
              className="px-2 py-1.5 hover:bg-gray-200/10 cursor-pointer rounded-md"
            >
              Delete Data Source
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center w-full md:px-2 justify-between gap-x-2 relative">
        {isEditable ? (
          <div className="flex items-center w-full justify-between min-[1600px]:gap-x-2 gap-x-1">
            <input
              type="text"
              value={account_id}
              placeholder="Account ID"
              onChange={(eve) => setAccount_id(eve.target.value)}
              className="bg-transparent w-11/12 outline-none border border-gray-400/30 text-gray-400 rounded-2xl text-sm py-0.5 min-[1600px]:text-base px-3"
            />
            <BsCheckLg
              className="text-green-800 cursor-pointer rounded-full text-xl min-[1600px]:text-3xl"
              onClick={async () => {
                try {
                  let platforms = dataSourceStructure
                    .filter((item) =>
                      original_data?.platform_name.includes(item?.platform)
                    )
                    .reduce((acc, item) => {
                      acc[item?.platform] = {
                        ...item.creds_structure,
                        ...(item?.platform === e?.platform && { account_id }),
                        report_start_date: "2024-01-11",
                        account_filter: "blank",
                      };
                      return acc;
                    }, {});

                  if (Object.keys(platforms)) {
                    const response = await axios.post(
                      `${BACKEND_URI}/client/update-client-credentials?client_id=${original_data?.client_id}&parent_name=${original_data?.parent_name}`,
                      { platforms },
                      {
                        headers: {
                          Accept: "application/json",
                          Authorization: `Bearer ${getCookie("token")}`,
                        },
                      }
                    );

                    if (response.data) {
                      // getAgencies();
                      getCredentialsForClient(original_data?.client_id);
                      toast.success("Updated Data Sources Successfully");
                      setIsEditable(false);
                    }
                  }
                } catch (err) {
                  console.error(err.response?.data || err.message);
                  toast.error(err.message);
                }
              }}
            />
          </div>
        ) : (
          <p className="min-[1600px]:text-base w-full text-sm text-center">
            Account ID: {account_id}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditDataSources;
