"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const SettingsLeftbar = () => {
  let items = [
    {
      icon: [
        <svg
          className="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key={"abc"}
        >
          <path
            d="M17.2166 19.3323C15.9349 17.9008 14.0727 17 12 17C9.92734 17 8.06492 17.9008 6.7832 19.3323M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>,
        <svg
          className="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key={"abc"}
        >
          <path
            d="M17.2166 19.3323C15.9349 17.9008 14.0727 17 12 17C9.92734 17 8.06492 17.9008 6.7832 19.3323M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
            stroke="#605efd"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>,
      ],
      title: "Account",
      about: "Manage your public profile and private information",
      route: "/settings",
    },
    {
      title: "Security",
      about: "Manage your password and 2-step verification process",
      icon: [
        <svg
          className="w-full h-full"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key={"abc"}
        >
          <path
            d="M9.23047 9H7.2002C6.08009 9 5.51962 9 5.0918 9.21799C4.71547 9.40973 4.40973 9.71547 4.21799 10.0918C4 10.5196 4 11.0801 4 12.2002V17.8002C4 18.9203 4 19.4801 4.21799 19.9079C4.40973 20.2842 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07902 21 7.19694 21H16.8031C17.921 21 18.48 21 18.9074 20.7822C19.2837 20.5905 19.5905 20.2842 19.7822 19.9079C20 19.4805 20 18.9215 20 17.8036V12.1969C20 11.079 20 10.5192 19.7822 10.0918C19.5905 9.71547 19.2837 9.40973 18.9074 9.21799C18.4796 9 17.9203 9 16.8002 9H14.7689M9.23047 9H14.7689M9.23047 9C9.10302 9 9 8.89668 9 8.76923V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8.76923C15 8.89668 14.8964 9 14.7689 9"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>,
        <svg
          className="w-full h-full"
          viewBox="0 0 24 24"
          key={"abc"}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.23047 9H7.2002C6.08009 9 5.51962 9 5.0918 9.21799C4.71547 9.40973 4.40973 9.71547 4.21799 10.0918C4 10.5196 4 11.0801 4 12.2002V17.8002C4 18.9203 4 19.4801 4.21799 19.9079C4.40973 20.2842 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07902 21 7.19694 21H16.8031C17.921 21 18.48 21 18.9074 20.7822C19.2837 20.5905 19.5905 20.2842 19.7822 19.9079C20 19.4805 20 18.9215 20 17.8036V12.1969C20 11.079 20 10.5192 19.7822 10.0918C19.5905 9.71547 19.2837 9.40973 18.9074 9.21799C18.4796 9 17.9203 9 16.8002 9H14.7689M9.23047 9H14.7689M9.23047 9C9.10302 9 9 8.89668 9 8.76923V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8.76923C15 8.89668 14.8964 9 14.7689 9"
            stroke="#605EFD"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>,
      ],
      route: "/settings/security",
    },
  ];

  return (
    <div className="w-4/12 h-full flex flex-col items-start border border-gray-500/5 rounded-lg px-6 py-4 text-white">
      <h4 className="mainLogoSize">Settings</h4>
      <div className="mt-4">
        {items?.map((e, i) => {
          return <Block e={e} key={i} idx={i} />;
        })}
      </div>
    </div>
  );
};

const Block = ({ e, }) => {
  const pathname = usePathname();
  const history = useRouter();

  return (
    <div
      className={`flex items-start p-4 rounded-xl mb-1 ${
        pathname == e?.route && "bg-[#171C2A] border border-gray-500/5"
      } hover:bg-[#171C2A] cursor-pointer`}
      onClick={() => {
        history.push(e?.route);
      }}
    >
      <div className="w-8 min-[1600px]:mr-4 mr-2">{e?.icon[0]}</div>
      <div>
        <h5 className={`mainText18`}>{e?.title}</h5>
        <p className={`text-gray-400 min-[1600px]:text-base text-sm mt-1.5`}>
          {e?.about}
        </p>
      </div>
    </div>
  );
};

export default SettingsLeftbar;
