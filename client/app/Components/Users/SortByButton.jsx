"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Context from "../../Context/Context";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortByButton = ({ sort_by_options }) => {
  const { getUsers } = useContext(Context);
  const [showSortBy, setShowSortBy] = useState(false);
  const sortRef = useRef(null);
  const [lastClicked, setLastClicked] = useState({
    created_at: false,
    first_name: false,
    status: false,
    last_online: false,
    access: false,
  });

  const handleClickOutside = (event) => {
    if (sortRef.current && !sortRef.current.contains(event.target)) {
      setShowSortBy(false);
    }
  };

  useEffect(() => {
    if (showSortBy) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortBy]);

  return (
    <button
      ref={sortRef}
      className="bg-gray-700 relative px-6 py-2.5 min-[1600px]:py-3 rounded-xl ml-4 text-sm min-[1600px]:text-base flex items-center gap-x-2 border border-gray-200/5"
      onClick={() => setShowSortBy(!showSortBy)}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.83333 3.33337V16.6667M5.83333 16.6667L2.5 13.3334M5.83333 16.6667L9.16667 13.3334M14.1667 16.6667V3.33337M14.1667 3.33337L10.8333 6.66671M14.1667 3.33337L17.5 6.66671"
          stroke="#ECECED"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Sort By
      {showSortBy && (
        <div className="absolute right-0 top-[56px] rounded-xl w-[15vw] bg-main z-50 small-scroller h-[15vh] overflow-y-auto">
          {sort_by_options?.map((e, i) => (
            <p
              key={i}
              onClick={(event) => {
                event.stopPropagation();
                if (e === sort_by_options[0]) {
                  getUsers(undefined, e, lastClicked?.created_at);
                  setLastClicked({
                    ...lastClicked,
                    created_at: !lastClicked?.created_at,
                  });
                } else if (e === sort_by_options[1]) {
                  getUsers(undefined, e, lastClicked?.first_name);
                  setLastClicked({
                    ...lastClicked,
                    first_name: !lastClicked?.first_name,
                  });
                } else if (e === sort_by_options[2]) {
                  getUsers(undefined, e, lastClicked?.status);
                  setLastClicked({
                    ...lastClicked,
                    status: !lastClicked?.status,
                  });
                } else if (e === sort_by_options[3]) {
                  getUsers(undefined, e, lastClicked?.last_online);
                  setLastClicked({
                    ...lastClicked,
                    last_online: !lastClicked?.last_online,
                  });
                } else if (e === sort_by_options[4]) {
                  getUsers(undefined, e, lastClicked?.access);
                  setLastClicked({
                    ...lastClicked,
                    access: !lastClicked?.access,
                  });
                }
                setShowSortBy(false);
              }}
              className="text-gray-200 py-2.5 flex justify-center hover:text-gray-300 rounded-xl transition-all hover:bg-gray-700/40"
            >
              {e[0]?.toUpperCase() + e?.slice(1)?.replaceAll("_", " ")}
              <span className="ml-2 text-xl">
                {lastClicked[e] ? <FaSortAmountDown /> : <FaSortAmountUp />}
              </span>
            </p>
          ))}
        </div>
      )}
    </button>
  );
};

export default SortByButton;
