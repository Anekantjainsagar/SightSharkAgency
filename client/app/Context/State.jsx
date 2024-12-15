"use client";
import React, { useEffect, useState } from "react";
import Context from "./Context";
import axios from "axios";
import { ADMIN_BACKEND_URI, BACKEND_URI } from "../utils/url";
import { getCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const State = (props) => {
  const pathname = usePathname();
  const history = useRouter();
  const [userData, setUserData] = useState();
  const [actualUser, setActualUser] = useState();
  const [users, setUsers] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [mainDataSource, setMainDataSource] = useState();
  const [mainTemplates, setMainTemplates] = useState();
  const [dataSourceStructure, setDataSourceStructure] = useState();
  const [selectedAgencies, setSelectedAgencies] = useState([]);
  const [clientCreds, setClientCreds] = useState();
  const [platformsData, setPlatformsData] = useState();
  const [criticalNotifications, setCriticalNotifications] = useState([]);
  const [criticalNotificationsLength, setCriticalNotificationsLength] =
    useState(0);

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
            if (err.status) {
              if (pathname != "/reset-password") {
                history.push("/");
              }
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUserAgency = async () => {
    try {
      if (userData?.agency_id) {
        console.log(userData?.agency_id);
        let cookie = getCookie("token");
        const response = await axios.get(
          `${BACKEND_URI}/user/admin-agency-profile`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        setActualUser(response.data.data);
      } else {
        console.error("Agency ID is not defined.");
      }
    } catch (error) {
      console.error(
        "Error fetching user agency:",
        error.response || error.message
      );
    }
  };

  useEffect(() => {
    if (pathname == "/" && userData?.id) {
      history.push("/overview");
      toast.success("Logged in Successfully");
    }
  }, [userData]);

  const getCriticalNotifications = () => {
    const cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/critical_notification/?unseen_only=${false}&order_by=${"created_at"}&page=${1}&page_size=${50}`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setCriticalNotifications(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }

      try {
        axios
          .get(`${BACKEND_URI}/critical_notification/unseen/count/`, {
            headers: {
              Authorization: `Bearer ${cookie}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setCriticalNotificationsLength(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getDataSourcesDataFromAPI = () => {
    let cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(`${BACKEND_URI}/data-refresh/platform-by-agency`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setPlatformsData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUsers = (page = 1, order_by = "created_at", type = true) => {
    let cookie = getCookie("token");
    let limit = users?.limit ? users?.limit : 6;

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

  const getAgencies = (page = 1, order_by = "created_at", type = true) => {
    let cookie = getCookie("token");
    let limit = agencies?.limit ? agencies?.limit : 8;

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

  const getCredentialsForClient = (id) => {
    let cookie = getCookie("token");
    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(`${BACKEND_URI}/client/get-client-credentials?client_id=${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then(async (response) => {
            setClientCreds(response.data);
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
    getUserAgency();
  }, [userData]);

  useEffect(() => {
    getDataSourcesDataFromAPI();
    getCriticalNotifications();
  }, [userData]);

  const checkPasswordCriteria = (password) => {
    return {
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const password_params = [
    "hasUppercase",
    "hasLowercase",
    "hasNumber",
    "hasSpecialChar",
  ];
  const tooltips = {
    hasUppercase: "Password must have at least one uppercase letter.",
    hasLowercase: "Password must have at least one lowercase letter.",
    hasNumber: "Password must have at least one number.",
    hasSpecialChar: "Password must have at least one special character.",
  };

  return (
    <Context.Provider
      value={{
        criticalNotifications,
        criticalNotificationsLength,
        userData,
        checkToken,
        setUsers,
        getUsers,
        users,
        agencies,
        getAgencies,
        setAgencies,
        mainDataSource,
        mainTemplates,
        dataSourceStructure,
        selectedAgencies,
        platformsData,
        setSelectedAgencies,
        getCredentialsForClient,
        clientCreds,
        setUserData,
        checkPasswordCriteria,
        password_params,
        tooltips,
        actualUser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
