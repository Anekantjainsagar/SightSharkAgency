import Context from "@/app/Context/Context";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import AddDataSouces from "./AddDataSources";

function formatName(input) {
  return input
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const AgencyDetails = ({ data }) => {
  const { clientCreds, mainDataSource } = useContext(Context);
  const [addDataSouces, setAddDataSouces] = useState(false);

  return (
    <div className="border border-gray-500/15 h-fit p-4 w-[30%] rounded-lg flex flex-col items-center">
      <AddDataSouces
        showSubscribe={addDataSouces}
        setShowSubscribe={setAddDataSouces}
      />
      <Image
        width={1000}
        height={1000}
        src={
          data?.profile_picture
            ? data?.profile_picture
            : "/Agency/individual/logo.png"
        }
        alt="Agency logo"
        className="w-[60px] object-cover aspect-square border border-gray-200/30 rounded-full"
      />
      <h3 className="mainLogoSize">{data?.client_name}</h3>
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
            value:
              data?.status &&
              data?.status[0]?.toUpperCase() + data?.status.slice(1),
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
            value: data?.website,
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
            value: data?.location,
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
            title: "Onboarding Date",
            value: data?.created_at
              ? new Date(data?.created_at).toString()?.slice(4, 21)
              : "",
          },
        ].map((e, i) => {
          return (
            <div
              key={i}
              className={`w-full flex items-center justify-between text-base px-3 py-2 border border-gray-500/15 ${
                i == 0 && "rounded-t-xl"
              } ${i == 4 && "rounded-b-xl"}`}
            >
              <div className="flex items-center">
                {e?.img}
                <h6 className="text-textGrey text-sm min-[1600px]:text-base ml-3">
                  {e?.title}
                </h6>
              </div>
              <div
                className={`${
                  e?.title == "Status"
                    ? `status-text-${e?.value?.toLowerCase()}`
                    : "text-[#ECECED]"
                } flex items-center text-sm min-[1600px]:text-base`}
              >
                {e?.title == "Status" && (
                  <div
                    className={`w-[10px] mr-2 h-[10px] rounded-full status-${e?.value?.toLowerCase()}`}
                  ></div>
                )}
                {e?.title === "Website" ? (
                  <span
                    className="hover:underline cursor-pointer transition-all"
                    onClick={() => {
                      if (e?.value?.includes("http")) {
                        window.open(e?.value, "__blank");
                      } else {
                        toast.error("Invalid url");
                      }
                    }}
                  >
                    {e?.value?.slice(0, 25) + "..."}
                  </span>
                ) : (
                  <span>{e?.value}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>{" "}
      <div className="border rounded-xl w-full border-gray-500/15">
        <h5 className="w-full p-3 text-sm min-[1600px]:text-base border-b border-b-gray-500/15">
          Key Contact Info
        </h5>
        {[
          {
            img: "/Agency/individual/icons/status.png",
            title: "Name",
            value: data?.key_contact_name,
          },
          {
            img: "/Agency/individual/icons/website.png",
            title: "Designation",
            value: data?.key_contact_designation,
          },
          {
            img: "/Agency/individual/icons/location.png",
            title: "Email",
            value: data?.key_contact_email_address,
          },
          {
            img: "/Agency/individual/icons/deployment.png",
            title: "Phone Number",
            value: data?.key_contact_phone,
          },
        ].map((e, i) => {
          return (
            <div
              key={i}
              className="w-full flex items-center justify-between px-4 my-2.5"
            >
              <h6 className="text-textGrey text-sm min-[1600px]:text-base">
                {e?.title}
              </h6>
              <p
                className={`text-[#ECECED] flex items-center text-sm min-[1600px]:text-base`}
              >
                {e?.value}
              </p>
            </div>
          );
        })}{" "}
      </div>
      <div className="border rounded-xl w-full border-gray-500/15 mt-4">
        <div className="flex py-3 items-center justify-between w-full border-b border-b-gray-500/15">
          <h5 className="w-full pb-2 pl-3 text-sm min-[1600px]:text-base">
            Data Sources
          </h5>
          <button
            onClick={() => {
              setAddDataSouces(!addDataSouces);
            }}
            className="bg-newBlue p-2.5 mr-3 justify-center rounded-full flex items-center gap-x-2 my text-sm min-[1600px]:text-base"
          >
            <FaPlus className="text-sm" />
          </button>
        </div>
        <div className="m-3">
          {clientCreds?.data?.length > 0 ? (
            <div className="h-[25vh] bg-[#171C2A] rounded-lg">
              <div className="h-fit grid grid-cols-2 gap-y-5 p-2 min-[1600px]:p-4">
                {clientCreds?.data
                  ?.map((e) => {
                    return {
                      ...e,
                      img_link: mainDataSource?.find(
                        (event) => event?.name == e?.platform_name
                      )?.img_link,
                    };
                  })
                  ?.map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="flex items-center h-fit px-2 rounded-full"
                      >
                        <div className="flex rounded-lg items-center justify-center bg-gradient-to-b from-[#1664FF]/10 to-[#1664FF]/50 from-[75%] w-7 min-[1600px]:w-8 aspect-square p-1.5 mr-3">
                          <Image
                            src={e?.img_link}
                            alt={e?.img_link?.src}
                            width={1000}
                            height={1000}
                            className="object-contain"
                          />
                        </div>
                        <label
                          htmlFor={e?.platform_name}
                          className="text-sm min-[1600px]:text-base"
                        >
                          {formatName(e?.platform_name)}
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="bg-[#171C2A] h-[25vh] flex items-center justify-center rounded-lg p-3 min-[1600px]:p-4 text-center">
              No Data Sources Available Please Add some of the Data Sources
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencyDetails;
