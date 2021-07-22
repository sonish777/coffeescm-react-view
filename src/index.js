import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarContextProvider } from "./contexts/SnackbarContext";
import { UserContextProvider } from "./contexts/UserContext";
import "./index.css";

ReactDOM.render(
  <CookiesProvider>
    <SnackbarContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </SnackbarContextProvider>
  </CookiesProvider>,
  document.getElementById("root")
);
