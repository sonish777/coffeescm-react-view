import axios from "axios";
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import { UserContext } from "./contexts/UserContext";
import { SnackbarContext } from "./contexts/SnackbarContext";

import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import { Snackbar } from "@material-ui/core";

const App = (props) => {
  const userContext = useContext(UserContext);
  const snackbarContext = useContext(SnackbarContext);

  useEffect(() => {
    const loadUser = async (adminToken) => {
      axios.defaults.headers.common["x-auth-token"] = adminToken;
      try {
        const result = await axios({
          method: "GET",
          url: "http://localhost:8000/api/system/me",
        });
        if (result.data.status === "success") {
          userContext.login(result.data.data);
        }
      } catch (error) {
        console.log(error);
        console.log("Not Logged In");
      }
    };
    const adminToken = localStorage.getItem("adminJwt");
    if (adminToken) {
      loadUser(adminToken);
    }
  }, []);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={snackbarContext.showSnackbar}
        onClose={snackbarContext.hideSnackbar}
        message={snackbarContext.snackbarContent}
        autoHideDuration={3000}
      />
      <BrowserRouter>
        <Layout isLoggedIn={userContext.isAuthenticated}>
          <Switch>
            <Route path="/admin" component={AdminRoutes} />
            <Route path="/" component={UserRoutes} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default App;
