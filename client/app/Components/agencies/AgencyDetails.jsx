import Image from "next/image";

const AgencyDetails = () => {
  return (
    <div className="border border-gray-500/5 min-[1600px]:h-[88vh] p-4 w-[30%] rounded-lg flex flex-col items-center">
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
                <h6 className="text-textGrey text-sm min-[1600px]:text-base ml-3">
                  {e?.title}
                </h6>
              </div>
              <div
                className={`${
                  e?.title == "Status" ? "text-[#12B76A]" : "text-[#ECECED]"
                } flex items-center text-sm min-[1600px]:text-base`}
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
        <h5 className="w-full p-3 text-sm min-[1600px]:text-base border-b border-b-gray-500/15">
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
    </div>
  );
};

export default AgencyDetails;
