import Image from "next/image";
import React from "react";
import MyTemplate from "./MyTemplate";

const EditReportingTemplate = ({ original_data }) => {
  return (
    <div className="flex items-start h-full justify-between mt-4">
      <div className="w-8/12 px-4 h-full small-scroller overflow-y-auto pb-2">
        <h4 className="text-lg font-medium text-gray-300 mb-2">My Templates</h4>{" "}
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: "Template",
              path: "/Agency/individual/templates/1.png",
            },
            {
              title: "Template",
              path: "/Agency/individual/templates/1.png",
            },
            {
              title: "Template",
              path: "/Agency/individual/templates/1.png",
            },
            {
              title: "Template",
              path: "/Agency/individual/templates/1.png",
            },
          ]?.map((e, i) => {
            return <MyTemplate data={e} key={i} idx={i} />;
          })}
        </div>
      </div>
      <div className="w-4/12 px-4 border-l border-gray-200/10 pb-2 h-full small-scroller overflow-y-auto">
        <h4 className="text-lg font-medium text-gray-300 mb-2">
          All Templates
        </h4>
        {[
          {
            title: "Template",
            path: "/Agency/individual/templates/1.png",
          },
          {
            title: "Template",
            path: "/Agency/individual/templates/1.png",
          },
        ]?.map((e, i) => {
          return <AllTemplate data={e} key={i} />;
        })}
      </div>
    </div>
  );
};

const AllTemplate = ({ data }) => {
  return (
    <div className="border border-gray-300/10 p-2.5 rounded-lg mb-2.5 relative cursor-pointer">
      <Image
        src={data?.path}
        alt={data?.title}
        width={1000}
        height={1000}
        className="rounded-lg"
      />
      <p className="text-center mt-1.5">{data?.title}</p>
      <button
        className={`bg-green-500 aspect-square w-[1.5vw] rounded-full text-xl absolute right-2 top-2 cursor-pointer`}
      >
        +
      </button>
    </div>
  );
};

export default EditReportingTemplate;
