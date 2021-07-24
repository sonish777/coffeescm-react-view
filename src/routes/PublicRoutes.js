import React, { useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const PublicRoute = ({ isAuthenticated, isAdmin, ...props }) => {
  const context = useContext(UserContext);
  return context.isAuthenticated ? (
    <Redirect to={isAdmin ? "/admin/dashboard" : "/dashboard"} />
  ) : (
    <Route {...props} />
  );
};

export default withRouter(PublicRoute);
