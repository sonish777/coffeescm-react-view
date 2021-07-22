import React, { useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PublicRoute = ({ isAuthenticated, ...props }) => {
  const context = useContext(UserContext);
  return context.isAuthenticated ? (
    <Redirect to="/admin/dashboard" />
  ) : (
    <Route {...props} />
  );
};

export default withRouter(PublicRoute);
