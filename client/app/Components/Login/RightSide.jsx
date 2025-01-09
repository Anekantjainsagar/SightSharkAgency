import React, { memo } from "react";
import IconCloud from "@/app/Components/Animations/Cloud";
import Image from "next/image";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const RightSide = memo(() => {
  return (
    <div className="w-5/12 relative p-[3vw] hidden md:flex flex-col items-center justify-between bg-gradient-to-br from-gradientMain/50 from-[50%] to-black/50 h-full">
      <div className="w-11/12 flex items-center justify-center min-[1600px]:mt-0 mt-10">
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
      <div className="p-[1.5vw] glass rounded-xl text-white text-lg min-[1600px]:text-[20px] w-full">
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {[
            {
              name: "Dolphin Analytics",
              desc: "SightShark is an exceptional asset for companies seeking to enhance data presentation using Google Data Studio or other dashboards, consistently providing exceptional dashboard updates and improved visuals.",
            },
            {
              name: "Top Line Media",
              desc: "SightShark successfully created a complex Looker studio report, integrating various platforms and software, and successfully completed the project, recommending their services for future projects.",
            },
            {
              name: "Proximo Spirits",
              desc: "SightShark delivered excellent Tableau dashboards and I enjoyed working with them. They were quick to respond to messages, met all deadlines, and did a great job of interpreting our requirements.",
            },
          ].map((e, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="w-full flex flex-col justify-end">
                  <p className="text-white leading-[29px]">
                    &quot;{e?.desc}&quot;
                  </p>
                  <span className="text-base mt-1 text-right">{e?.name}</span>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
});

RightSide.displayName = "RightSide";

export default RightSide;
