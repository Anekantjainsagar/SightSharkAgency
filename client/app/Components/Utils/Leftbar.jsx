"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { CiGrid41, CiSettings, CiWallet } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import HelpPage from "@/app/Components/Utils/HelpPage";
import Context from "@/app/Context/Context";

let mainRoutes = [
  {
    title: "Overview",
    icon: <CiGrid41 className="text-2xl" key={"1"} />,
    route: "/overview",
    temp_icon: [
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        key={1}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.4 2.99915H4.6C4.03995 2.99915 3.75992 2.99915 3.54601 3.10814C3.35785 3.20401 3.20487 3.35699 3.10899 3.54515C3 3.75907 3 4.03909 3 4.59915V8.39915C3 8.9592 3 9.23922 3.10899 9.45314C3.20487 9.6413 3.35785 9.79428 3.54601 9.89015C3.75992 9.99915 4.03995 9.99915 4.6 9.99915H8.4C8.96005 9.99915 9.24008 9.99915 9.45399 9.89015C9.64215 9.79428 9.79513 9.6413 9.89101 9.45314C10 9.23922 10 8.9592 10 8.39915V4.59915C10 4.03909 10 3.75907 9.89101 3.54515C9.79513 3.35699 9.64215 3.20401 9.45399 3.10814C9.24008 2.99915 8.96005 2.99915 8.4 2.99915Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4 2.99915H15.6C15.0399 2.99915 14.7599 2.99915 14.546 3.10814C14.3578 3.20401 14.2049 3.35699 14.109 3.54515C14 3.75907 14 4.03909 14 4.59915V8.39915C14 8.9592 14 9.23922 14.109 9.45314C14.2049 9.6413 14.3578 9.79428 14.546 9.89015C14.7599 9.99915 15.0399 9.99915 15.6 9.99915H19.4C19.9601 9.99915 20.2401 9.99915 20.454 9.89015C20.6422 9.79428 20.7951 9.6413 20.891 9.45314C21 9.23922 21 8.9592 21 8.39915V4.59915C21 4.03909 21 3.75907 20.891 3.54515C20.7951 3.35699 20.6422 3.20401 20.454 3.10814C20.2401 2.99915 19.9601 2.99915 19.4 2.99915Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4 13.9991H15.6C15.0399 13.9991 14.7599 13.9991 14.546 14.1081C14.3578 14.204 14.2049 14.357 14.109 14.5452C14 14.7591 14 15.0391 14 15.5991V19.3991C14 19.9592 14 20.2392 14.109 20.4531C14.2049 20.6413 14.3578 20.7943 14.546 20.8902C14.7599 20.9991 15.0399 20.9991 15.6 20.9991H19.4C19.9601 20.9991 20.2401 20.9991 20.454 20.8902C20.6422 20.7943 20.7951 20.6413 20.891 20.4531C21 20.2392 21 19.9592 21 19.3991V15.5991C21 15.0391 21 14.7591 20.891 14.5452C20.7951 14.357 20.6422 14.204 20.454 14.1081C20.2401 13.9991 19.9601 13.9991 19.4 13.9991Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.4 13.9991H4.6C4.03995 13.9991 3.75992 13.9991 3.54601 14.1081C3.35785 14.204 3.20487 14.357 3.10899 14.5452C3 14.7591 3 15.0391 3 15.5991V19.3991C3 19.9592 3 20.2392 3.10899 20.4531C3.20487 20.6413 3.35785 20.7943 3.54601 20.8902C3.75992 20.9991 4.03995 20.9991 4.6 20.9991H8.4C8.96005 20.9991 9.24008 20.9991 9.45399 20.8902C9.64215 20.7943 9.79513 20.6413 9.89101 20.4531C10 20.2392 10 19.9592 10 19.3991V15.5991C10 15.0391 10 14.7591 9.89101 14.5452C9.79513 14.357 9.64215 14.204 9.45399 14.1081C9.24008 13.9991 8.96005 13.9991 8.4 13.9991Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>,
      <svg
        width="24"
        key={1}
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.4 2.99915H4.6C4.03995 2.99915 3.75992 2.99915 3.54601 3.10814C3.35785 3.20401 3.20487 3.35699 3.10899 3.54515C3 3.75907 3 4.03909 3 4.59915V8.39915C3 8.9592 3 9.23922 3.10899 9.45314C3.20487 9.6413 3.35785 9.79428 3.54601 9.89015C3.75992 9.99915 4.03995 9.99915 4.6 9.99915H8.4C8.96005 9.99915 9.24008 9.99915 9.45399 9.89015C9.64215 9.79428 9.79513 9.6413 9.89101 9.45314C10 9.23922 10 8.9592 10 8.39915V4.59915C10 4.03909 10 3.75907 9.89101 3.54515C9.79513 3.35699 9.64215 3.20401 9.45399 3.10814C9.24008 2.99915 8.96005 2.99915 8.4 2.99915Z"
          stroke="white"
          strokeOpacity="0.64"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4 2.99915H15.6C15.0399 2.99915 14.7599 2.99915 14.546 3.10814C14.3578 3.20401 14.2049 3.35699 14.109 3.54515C14 3.75907 14 4.03909 14 4.59915V8.39915C14 8.9592 14 9.23922 14.109 9.45314C14.2049 9.6413 14.3578 9.79428 14.546 9.89015C14.7599 9.99915 15.0399 9.99915 15.6 9.99915H19.4C19.9601 9.99915 20.2401 9.99915 20.454 9.89015C20.6422 9.79428 20.7951 9.6413 20.891 9.45314C21 9.23922 21 8.9592 21 8.39915V4.59915C21 4.03909 21 3.75907 20.891 3.54515C20.7951 3.35699 20.6422 3.20401 20.454 3.10814C20.2401 2.99915 19.9601 2.99915 19.4 2.99915Z"
          stroke="white"
          strokeOpacity="0.64"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.4 13.9991H15.6C15.0399 13.9991 14.7599 13.9991 14.546 14.1081C14.3578 14.204 14.2049 14.357 14.109 14.5452C14 14.7591 14 15.0391 14 15.5991V19.3991C14 19.9592 14 20.2392 14.109 20.4531C14.2049 20.6413 14.3578 20.7943 14.546 20.8902C14.7599 20.9991 15.0399 20.9991 15.6 20.9991H19.4C19.9601 20.9991 20.2401 20.9991 20.454 20.8902C20.6422 20.7943 20.7951 20.6413 20.891 20.4531C21 20.2392 21 19.9592 21 19.3991V15.5991C21 15.0391 21 14.7591 20.891 14.5452C20.7951 14.357 20.6422 14.204 20.454 14.1081C20.2401 13.9991 19.9601 13.9991 19.4 13.9991Z"
          stroke="white"
          strokeOpacity="0.64"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.4 13.9991H4.6C4.03995 13.9991 3.75992 13.9991 3.54601 14.1081C3.35785 14.204 3.20487 14.357 3.10899 14.5452C3 14.7591 3 15.0391 3 15.5991V19.3991C3 19.9592 3 20.2392 3.10899 20.4531C3.20487 20.6413 3.35785 20.7943 3.54601 20.8902C3.75992 20.9991 4.03995 20.9991 4.6 20.9991H8.4C8.96005 20.9991 9.24008 20.9991 9.45399 20.8902C9.64215 20.7943 9.79513 20.6413 9.89101 20.4531C10 20.2392 10 19.9592 10 19.3991V15.5991C10 15.0391 10 14.7591 9.89101 14.5452C9.79513 14.357 9.64215 14.204 9.45399 14.1081C9.24008 13.9991 8.96005 13.9991 8.4 13.9991Z"
          stroke="white"
          strokeOpacity="0.64"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>,
    ],
  },
  // {
  //   title: "Connectors",
  //   icon: <IoNewspaperOutline className="text-2xl" key={"4"} />,
  //   route: "/connectors",
  //   temp_icon: [
  //     <svg
  //       width="22"
  //       height="22"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //       key={500}
  //     >
  //       <path
  //         d="M5.28905 13.6318L12.2782 2.64879C12.5468 2.22677 13.2 2.417 13.2 2.91722V10.7002C13.2 10.7554 13.2448 10.8002 13.3 10.8002H18.2397C18.6442 10.8002 18.8813 11.2555 18.6493 11.5869L11.7097 21.5007C11.4293 21.9012 10.8 21.7029 10.8 21.214V14.5002C10.8 14.445 10.7553 14.4002 10.7 14.4002H5.71089C5.31634 14.4002 5.07723 13.9646 5.28905 13.6318Z"
  //         stroke="white"
  //         strokeWidth="2"
  //       />
  //     </svg>,
  //     <svg
  //       width="22"
  //       height="22"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       xmlns="http://www.w3.org/2000/svg"
  //       key={501}
  //     >
  //       <path
  //         d="M5.28905 13.6318L12.2782 2.64879C12.5468 2.22677 13.2 2.417 13.2 2.91722V10.7002C13.2 10.7554 13.2448 10.8002 13.3 10.8002H18.2397C18.6442 10.8002 18.8813 11.2555 18.6493 11.5869L11.7097 21.5007C11.4293 21.9012 10.8 21.7029 10.8 21.214V14.5002C10.8 14.445 10.7553 14.4002 10.7 14.4002H5.71089C5.31634 14.4002 5.07723 13.9646 5.28905 13.6318Z"
  //         stroke="#888"
  //         strokeWidth="2"
  //       />
  //     </svg>,
  //   ],
  // },
  {
    title: "Clients",
    icon: <IoNewspaperOutline className="text-2xl" key={"4"} />,
    route: "/clients",
    temp_icon: [
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={505}
      >
        <path
          d="M2.3999 21.6L2.40031 17.9996C2.40053 16.0116 4.01224 14.4 6.00031 14.4H13.1998M16.1999 17.4L17.3999 18.6L21.5999 14.4M17.3999 2.40002C18.8561 3.2163 19.7999 4.5249 19.7999 6.00002C19.7999 7.47515 18.8561 8.78375 17.3999 9.60002M14.3999 6.00002C14.3999 7.98825 12.7881 9.60002 10.7999 9.60002C8.81167 9.60002 7.1999 7.98825 7.1999 6.00002C7.1999 4.0118 8.81167 2.40002 10.7999 2.40002C12.7881 2.40002 14.3999 4.0118 14.3999 6.00002Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          // strokeOpacity={0.64}
          strokeLinejoin="round"
        />
      </svg>,
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        key={510}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.3999 21.6L2.40031 17.9996C2.40053 16.0116 4.01224 14.4 6.00031 14.4H13.1998M16.1999 17.4L17.3999 18.6L21.5999 14.4M17.3999 2.40002C18.8561 3.2163 19.7999 4.5249 19.7999 6.00002C19.7999 7.47515 18.8561 8.78375 17.3999 9.60002M14.3999 6.00002C14.3999 7.98825 12.7881 9.60002 10.7999 9.60002C8.81167 9.60002 7.1999 7.98825 7.1999 6.00002C7.1999 4.0118 8.81167 2.40002 10.7999 2.40002C12.7881 2.40002 14.3999 4.0118 14.3999 6.00002Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity={0.64}
          strokeLinejoin="round"
        />
      </svg>,
    ],
  },
  {
    title: "Dashboards",
    icon: <IoNewspaperOutline className="text-2xl" key={"4"} />,
    route: "/dashboards",
    temp_icon: [
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        key={506}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.50059 14.0003L10.7006 9.80032L13.7006 12.8003L17.3006 9.20032M4.4 21.2001C3.07451 21.2001 2 20.1256 2 18.8001V4.40012C2 3.07464 3.07452 2.00012 4.4 2.00012H18.8C20.1255 2.00012 21.2 3.07464 21.2 4.40012V18.8001C21.2 20.1256 20.1255 21.2001 18.8 21.2001H4.4Z"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>,
      <svg
        width="22"
        key={507}
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.50059 14.0003L10.7006 9.80032L13.7006 12.8003L17.3006 9.20032M4.4 21.2001C3.07451 21.2001 2 20.1256 2 18.8001V4.40012C2 3.07464 3.07452 2.00012 4.4 2.00012H18.8C20.1255 2.00012 21.2 3.07464 21.2 4.40012V18.8001C21.2 20.1256 20.1255 21.2001 18.8 21.2001H4.4Z"
          stroke="#888"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>,
    ],
  },
  {
    title: "Users",
    icon: <CiWallet className="text-2xl" />,
    route: "/users",
    temp_icon: [
      <svg
        width="22"
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        key={1}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 19V17C21 15.1362 19.7252 13.5701 18 13.126M14.5 1.29076C15.9659 1.88415 17 3.32131 17 5C17 6.67869 15.9659 8.11585 14.5 8.70924M16 19C16 17.1362 16 16.2044 15.6955 15.4693C15.2895 14.4892 14.5108 13.7105 13.5307 13.3045C12.7956 13 11.8638 13 10 13H7C5.13623 13 4.20435 13 3.46927 13.3045C2.48915 13.7105 1.71046 14.4892 1.30448 15.4693C1 16.2044 1 17.1362 1 19M12.5 5C12.5 7.20914 10.7091 9 8.5 9C6.29086 9 4.5 7.20914 4.5 5C4.5 2.79086 6.29086 1 8.5 1C10.7091 1 12.5 2.79086 12.5 5Z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>,
      <svg
        width="22"
        key={1}
        height="20"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 19V17C21 15.1362 19.7252 13.5701 18 13.126M14.5 1.29076C15.9659 1.88415 17 3.32131 17 5C17 6.67869 15.9659 8.11585 14.5 8.70924M16 19C16 17.1362 16 16.2044 15.6955 15.4693C15.2895 14.4892 14.5108 13.7105 13.5307 13.3045C12.7956 13 11.8638 13 10 13H7C5.13623 13 4.20435 13 3.46927 13.3045C2.48915 13.7105 1.71046 14.4892 1.30448 15.4693C1 16.2044 1 17.1362 1 19M12.5 5C12.5 7.20914 10.7091 9 8.5 9C6.29086 9 4.5 7.20914 4.5 5C4.5 2.79086 6.29086 1 8.5 1C10.7091 1 12.5 2.79086 12.5 5Z"
          stroke="white"
          strokeOpacity="0.64"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>,
    ],
  },
];

const Leftbar = ({ loading = false }) => {
  const { criticalNotificationsLength, alertsLength, showLeftMenu } =
    useContext(Context);
  const [show, setShow] = useState(false);

  let settingRoutes = [
    {
      title: `Alerts (${criticalNotificationsLength + alertsLength})`,
      route: "/alerts",
      icon: <IoIosHelpCircleOutline className="text-2xl" />,
      temp_icon: [
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          key={502}
        >
          <path
            d="M12 12.9V8.41447M12 16.2248V16.2642M17.6699 20H6.33007C4.7811 20 3.47392 18.9763 3.06265 17.5757C2.88709 16.9778 3.10281 16.3551 3.43276 15.8249L9.10269 5.60102C10.4311 3.46632 13.5689 3.46633 14.8973 5.60103L20.5672 15.8249C20.8972 16.3551 21.1129 16.9778 20.9373 17.5757C20.5261 18.9763 19.2189 20 17.6699 20Z"
            stroke="#eed202"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>,
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          key={503}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12.9V8.41447M12 16.2248V16.2642M17.6699 20H6.33007C4.7811 20 3.47392 18.9763 3.06265 17.5757C2.88709 16.9778 3.10281 16.3551 3.43276 15.8249L9.10269 5.60102C10.4311 3.46632 13.5689 3.46633 14.8973 5.60103L20.5672 15.8249C20.8972 16.3551 21.1129 16.9778 20.9373 17.5757C20.5261 18.9763 19.2189 20 17.6699 20Z"
            stroke="#eed202"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>,
      ],
    },
    {
      title: "Settings",
      icon: <CiSettings className="text-2xl" />,
      route: "/settings",
      temp_icon: [
        <svg
          width="24"
          height="24"
          key={1}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.39504 19.3711L9.97949 20.6856C10.1532 21.0768 10.4368 21.4093 10.7957 21.6426C11.1547 21.8759 11.5736 22.0001 12.0017 22C12.4298 22.0001 12.8488 21.8759 13.2077 21.6426C13.5667 21.4093 13.8502 21.0768 14.0239 20.6856L14.6084 19.3711C14.8164 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5677 17.8941 17.0784 17.9478L18.5084 18.1C18.934 18.145 19.3636 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8714 16.635 20.9735 16.2103 20.951 15.7829C20.9285 15.3555 20.7825 14.9438 20.5306 14.5978L19.6839 13.4344C19.3825 13.0171 19.2214 12.5148 19.2239 12C19.2238 11.4866 19.3864 10.9864 19.6884 10.5711L20.535 9.40778C20.7869 9.06175 20.933 8.65007 20.9554 8.22267C20.9779 7.79528 20.8759 7.37054 20.6617 7C20.4478 6.62923 20.1309 6.32849 19.7495 6.13423C19.3681 5.93997 18.9385 5.86053 18.5128 5.90556L17.0828 6.05778C16.5722 6.11141 16.0576 6.00212 15.6128 5.74556C15.1699 5.48825 14.8199 5.09736 14.6128 4.62889L14.0239 3.31444C13.8502 2.92317 13.5667 2.59072 13.2077 2.3574C12.8488 2.12408 12.4298 1.99993 12.0017 2C11.5736 1.99993 11.1547 2.12408 10.7957 2.3574C10.4368 2.59072 10.1532 2.92317 9.97949 3.31444L9.39504 4.62889C9.18797 5.09736 8.83792 5.48825 8.39504 5.74556C7.95026 6.00212 7.43571 6.11141 6.92504 6.05778L5.4906 5.90556C5.06493 5.86053 4.63534 5.93997 4.25391 6.13423C3.87249 6.32849 3.55561 6.62923 3.34171 7C3.12753 7.37054 3.02549 7.79528 3.04798 8.22267C3.07046 8.65007 3.2165 9.06175 3.46838 9.40778L4.31504 10.5711C4.61698 10.9864 4.77958 11.4866 4.77949 12C4.77958 12.5134 4.61698 13.0137 4.31504 13.4289L3.46838 14.5922C3.2165 14.9382 3.07046 15.3499 3.04798 15.7773C3.02549 16.2047 3.12753 16.6295 3.34171 17C3.55582 17.3706 3.87274 17.6712 4.25411 17.8654C4.63548 18.0596 5.06496 18.1392 5.4906 18.0944L6.9206 17.9422C7.43127 17.8886 7.94581 17.9979 8.3906 18.2544C8.83513 18.511 9.18681 18.902 9.39504 19.3711Z"
            stroke="white"
            strokeOpacity="0.64"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9999 15C13.6568 15 14.9999 13.6569 14.9999 12C14.9999 10.3431 13.6568 9 11.9999 9C10.3431 9 8.99992 10.3431 8.99992 12C8.99992 13.6569 10.3431 15 11.9999 15Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.64"
          />
        </svg>,
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          key={1}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.39504 19.3711L9.97949 20.6856C10.1532 21.0768 10.4368 21.4093 10.7957 21.6426C11.1547 21.8759 11.5736 22.0001 12.0017 22C12.4298 22.0001 12.8488 21.8759 13.2077 21.6426C13.5667 21.4093 13.8502 21.0768 14.0239 20.6856L14.6084 19.3711C14.8164 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5677 17.8941 17.0784 17.9478L18.5084 18.1C18.934 18.145 19.3636 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8714 16.635 20.9735 16.2103 20.951 15.7829C20.9285 15.3555 20.7825 14.9438 20.5306 14.5978L19.6839 13.4344C19.3825 13.0171 19.2214 12.5148 19.2239 12C19.2238 11.4866 19.3864 10.9864 19.6884 10.5711L20.535 9.40778C20.7869 9.06175 20.933 8.65007 20.9554 8.22267C20.9779 7.79528 20.8759 7.37054 20.6617 7C20.4478 6.62923 20.1309 6.32849 19.7495 6.13423C19.3681 5.93997 18.9385 5.86053 18.5128 5.90556L17.0828 6.05778C16.5722 6.11141 16.0576 6.00212 15.6128 5.74556C15.1699 5.48825 14.8199 5.09736 14.6128 4.62889L14.0239 3.31444C13.8502 2.92317 13.5667 2.59072 13.2077 2.3574C12.8488 2.12408 12.4298 1.99993 12.0017 2C11.5736 1.99993 11.1547 2.12408 10.7957 2.3574C10.4368 2.59072 10.1532 2.92317 9.97949 3.31444L9.39504 4.62889C9.18797 5.09736 8.83792 5.48825 8.39504 5.74556C7.95026 6.00212 7.43571 6.11141 6.92504 6.05778L5.4906 5.90556C5.06493 5.86053 4.63534 5.93997 4.25391 6.13423C3.87249 6.32849 3.55561 6.62923 3.34171 7C3.12753 7.37054 3.02549 7.79528 3.04798 8.22267C3.07046 8.65007 3.2165 9.06175 3.46838 9.40778L4.31504 10.5711C4.61698 10.9864 4.77958 11.4866 4.77949 12C4.77958 12.5134 4.61698 13.0137 4.31504 13.4289L3.46838 14.5922C3.2165 14.9382 3.07046 15.3499 3.04798 15.7773C3.02549 16.2047 3.12753 16.6295 3.34171 17C3.55582 17.3706 3.87274 17.6712 4.25411 17.8654C4.63548 18.0596 5.06496 18.1392 5.4906 18.0944L6.9206 17.9422C7.43127 17.8886 7.94581 17.9979 8.3906 18.2544C8.83513 18.511 9.18681 18.902 9.39504 19.3711Z"
            strokeOpacity="0.64"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9999 15C13.6568 15 14.9999 13.6569 14.9999 12C14.9999 10.3431 13.6568 9 11.9999 9C10.3431 9 8.99992 10.3431 8.99992 12C8.99992 13.6569 10.3431 15 11.9999 15Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.64"
            strokeLinejoin="round"
          />
        </svg>,
      ],
    },
    {
      title: "Help",
      icon: <IoIosHelpCircleOutline className="text-2xl" />,
      temp_icon: [
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeOpacity="0.64"
          fill="none"
          key={1}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="white"
            strokeOpacity="0.64"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>,
        <svg
          width="24"
          height="24"
          key={1}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.64"
          />
        </svg>,
      ],
    },
  ];

  return (
    <div
      className={`bg-main md:block ${
        showLeftMenu ? "block" : "hidden"
      } md:relative absolute w-[55%] md:w-[15%] text-white h-full border-r border-r-white/20`}
    >
      <HelpPage showSubscribe={show} setShowSubscribe={setShow} />
      <div className="w-[120px] h-[100px] rounded-full bg-[#1664FF]/40 absolute left-[-2vw] top-[15vh]"></div>
      <div className="w-[60px] h-[50px] rounded-full bg-[#1664FF]/50 absolute right-2 bottom-[1vh]"></div>
      <div className="w-full h-full absolute top-0 left-0 py-3 md:py-5 flex flex-col items-center justify-between backdrop-blur-3xl z-10">
        <div className="w-10/12 h-full flex flex-col items-center justify-between md:pb-6">
          <div className="w-full">
            {loading ? (
              <div className="flex items-center">
                <div className="bg-gray-300 w-[10vw] md:w-[2vw] h-[10vw] md:h-[2vw] animate-pulse" />
                <div className="ml-3">
                  <div className="bg-gray-300 h-6 w-24 animate-pulse" />
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="w-[10vw] md:w-[2vw]"
                />
                <h1 className="mainText18 font-semibold uppercase tracking-wider ml-3">
                  sightshark
                </h1>
              </div>
            )}
            <div className="my-8 w-full">
              {mainRoutes?.map((e, i) => {
                return <Block e={e} key={i} loading={loading} />;
              })}
            </div>
          </div>
          <div className="w-full">
            <div className="">
              {settingRoutes?.map((e, i) => {
                return (
                  <NewwBlock
                    e={e}
                    key={i}
                    setShow={setShow}
                    show={show}
                    loading={loading}
                  />
                );
              })}
            </div>
            <div className="gradient-line my-4"></div>
            <LogoutBtn loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

const LogoutBtn = ({ loading }) => {
  const history = useRouter();
  const { setShowLeftMenu } = useContext(Context);

  return loading ? (
    <div className="flex items-center py-2 rounded-xl cursor-pointer text-[#D93F21]">
      <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#D93F21]/10 to-[#D93F21]/20 w-9 min-[1600px]:w-12 aspect-square p-2">
        <div className="bg-gray-300 w-6 h-6 rounded-full animate-pulse" />
      </div>
      <div className="ml-4 min-[1600px]:text-lg text-[15px]">
        <div className="bg-gray-300 h-4 w-24 animate-pulse" />
      </div>
    </div>
  ) : (
    <div
      className={`flex items-center py-2 rounded-xl cursor-pointer text-[#D93F21]`}
      onClick={() => {
        Cookies.remove("token");
        history.push("/");
        setShowLeftMenu(false);
      }}
    >
      <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#D93F21]/10 to-[#D93F21]/20 w-9 min-[1600px]:w-12 aspect-square p-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
            stroke="#D93F21"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="ml-4 min-[1600px]:text-lg text-[15px]">Log Out</p>
    </div>
  );
};

const NewwBlock = ({ e, setShow, show, loading }) => {
  const history = useRouter();
  const { setShowLeftMenu } = useContext(Context);

  return loading ? (
    <div className="flex items-center py-2 rounded-xl cursor-pointer text-white">
      <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/20 w-9 min-[1600px]:w-12 aspect-square p-2">
        <div className="bg-gray-300 w-6 h-6 rounded-full animate-pulse" />
      </div>
      <div className="ml-4 min-[1600px]:text-lg text-[15px]">
        <div className="bg-gray-300 h-4 w-24 animate-pulse" />
      </div>
    </div>
  ) : (
    <div
      className={`flex items-center py-2 rounded-xl cursor-pointer text-white`}
      onClick={() => {
        setShowLeftMenu(false);
        if (e?.route) {
          history.push(e?.route);
        } else {
          setShow(!show);
        }
      }}
    >
      <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/20 w-9 min-[1600px]:w-12 aspect-square p-2">
        {e?.temp_icon[1]}
      </div>
      <p className="ml-4 min-[1600px]:text-lg text-[15px]">{e?.title}</p>
    </div>
  );
};

const Block = ({ e, loading }) => {
  const { setShowLeftMenu } = useContext(Context);
  const pathname = usePathname();
  const history = useRouter();
  const [hover, setHover] = useState(false);

  return loading ? (
    <div className="flex items-center rounded-lg cursor-pointer px-3 min-[1600px]:py-3 py-2 mb-2 min-[1600px]:text-lg text-[15px] text-gray-400 hover:text-white transition-all">
      <div className="bg-gray-300 w-6 h-6 rounded-full animate-pulse" />
      <div className="ml-4 bg-gray-300 h-4 w-24 animate-pulse" />
    </div>
  ) : (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex items-center rounded-lg cursor-pointer px-3 min-[1600px]:py-3 py-2 mb-2 min-[1600px]:text-lg text-[15px] ${
        pathname.includes(e?.route)
          ? "bg-[#898989]/15 border border-gray-200/5"
          : "text-gray-400"
      } hover:text-white transition-all`}
      onClick={() => {
        if (e?.route) {
          history.push(e?.route);
          setShowLeftMenu(false);
        }
      }}
    >
      <span className="">
        {pathname.includes(e?.route)
          ? e?.temp_icon[0]
          : hover
          ? e?.temp_icon[0]
          : e?.temp_icon[1]}
      </span>
      <p className="ml-4">{e?.title}</p>
    </div>
  );
};

export default Leftbar;
