import axios from "axios";

export const setAuthToken = () => {
  const isAdmin = window.location.pathname.includes("/admin");

  if (localStorage.getItem(isAdmin ? "adminJwt" : "userJwt"))
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      isAdmin ? "adminJwt" : "userJwt"
    );
};

export const beautifyDateTime = (dateTime) => {
  return `${dateTime.split("T")[0]} ${dateTime.split("T")[1].split(".")[0]}`;
};
