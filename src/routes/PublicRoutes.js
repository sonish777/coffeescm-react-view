import React from "react";
import { Redirect, Route } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <Redirect to="/admin/dashboard" />
  ) : (
    <Route {...props} />
  );
};

export default PublicRoute;
