import Image from "next/image";
import React from "react";
import { BiSolidError } from "react-icons/bi";
import { CiCircleInfo } from "react-icons/ci";
import { PiShieldWarningFill } from "react-icons/pi";

const Notify = ({ status, data }) => {
  return (
    <div className="flex md:flex-row flex-col md:mb-0 mb-3 w-full items-start md:items-center justify-between py-1.5 min-[1600px]:py-2">
      <div className="flex items-start md:items-center w-full">
        <div className="text-xl">
          {data?.type == "error" ? (
            <BiSolidError className="text-red-500" />
          ) : data?.type == "info" ? (
            <CiCircleInfo className="text-green-500" />
          ) : (
            <PiShieldWarningFill className="text-yellow-500" />
          )}
        </div>
        <p className="text-[13px] min-[1600px]:text-base font-medium ml-3 min-[1600px]:ml-4">
          <span className="font-normal mainText14">{data?.message}</span>
        </p>
      </div>
      <p className="text-[11px] md:mt-0 mt-1 md:text-[13px] text-end w-full min-[1600px]:text-base">
        {new Date(data?.created_at).toString().slice(4, 21)}
      </p>
    </div>
  );
};

export default Notify;
