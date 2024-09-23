"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import { usePathname } from "next/navigation";
import axios from "axios";
import { BACKEND_URI } from "../utils/url";
import Cookies from "js-cookie";

const State = (props) => {
  const pathname = usePathname();
  const [userData, setUserData] = useState();

  const checkToken = () => {
    axios
      .post(`${BACKEND_URI}/login/check-token`, {
        token: Cookies.get("token"),
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Context.Provider value={{ userData, setUserData, checkToken }}>
      {props.children}
    </Context.Provider>
  );
};

export default State;
