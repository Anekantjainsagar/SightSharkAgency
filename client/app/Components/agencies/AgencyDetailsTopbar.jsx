"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const AgencyDetailsTopbar = ({ name }) => {
  const history = useRouter();
  const pathname = usePathname();

  return (
    <div className="h-[5vh] flex items-start">
      {[
        { title: "About", route: `/clients/${name}` },
        {
          title: "Edit Client",
          route: `/clients/${name}/edit-profile`,
        },
      ].map((e, i) => {
        return (
          <button
            key={i}
            className={`${
              pathname == e?.route
                ? "bg-newBlue"
                : "bg-transparent text-[#B2B4BA]"
            } py-2 px-6 min-[1600px]:text-base text-[13px] rounded-xl min-[1600px]:rounded-2xl mr-4`}
            onClick={() => {
              history.push(e?.route);
            }}
          >
            {e?.title}
          </button>
        );
      })}
    </div>
  );
};

export default AgencyDetailsTopbar;
