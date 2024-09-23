"use client";
import React, { useEffect, useState } from "react";
import Leftbar from "@/app/Components/Utils/Leftbar";
import Navbar from "@/app/Components/Utils/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Overview = () => {
  const history = useRouter();

  const connectorsData = [
    {
      title: "Amazon Selling Partner",
      img: "/Agency/connectors/Amazon Selling Partner.svg",
    },
    {
      title: "Bamboo HR",
      img: "/Agency/connectors/BambooHR.svg",
    },
    {
      title: "Facebook Ads",
      img: "/Agency/connectors/Facebook Ads.svg",
    },
    {
      title: "Facebook Insights",
      img: "/Agency/connectors/Facebook Insights.svg",
    },
    {
      title: "Google Ads Manager",
      img: "/Agency/connectors/Google Ads Manager.svg",
    },
    {
      title: "Google Ads",
      img: "/Agency/connectors/Google Ads.svg",
    },
    {
      title: "Google Analytics",
      img: "/Agency/connectors/Google Analytics 4.svg",
    },
    {
      title: "Google DV360",
      img: "/Agency/connectors/Google DV360.svg",
    },
    {
      title: "Google My Business",
      img: "/Agency/connectors/Google My Business.svg",
    },
    {
      title: "Google Search Console",
      img: "/Agency/connectors/Google Search Console.svg",
    },
    {
      title: "Google Sheets",
      img: "/Agency/connectors/Google Sheets.svg",
    },
    {
      title: "HubSpot",
      img: "/Agency/connectors/HubSpot.svg",
    },
    {
      title: "Instagram Ads",
      img: "/Agency/connectors/Instagram Ads.svg",
    },
    {
      title: "Instagram Insights",
      img: "/Agency/connectors/Instagram Insights.svg",
    },
    {
      title: "JSON",
      img: "/Agency/connectors/JSON.svg",
    },
    {
      title: "Klaviyo",
      img: "/Agency/connectors/Klaviyo.svg",
    },
    {
      title: "LinkedIn",
      img: "/Agency/connectors/LinkedIn.svg",
    },
    {
      title: "Outbrain",
      img: "/Agency/connectors/Outbrain.svg",
    },
    {
      title: "PayPal",
      img: "/Agency/connectors/PayPal.svg",
    },
    {
      title: "Shopify",
      img: "/Agency/connectors/Shopify.svg",
    },
    {
      title: "Stripe",
      img: "/Agency/connectors/Stripe.svg",
    },
    {
      title: "Taboola",
      img: "/Agency/connectors/Taboola.svg",
    },
    {
      title: "TikTok",
      img: "/Agency/connectors/TikTok.svg",
    },
    {
      title: "X Ads",
      img: "/Agency/connectors/X Ads.svg",
    },
    {
      title: "Xero",
      img: "/Agency/connectors/Xero.svg",
    },
    {
      title: "Klaviyo",
      img: "/Agency/connectors/Klaviyo.svg",
    },
    {
      title: "YouTube",
      img: "/Agency/connectors/YouTube.svg",
    },
  ];

  return (
    <div className="flex items-start h-[100vh]">
      <Leftbar />
      <div className="w-[85%] bg-main h-full relative">
        <div className="bg-newBubbleColor/10 w-[50vw] h-[30vh] absolute top-1/2 -translate-y-1/2 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-0 absolute top-3/6 rounded-full"></div>
        <div className="bg-newBubbleColor/10 w-[20vw] h-[20vw] right-20 absolute bottom-10 rounded-full"></div>
        <div className="absolute backdrop-blur-3xl top-0 left-0 w-full h-full px-5 overflow-y-auto">
          <Navbar />
          <div className="text-white w-full p-6">
            <div className="grid grid-cols-4 gap-x-6">
              {[
                {
                  name: "Total Clients",
                  value: 20,
                  img: "/Overview/Icons/total.png",
                },
                {
                  name: "Active Clients",
                  value: 10,
                  img: "/Overview/Icons/active.png",
                },
                {
                  name: "Dashboard Views",
                  value: 5,
                  img: "/Overview/Icons/dashboard.png",
                },
                {
                  name: "Satisfaction Score",
                  value: 25,
                  img: "/Overview/Icons/satisfaction.png",
                },
              ].map((e, i) => {
                return (
                  <div
                    key={i}
                    className="bg-[#171C2A]/50 flex items-center justify-between p-6 border border-gray-500/5 rounded-xl"
                  >
                    <div>
                      <p className="text-[#CECFD2]">{e?.name}</p>
                      <p className="text-[30px] font-semibold mt-1">
                        {e?.value}
                      </p>
                    </div>
                    <Image
                      src={e.img}
                      alt={e.img?.src}
                      width={1000}
                      height={1000}
                      className="w-[60px] aspect-square"
                    />
                  </div>
                );
              })}
            </div>
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-6">
              <h3 className="text-[20px]">Data Sources</h3>{" "}
              <div className="gradient-line my-4"></div>
              <div className="h-[26vh] overflow-y-auto small-scroller grid grid-cols-3 gap-y-5 bg-[#171C2A]/70 p-4 rounded-lg border border-gray-500/5">
                {connectorsData?.map((e, i) => {
                  return (
                    <div key={i} className="flex items-center">
                      <div className="flex items-center">
                        <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/40 w-10 aspect-square p-2 mr-4">
                          <Image
                            src={e?.img}
                            alt={e?.img?.src}
                            width={1000}
                            height={1000}
                            className="aspect-squre object-contain"
                          />{" "}
                        </div>
                        <p className="mainText14 cursor-pointer">{e?.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="text-white w-full rounded-xl p-4 bg-[#171C2A]/20 border border-gray-500/5 mt-6">
              <h3 className="text-[20px]" onClick={() => {}}>
                Templates
              </h3>{" "}
              <div className="gradient-line my-4"></div>
              <div className="grid grid-cols-4 gap-x-4 mt-2">
                {[
                  {
                    img: "/Agency/individual/templates/1 (2).png",
                  },
                  {
                    img: "/Agency/individual/templates/1 (1).png",
                  },
                  { img: "/Agency/individual/templates/1 (4).png" },
                  {
                    img: "/Agency/individual/templates/1 (3).png",
                  },
                ].map((e, i) => {
                  return (
                    <div key={i}>
                      <Image
                        src={e?.img}
                        alt={e?.img?.src}
                        width={1000}
                        height={1000}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
