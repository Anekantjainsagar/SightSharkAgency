"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import Required from "../Utils/Required";

const customStyles = {
  overlay: { zIndex: 50 },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    width: "65vw",
    border: "none",
  },
};

const AddTemplates = ({ showSubscribe, setShowSubscribe }) => {
  const [data, setData] = useState({
    dataSources: [],
  });
  const fileInputRef = React.useRef(null);

  const handleFileChangeProfile = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  function closeModal() {
    setShowSubscribe(false);
  }

  return (
    <div className="z-50">
      <Toaster />
      <Modal
        isOpen={showSubscribe}
        onRequestCl2ose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative rounded-lg bg-main pt-10 text-white">
          <AiOutlineClose
            size={40}
            onClick={closeModal}
            className="absolute top-2 right-2 px-2 cursor-pointer"
          />
          <div className="px-[4vw] h-[40vh] pb-5 overflow-y-auto small-scroller w-full">
            <div className="grid grid-cols-4 gap-x-4">
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
          <div className="border-t border-t-gray-100/30 px-[5vw] w-full flex items-center justify-end py-6 mt-10 mainText20">
            <button
              onClick={() => {}}
              className={`text-white bg-newBlue w-[170px] h-12 rounded-lg`}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddTemplates;
