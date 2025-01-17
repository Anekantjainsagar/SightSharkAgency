"use client";
import Image from "next/image";
import React, { useContext } from "react";
import MyTemplate from "./MyTemplate";
import Context from "@/app/Context/Context";
import axios from "axios";
import { BACKEND_URI } from "@/app/utils/url";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

const EditReportingTemplate = ({ original_data }) => {
  const { mainTemplates, assignedTemplates } = useContext(Context);

  return (
    <div className="flex items-start h-full justify-between mt-4">
      <div className="w-8/12 px-4 h-full small-scroller overflow-y-auto pb-2">
        <h4 className="text-lg font-medium text-gray-300 mb-2">My Templates</h4>{" "}
        {assignedTemplates?.length == 0 ? (
          <div className="w-full h-[80%] flex items-center justify-center text-lg text-gray-400">
            No Templates Assigned
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {assignedTemplates?.map((e, i) => {
              return (
                <AllTemplate
                  data={e}
                  key={i}
                  idx={i}
                  original_data={original_data}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="w-4/12 px-4 border-l border-gray-200/10 pb-2 h-full small-scroller overflow-y-auto">
        <h4 className="text-lg font-medium text-gray-300 mb-2">
          All Templates
        </h4>
        {mainTemplates?.map((e, i) => {
          return (
            <AllTemplate
              data={e}
              key={i}
              original_data={original_data}
              all={true}
            />
          );
        })}
      </div>
    </div>
  );
};

const AllTemplate = ({ data, original_data, all }) => {
  const { getAssignedTemplates, assignedTemplates } = useContext(Context);

  return (
    <div className="border border-gray-300/10 p-2.5 rounded-lg mb-2.5 relative cursor-pointer">
      <Image
        src={data?.template_image}
        alt={data?.template_name}
        width={1000}
        height={1000}
        className="rounded-lg"
      />
      <p className="text-center mt-1.5">{data?.template_name}</p>
      {assignedTemplates?.find((e) => e?.id === data?.id)?.id ? (
        !all && (
          <button
            className={`bg-red-500 aspect-square w-[1.5vw] rounded-full text-xl absolute right-2 top-2 cursor-pointer`}
            onClick={() => {
              axios
                .post(
                  `${BACKEND_URI}/template/assign-templates/`,
                  {
                    client_id: original_data?.client_id,
                    template_ids: assignedTemplates
                      ?.filter((e) => e?.id != data?.id)
                      ?.map((e) => e?.id),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${getCookie("token")}`,
                    },
                  }
                )
                .then((res) => {
                  if (res.status == 200) {
                    toast.success("Templates unassigned successfully");
                    getAssignedTemplates(original_data?.client_id);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            -
          </button>
        )
      ) : (
        <button
          className={`bg-green-500 aspect-square w-[1.5vw] rounded-full text-xl absolute right-2 top-2 cursor-pointer`}
          onClick={() => {
            axios
              .post(
                `${BACKEND_URI}/template/assign-templates/`,
                {
                  client_id: original_data?.client_id,
                  template_ids: [
                    ...assignedTemplates?.map((e) => e?.id),
                    data?.id,
                  ],
                },
                {
                  headers: {
                    Authorization: `Bearer ${getCookie("token")}`,
                  },
                }
              )
              .then((res) => {
                if (res.status == 200) {
                  toast.success(res.data.msg);
                  getAssignedTemplates(original_data?.client_id);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

export default EditReportingTemplate;
