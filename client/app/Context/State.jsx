"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import { ADMIN_BACKEND_URI, BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";

const State = (props) => {
  const [userData, setUserData] = useState();
  const [users, setUsers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [agency_templates, setAgency_templates] = useState([]);
  const [mainDataSource, setMainDataSource] = useState();
  const [mainTemplates, setMainTemplates] = useState();
  const [dataSourceStructure, setDataSourceStructure] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedAgencies, setSelectedAgencies] = useState([]);

  const checkToken = () => {
    let cookie = getCookie("token");
    if (cookie?.length > 5) {
      try {
        axios
          .get(`${BACKEND_URI}/user/me`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setUserData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUsers = (grow, order_by = "created_at", type = "asc") => {
    let cookie = getCookie("token");
    let page = users?.current_page ? users?.current_page : 1;
    let limit = users?.limit ? users?.limit : 7;
    if (grow == "inc") {
      page++;
    } else if (grow == "dec") {
      page--;
    }

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/user/users?offset=${
              (page - 1) * limit
            }&limit=${limit}&sort_by=${order_by}&order=${
              type ? "asc" : "desc"
            }`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            if (res.data?.data?.length > 0) {
              setUsers(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAgencies = (grow, order_by = "created_at", type = "asc") => {
    let cookie = getCookie("token");
    let page = agencies?.current_page ? agencies?.current_page : 1;
    let limit = agencies?.limit ? agencies?.limit : 8;
    if (grow == "inc") {
      page++;
    } else if (grow == "dec") {
      page--;
    }

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/client/clients?offset=${
              (page - 1) * limit
            }&limit=${limit}&sort_by=${order_by}&order=${
              type ? "asc" : "desc"
            }`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then((res) => {
            if (res.data.data?.length > 0) {
              setAgencies(res.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getTemplates = (id) => {
    let cookie = getCookie("token");
    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(`${BACKEND_URI}/template/templates?agency_id=${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setAgency_templates(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getMainDataSources = (id) => {
    let cookie = getCookie("token");
    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(`${ADMIN_BACKEND_URI}/assign_script/platform?agency_id=${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then(async (res) => {
            const transformedPlatforms = res?.data?.platforms?.map(
              (platform) => {
                const [name, img_link] = Object.entries(platform)[0];
                return { name, img_link };
              }
            );

            setMainDataSource(transformedPlatforms);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getMainTemplates = (id) => {
    let cookie = getCookie("token");
    setMainTemplates([]);
    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(`${ADMIN_BACKEND_URI}/template/templates?agency_id=${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setMainTemplates(res.data.templates);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getDataSourceStructure = (id) => {
    let cookie = getCookie("token");
    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(
            `${ADMIN_BACKEND_URI}/platform-creds-info/creds_structure?agency_id=${id}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then(async (res) => {
            setDataSourceStructure(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    getAgencies();
    getUsers();
    getMainDataSources(userData?.agency_id);
    getMainTemplates(userData?.agency_id);
    getDataSourceStructure(userData?.agency_id);
  }, [userData]);

  return (
    <Context.Provider
      value={{
        userData,
        checkToken,
        setUsers,
        getUsers,
        agency_templates,
        getTemplates,
        users,
        agencies,
        getAgencies,
        setAgencies,
        mainDataSource,
        mainTemplates,
        dataSourceStructure,
        selectedUsers,
        setSelectedUsers,
        selectedAgencies,
        setSelectedAgencies,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
