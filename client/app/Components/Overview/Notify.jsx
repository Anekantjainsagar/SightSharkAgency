import Image from "next/image";
import React from "react";

const Notify = ({ status, data }) => {
  return (
    <div className="flex items-center justify-between py-1.5 min-[1600px]:py-2">
      <div className="flex items-center">
        <Image
          src={
            status ? "/Overview/Notify/true.png" : "/Overview/Notify/false.png"
          }
          alt="Demonstrating"
          width={1000}
          height={1000}
          className="w-[26px] min-[1600px]:w-[30px] aspect-square"
        />
        <p className="text-sm min-[1600px]:text-base font-medium ml-4 min-[1600px]:ml-6">
          <span className="font-normal mainText14">{data?.message}</span>
        </p>
      </div>
      <p className="text-sm min-[1600px]:text-base">
        {new Date(data?.created_at).toString().slice(4, 21)}
      </p>
    </div>
  );
};

export default Notify;
