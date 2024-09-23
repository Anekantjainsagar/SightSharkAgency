import Image from "next/image";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const AgencyDetails = () => {
  return (
    <div className="border border-gray-500/5 h-[88vh] p-4 w-[30%] rounded-lg flex flex-col items-center justify-center">
      <Image
        width={1000}
        height={1000}
        src="/Agency/individual/logo.png"
        alt="Agency logo"
        className="w-[60px] aspect-square border border-gray-200/30 rounded-full"
      />
      <h3 className="mainLogoSize">Prowiz Analytics</h3>
      <div className="w-full mb-4 mt-2">
        {[
          {
            img: (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3333 10.3335H15L12.5 17.8335L7.49999 2.8335L4.99999 10.3335H1.66666"
                  stroke="#B2B4BA"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Status",
            value: "Active",
          },
          {
            img: (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49999 14.5001H5.83332C3.53214 14.5001 1.66666 12.6346 1.66666 10.3334C1.66666 8.03223 3.53214 6.16675 5.83332 6.16675H7.49999M12.5 14.5001H14.1667C16.4678 14.5001 18.3333 12.6346 18.3333 10.3334C18.3333 8.03223 16.4678 6.16675 14.1667 6.16675H12.5M5.83332 10.3334L14.1667 10.3334"
                  stroke="#B2B4BA"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Website",
            value: "www.prowiz.io",
          },
          {
            img: (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 10.7502C11.3807 10.7502 12.5 9.63096 12.5 8.25024C12.5 6.86953 11.3807 5.75024 10 5.75024C8.6193 5.75024 7.50001 6.86953 7.50001 8.25024C7.50001 9.63096 8.6193 10.7502 10 10.7502Z"
                  stroke="#B2B4BA"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 18.6669C11.6667 15.3336 16.6667 13.1821 16.6667 8.66691C16.6667 4.98501 13.6819 2.00024 10 2.00024C6.31811 2.00024 3.33334 4.98501 3.33334 8.66691C3.33334 13.1821 8.33334 15.3336 10 18.6669Z"
                  stroke="#B2B4BA"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Location",
            value: "Chandigarh, India",
          },
          {
            img: (
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 8.66691H2.5M13.3333 2.00024V5.33358M6.66667 2.00024V5.33358M6.5 18.6669H13.5C14.9001 18.6669 15.6002 18.6669 16.135 18.3944C16.6054 18.1547 16.9878 17.7723 17.2275 17.3019C17.5 16.7671 17.5 16.067 17.5 14.6669V7.66691C17.5 6.26678 17.5 5.56671 17.2275 5.03193C16.9878 4.56153 16.6054 4.17908 16.135 3.93939C15.6002 3.66691 14.9001 3.66691 13.5 3.66691H6.5C5.09987 3.66691 4.3998 3.66691 3.86502 3.93939C3.39462 4.17908 3.01217 4.56153 2.77248 5.03193C2.5 5.56671 2.5 6.26678 2.5 7.66691V14.6669C2.5 16.067 2.5 16.7671 2.77248 17.3019C3.01217 17.7723 3.39462 18.1547 3.86502 18.3944C4.3998 18.6669 5.09987 18.6669 6.5 18.6669Z"
                  stroke="#B2B4BA"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Deployment Date",
            value: "15th August, 2024",
          },
          {
            img: (
              <svg
                width="16"
                height="19"
                viewBox="0 0 16 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.41835 17.3458C7.60284 17.4534 7.69509 17.5072 7.82528 17.5352C7.92631 17.5568 8.07371 17.5568 8.17474 17.5352C8.30493 17.5072 8.39718 17.4534 8.58167 17.3458C10.205 16.3987 14.6667 13.4238 14.6667 9.33339V6.16672C14.6667 5.27181 14.6667 4.82435 14.5287 4.50672C14.3885 4.18389 14.2488 4.01215 13.9613 3.80915C13.6784 3.60941 13.1239 3.49408 12.0148 3.26341C10.7923 3.00917 9.85358 2.55009 8.99533 1.88616C8.58377 1.56778 8.37799 1.40859 8.21696 1.36517C8.04704 1.31936 7.95298 1.31936 7.78306 1.36517C7.62203 1.40859 7.41625 1.56778 7.00469 1.88616C6.14644 2.55009 5.20768 3.00917 3.98526 3.26341C2.87616 3.49408 2.3216 3.60941 2.03872 3.80915C1.75119 4.01215 1.6115 4.18389 1.47129 4.50672C1.33334 4.82435 1.33334 5.27181 1.33334 6.16672V9.33339C1.33334 13.4238 5.79498 16.3987 7.41835 17.3458Z"
                  stroke="#B2B4BA"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Warranty Period",
            value: "6 Months",
          },
        ].map((e, i) => {
          return (
            <div
              key={i}
              className={`w-full flex items-center justify-between text-base p-3 border border-gray-500/15 ${
                i == 0 && "rounded-t-xl"
              } ${i == 4 && "rounded-b-xl"}`}
            >
              <div className="flex items-center">
                {e?.img}
                <h6 className="text-textGrey ml-3">{e?.title}</h6>
              </div>
              <div
                className={`${
                  e?.title == "Status" ? "text-[#12B76A]" : "text-[#ECECED]"
                } flex items-center mainText14`}
              >
                {e?.title == "Status" && (
                  <div className="w-[10px] mr-2 h-[10px] rounded-full bg-[#12B76A]"></div>
                )}
                <span>{e?.value}</span>
              </div>
            </div>
          );
        })}
      </div>{" "}
      <div className="border rounded-xl w-full border-gray-500/15">
        <h5 className="w-full p-3 border-b border-b-gray-500/15">
          Key Contact Info
        </h5>
        {[
          {
            img: "/Agency/individual/icons/status.png",
            title: "Name",
            value: "Varun Sethi",
          },
          {
            img: "/Agency/individual/icons/website.png",
            title: "Designation",
            value: "Co-Founder",
          },
          {
            img: "/Agency/individual/icons/location.png",
            title: "Email Address",
            value: "varun@prowiz.io",
          },
          {
            img: "/Agency/individual/icons/deployment.png",
            title: "Phone Number",
            value: "+91 1234567890",
          },
        ].map((e, i) => {
          return (
            <div
              key={i}
              className="w-full flex items-center justify-between px-4 my-3.5"
            >
              <h6 className="text-textGrey text-base">{e?.title}</h6>
              <p className={`text-[#ECECED] flex items-center mainText14`}>
                {e?.value}
              </p>
            </div>
          );
        })}{" "}
      </div>
      <div className="border rounded-xl w-full border-gray-500/15 mt-4">
        <h5 className="w-full p-3 border-b border-b-gray-500/15">
          License Limit
        </h5>
        <div className="w-4/12 mx-auto my-4 relative">
          <p className="text-center text-xl absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-semibold">
            15 <span className="text-sm font-normal">out of</span> 50
          </p>
          <PieChart
            data={[
              { title: "One", value: 50, color: "#FFAE4C" },
              { title: "Two", value: 15, color: "#3836FF" },
            ]}
            lineWidth={25}
          />
        </div>
      </div>
    </div>
  );
};

export default AgencyDetails;
