import axios from "axios";

export const setAuthToken = () => {
  const isAdmin = window.location.pathname.includes("/admin");

  if (localStorage.getItem(isAdmin ? "adminJwt" : "userJwt"))
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      isAdmin ? "adminJwt" : "userJwt"
    );
};
