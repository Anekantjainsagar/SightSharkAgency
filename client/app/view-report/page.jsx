"use client";
import React, { useContext, useEffect } from "react";
import Context from "../Context/Context";
import Leftbar from "../Components/Utils/Leftbar";
import Navbar from "../Components/Utils/Navbar";
import { useRouter } from "next/navigation";

const ViewReport = () => {
  const history = useRouter();
  const { linkToEmbed } = useContext(Context);

  useEffect(() => {
    if (!linkToEmbed) {
      history.push("/");
    }
  }, [linkToEmbed]);

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="px-6">
            <iframe
              src={linkToEmbed}
              title="Report Details"
              className="w-full h-[86vh]"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
