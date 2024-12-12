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
    <div className="w-5/12 relative p-[3vw] flex flex-col items-center justify-between bg-gradient-to-br from-gradientMain/50 from-[50%] to-black/50 h-full">
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
            "Prowiz.io is dedicated to crafting cutting-edge solutions that simplify and enhance the lives of consumers, whether it's for daily tasks or special events.",
            "Prowiz.io is dedicated to crafting cutting-edge solutions that simplify and enhance the lives of consumers, whether it's for daily tasks or special events.",
            "Prowiz.io is dedicated to crafting cutting-edge solutions that simplify and enhance the lives of consumers, whether it's for daily tasks or special events.",
          ].map((e, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="w-full flex flex-col justify-end">
                  <p className="text-white leading-[29px]">&quot;{e}&quot;</p>
                  <span className="text-base mt-1 text-right">
                    Anekant, Frontend Developer, Prowiz Analytics
                  </span>
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
