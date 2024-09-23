import React, { memo } from "react";
import IconCloud from "@/app/Components/Animations/Cloud";
import Image from "next/image";

const RightSide = memo(() => {
  return (
    <div className="w-5/12 relative p-[3vw] flex flex-col items-center justify-between bg-gradient-to-br from-gradientMain/50 from-[50%] to-black/50 h-full">
      <div className="w-11/12 flex items-center justify-center">
        <IconCloud
          iconSlugs={[
            "amazon",
            "facebook",
            "googleads",
            "googleanalytics",
            "googlesearchconsole",
            "googlesheets",
            "hubspot",
            "instagram",
            "linkedin",
            "paypal",
            "shopify",
            "stripe",
            "xero",
            "youtube",
            "mysql",
            "amazonrds",
            "amazonredshift",
            "googlebigquery",
            "googlecloudstorage",
            "postgresql",
            "snowflake",
          ]}
        />
      </div>
      <Image
        src="/login bg.png"
        alt="Login bg"
        width={1000}
        height={1000}
        className="absolute top-0 left-0 object-cover w-full h-full"
      />
      <div className="p-[1.5vw] glass rounded-xl text-[26px]">
        <p className="text-white">
          Today, we create innovative solutions to the challenges that consumers
          face in both their everyday lives and events.
        </p>
      </div>
    </div>
  );
});

RightSide.displayName = "RightSide";

export default RightSide;
