import React, { createContext, useState } from "react";

export const SnackbarContext = createContext({});

export const SnackbarContextProvider = (props) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");

  const viewSnackbar = (message) => {
    setShowSnackbar(true);
    setSnackbarContent(message);
  };

  const hideSnackbar = () => {
    setShowSnackbar(false);
    setSnackbarContent("");
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        snackbarContent,
        viewSnackbar,
        hideSnackbar,
      }}
    >
      {props.children}
    </SnackbarContext.Provider>
  );
};
