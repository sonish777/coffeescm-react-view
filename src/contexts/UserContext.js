import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const login = (currentUser) => {
    setIsAuthenticated(true);
    setCurrentUser(currentUser);
  };

  const logout = () => {
    const isAdmin = window.location.pathname.includes("/admin");
    localStorage.removeItem(isAdmin ? "adminJwt" : "userJwt");
    setIsAuthenticated(false);
    setCurrentUser({});
  };

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
