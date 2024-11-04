import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DeleteAgency from "../Agencies/DeleteAgency";

const AgencyDetailsBlock = ({ status, percentage, data }) => {
  const history = useRouter();
  const [deleteAgency, setDeleteAgency] = useState(false);

  let name = data?.client_name?.replaceAll(" ", "-");

  return (
    <>
      <DeleteAgency
        showSubscribe={deleteAgency}
        setShowSubscribe={setDeleteAgency}
        name={data?.client_name}
        id={data?.client_id}
      />
      <div
        onClick={() => {
          history.push(`/clients/${name}`);
        }}
        className="py-4 px-7 border-gray-200/5 border-y grid agencyBlockGrid items-center cursor-pointer text-textGrey text-sm min-[1600px]:text-base"
      >
        <div className="inline-flex items-start">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="before:content[''] peer relative h-6 w-6 rounded-md cursor-pointer appearance-none border-2 border-[#343745] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-16 before:w-16 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-gray-800 checked:before:bg-gray-800 hover:before:opacity-10"
              id="check"
            />
            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
        </div>
        <h5 className="min-[1600px]:ml-0 ml-2">{data?.client_name}</h5>
        <div className="w-full flex items-center justify-center">
          <div
            className={`status-${data?.status?.toLowerCase()} w-fit p-2 border-2 rounded-2xl`}
          ></div>
        </div>
        <div className="flex items-center justify-start pl-10">
          <Image
            src="/Agency/Avatar.png"
            width={1000}
            height={1000}
            className="w-7 min-[1600px]:w-9 aspect-square rounded-full"
            alt="Key contact"
          />
          <p className="ml-2 min-[1600px]:ml-4">{data?.key_contact_name}</p>
        </div>
        <p className="break-words w-full text-center">
          {data?.key_contact_email_address}
        </p>
        <p className="text-center">
          {data?.deployment_date
            ? new Date(data?.deployment_date).toString()?.slice(4, 21)
            : ""}
        </p>
        <div className="flex items-center justify-center">
          <div className="bg-[#343745] w-[6vw] rounded-full h-3">
            <div
              className={`bg-white text-transparent rounded-full h-full text-xs`}
              style={{ width: `${percentage}%` }}
            >
              .
            </div>
          </div>
          <p className="ml-4">{percentage}%</p>
        </div>
        <div className="flex items-center justify-end">
          <div className="mr-5">
            <svg
              viewBox="0 0 20 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="scale-110 w-4 min-[1600px]:w-5 h-4 min-[1600px]:h-5"
              onClick={() => {
                history.push(`/clients/${name}`);
              }}
            >
              <path
                d="M2.01677 7.59434C1.90328 7.41464 1.84654 7.32479 1.81477 7.1862C1.79091 7.0821 1.79091 6.91794 1.81477 6.81384C1.84654 6.67525 1.90328 6.5854 2.01677 6.40571C2.95461 4.92072 5.74617 1.16669 10.0003 1.16669C14.2545 1.16669 17.0461 4.92072 17.9839 6.4057C18.0974 6.5854 18.1541 6.67525 18.1859 6.81384C18.2098 6.91794 18.2098 7.0821 18.1859 7.1862C18.1541 7.32479 18.0974 7.41464 17.9839 7.59434C17.0461 9.07932 14.2545 12.8334 10.0003 12.8334C5.74617 12.8334 2.95461 9.07932 2.01677 7.59434Z"
                stroke="#85888E"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.0003 9.50002C11.381 9.50002 12.5003 8.38073 12.5003 7.00002C12.5003 5.61931 11.381 4.50002 10.0003 4.50002C8.61962 4.50002 7.50034 5.61931 7.50034 7.00002C7.50034 8.38073 8.61962 9.50002 10.0003 9.50002Z"
                stroke="#85888E"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="mr-4">
            <svg
              className="w-4 min-[1600px]:w-5 h-4 min-[1600px]:h-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={(e) => {
                e.stopPropagation();
                history.push("/agencies/clientspha-solutions/edit-profile");
              }}
            >
              <path
                d="M9.1665 3.33332H5.6665C4.26637 3.33332 3.56631 3.33332 3.03153 3.6058C2.56112 3.84549 2.17867 4.22794 1.93899 4.69834C1.6665 5.23312 1.6665 5.93319 1.6665 7.33332V14.3333C1.6665 15.7335 1.6665 16.4335 1.93899 16.9683C2.17867 17.4387 2.56112 17.8212 3.03153 18.0608C3.56631 18.3333 4.26637 18.3333 5.6665 18.3333H12.6665C14.0666 18.3333 14.7667 18.3333 15.3015 18.0608C15.7719 17.8212 16.1543 17.4387 16.394 16.9683C16.6665 16.4335 16.6665 15.7335 16.6665 14.3333V10.8333M6.66648 13.3333H8.06193C8.46959 13.3333 8.67341 13.3333 8.86522 13.2873C9.03528 13.2464 9.19786 13.1791 9.34698 13.0877C9.51517 12.9847 9.6593 12.8405 9.94755 12.5523L17.9165 4.58332C18.6069 3.89296 18.6069 2.77368 17.9165 2.08332C17.2261 1.39296 16.1069 1.39296 15.4165 2.08332L7.44753 10.0523C7.15928 10.3405 7.01515 10.4847 6.91208 10.6528C6.8207 10.802 6.75336 10.9645 6.71253 11.1346C6.66648 11.3264 6.66648 11.5302 6.66648 11.9379V13.3333Z"
                stroke="#85888E"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <svg
              className="w-4 min-[1600px]:w-5 h-4 min-[1600px]:h-5"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteAgency(!deleteAgency);
              }}
            >
              <g filter="url(#filter0_d_23_1215)">
                <path
                  d="M13.3333 5.00002V4.33335C13.3333 3.39993 13.3333 2.93322 13.1517 2.5767C12.9919 2.2631 12.7369 2.00813 12.4233 1.84834C12.0668 1.66669 11.6001 1.66669 10.6667 1.66669H9.33333C8.39991 1.66669 7.9332 1.66669 7.57668 1.84834C7.26308 2.00813 7.00811 2.2631 6.84832 2.5767C6.66667 2.93322 6.66667 3.39993 6.66667 4.33335V5.00002M8.33333 9.58335V13.75M11.6667 9.58335V13.75M2.5 5.00002H17.5M15.8333 5.00002V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9683C15.3212 17.4387 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4387 4.43915 16.9683C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00002"
                  stroke="#D93F21"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  shapeRendering="crispEdges"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_23_1215"
                  x="-2.3335"
                  y="0.833374"
                  width="24.667"
                  height="26.3333"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_23_1215"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_23_1215"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgencyDetailsBlock;
