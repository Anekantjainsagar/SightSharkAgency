"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Context from "../../Context/Context";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const SortByButton = ({ sort_by_options }) => {
  const { getAgencies } = useContext(Context);
  const [showSortBy, setShowSortBy] = useState(false);
  const sortRef = useRef(null);
  const [recentClick, setRecentClick] = useState("created_at");
  const [lastClicked, setLastClicked] = useState({
    created_at: false,
    agency_name: false,
    status: false,
    deployment_date: false,
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
      className="bg-white/10 relative px-4 md:px-6 py-2 md:py-2.5 min-[1600px]:py-3 rounded-lg md:rounded-xl ml-2 md:ml-4 text-[12px] md:text-[13px] min-[1600px]:text-base flex items-center gap-x-2 border border-gray-200/5"
      onClick={() => setShowSortBy(!showSortBy)}
    >
      {!lastClicked[recentClick] ? (
        <FaSortAmountDown className="text-xs md:text-sm" />
      ) : (
        <FaSortAmountUp className="text-xs md:text-sm" />
      )}
      Sort By
      {showSortBy && (
        <div className="absolute right-0 top-[40px] border border-gray-50/10 md:top-[56px] rounded-lg md:rounded-xl w-[23vw] md:w-[12vw] bg-main z-50 small-scroller h-[10vh] md:h-[15vh] overflow-y-auto">
          {sort_by_options?.map((e, i) => (
            <p
              key={i}
              onClick={(event) => {
                event.stopPropagation();
                if (e === sort_by_options[0]) {
                  getAgencies(undefined, e, lastClicked?.created_at);
                  setLastClicked({
                    ...lastClicked,
                    created_at: !lastClicked?.created_at,
                  });
                } else if (e === sort_by_options[1]) {
                  getAgencies(undefined, e, lastClicked?.agency_name);
                  setLastClicked({
                    ...lastClicked,
                    agency_name: !lastClicked?.agency_name,
                  });
                } else if (e === sort_by_options[2]) {
                  getAgencies(undefined, e, lastClicked?.status);
                  setLastClicked({
                    ...lastClicked,
                    status: !lastClicked?.status,
                  });
                } else if (e === sort_by_options[3]) {
                  getAgencies(undefined, e, lastClicked?.deployment_date);
                  setLastClicked({
                    ...lastClicked,
                    deployment_date: !lastClicked?.deployment_date,
                  });
                }
                setRecentClick(e);
                setShowSortBy(false);
              }}
              className="text-gray-200 py-1.5 md:py-2 min-[1600px]:py-2.5 flex justify-center hover:text-gray-300 rounded-lg md:rounded-xl transition-all hover:bg-gray-700/40"
            >
              {e[0]?.toUpperCase() + e?.slice(1)?.replaceAll("_", " ")}
            </p>
          ))}
        </div>
      )}
    </button>
  );
};

export default SortByButton;
