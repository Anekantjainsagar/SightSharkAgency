"use client";
import axios from "axios";
import Context from "./Context";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_BACKEND_URI, BACKEND_URI } from "../utils/url";

const State = (props) => {
  const pathname = usePathname();
  const history = useRouter();
  const [clientId, setClientId] = useState("");
  const [selectedClientDetails, setSelectedClientDetails] = useState();
  const [userData, setUserData] = useState();
  const [actualUser, setActualUser] = useState();
  const [users, setUsers] = useState([]);
  const [searchTextClients, setSearchTextClients] = useState("");
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
  const [alerts, setAlerts] = useState([]);
  const [alertsLength, setAlertsLength] = useState(0);
  const [rawReportsClient, setRawReportsClient] = useState([]);
  const [linkToEmbed, setLinkToEmbed] = useState("");
  const [timezones, setTimezones] = useState([]);
  const [lookerStudioSecret, setLookerStudioSecret] = useState(false);
  const [agencyReports, setAgencyReports] = useState([]);
  const [publishedReports, setPublishedReports] = useState([]);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [allDataSources, setAllDataSources] = useState([]);
  const [archivedReports, setArchivedReports] = useState([]);
  const [assignedTemplates, setAssignedTemplates] = useState([]);

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

  const getUserAgency = async () => {
    try {
      if (userData?.agency_id) {
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
      }
    } catch (error) {
      console.error(
        "Error fetching user agency:",
        error.response || error.message
      );
    }
  };

  const getTimezones = async () => {
    try {
      let cookie = getCookie("token");
      const response = await axios.get(`${BACKEND_URI}/client/timezones`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie}`,
        },
      });
      setTimezones(response.data.data);
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
      // toast.success("Logged in Successfully");
    }
  }, [userData]);

  const getCriticalNotifications = (page = 1) => {
    const cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/critical-notification/?unseen_only=${false}&order_by=${"created_at"}&page=${page}&page_size=${50}`,
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
          .get(`${BACKEND_URI}/critical-notification/unseen/count/`, {
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

  const getAlerts = (page = 1) => {
    const cookie = getCookie("token");

    if (cookie?.length > 5) {
      try {
        axios
          .get(
            `${BACKEND_URI}/alerts/?unseen_only=${false}&order_by=${"created_at"}&page=${page}&page_size=${50}`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setAlerts(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }

      try {
        axios
          .get(`${BACKEND_URI}/alerts/unseen/count/`, {
            headers: {
              Authorization: `Bearer ${cookie}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setAlertsLength(res.data);
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
            let data = res.data.data.platforms;
            data = data?.filter((e) => {
              if (e?.have_access) {
                return e;
              }
            });
            setPlatformsData({ platforms: data });
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
    let limit = users?.limit ? users?.limit : 7;

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
            }&client_name=${searchTextClients}`,
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
            let transformedPlatforms = res.data.platforms.map((platform) => {
              if (platform?.have_access) {
                const [name, img_link] = [
                  platform.platform_name,
                  platform.logo_link,
                ];
                return { name, img_link };
              }
            });
            transformedPlatforms = transformedPlatforms?.filter((e) => {
              if (e?.name) {
                return e;
              }
            });

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

  const getAssignedTemplates = (id) => {
    let cookie = getCookie("token");
    setAssignedTemplates([]);
    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(`${BACKEND_URI}/template/assigned-templates/${id}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie}`,
            },
          })
          .then((res) => {
            setAssignedTemplates(res.data.templates);
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
    setDataSourceStructure([]);
    if (cookie?.length > 5) {
      try {
        axios
          .post(
            `${BACKEND_URI}/client/get-client-credentials`,
            {
              client_id: "",
            },
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

  const getAllDataSources = () => {
    let cookie = getCookie("token");
    setAllDataSources([]);
    if (cookie?.length > 5) {
      try {
        axios
          .post(
            `${BACKEND_URI}/client/get-client-credentials`,
            {
              have_access: false,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then(async (res) => {
            let data = res.data.data;
            data = data?.filter((e) => {
              if (!e?.have_access) {
                return e;
              }
            });
            setAllDataSources(data);
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
    setClientCreds([]);

    if (cookie?.length > 5 && id) {
      try {
        axios
          .post(
            `${BACKEND_URI}/client/get-client-credentials`,
            {
              client_id: id,
            },
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

  const getRawReports = (id) => {
    let cookie = getCookie("token");
    setRawReportsClient([]);

    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(
            `${BACKEND_URI}/raw-reports/reports?client_id=${id}&status=${"pending"}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then(async (res) => {
            setRawReportsClient(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getPublishedReports = (id) => {
    let cookie = getCookie("token");
    setPublishedReports([]);

    if (cookie?.length > 5 && id) {
      try {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_BACKEND_URI}/agency/reports?client_id=${id}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookie}`,
              },
            }
          )
          .then(async (res) => {
            setPublishedReports(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getLookerStudioData = async () => {
    let cookie = getCookie("token");
    if (cookie) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/credential/is-looker-secret-created`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        setLookerStudioSecret(response.data.is_secret_created);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getAgencyReports = async () => {
    let cookie = getCookie("token");
    if (cookie) {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URI
          }/agency/reports?client_id=${""}`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        setAgencyReports(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getArchivedAgencyReports = async () => {
    let cookie = getCookie("token");
    if (cookie) {
      try {
        const response = await axios.get(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URI
          }/archive/archive-reports/search?report_name=${""}`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        );
        setArchivedReports(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    getAgencies();
  }, [searchTextClients]);

  useEffect(() => {
    getAgencies();
    getTimezones();
    getUsers();
    getMainDataSources(userData?.agency_id);
    getMainTemplates(userData?.agency_id);
    getDataSourceStructure(clientId);
    getUserAgency();
    getLookerStudioData();
    getAgencyReports();
    getArchivedAgencyReports();
    getAllDataSources();
  }, [userData]);

  useEffect(() => {
    getDataSourcesDataFromAPI();
    getCriticalNotifications();
    getAlerts();
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
        alerts,
        alertsLength,
        userData,
        clientId,
        setClientId,
        selectedClientDetails,
        setSelectedClientDetails,
        checkToken,
        setUsers,
        getUsers,
        users,
        agencies,
        getAgencies,
        setSearchTextClients,
        searchTextClients,
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
        rawReportsClient,
        getRawReports,
        getDataSourcesDataFromAPI,
        getDataSourceStructure,
        linkToEmbed,
        setLinkToEmbed,
        timezones,
        agencyReports,
        lookerStudioSecret,
        publishedReports,
        getPublishedReports,
        setShowLeftMenu,
        showLeftMenu,
        allDataSources,
        archivedReports,
        getArchivedAgencyReports,
        getCriticalNotifications,
        getAssignedTemplates,
        assignedTemplates,
      }}
    >
      {props.children}
      {/* <div className="absolute md:hidden w-[100vw] h-[100vh] bg-main left-0 top-0 z-50 flex items-center justify-center text-2xl text-white text-center">
        Coming Soon
      </div> */}
    </Context.Provider>
  );
};

export default State;
