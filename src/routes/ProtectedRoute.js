import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/admin" />;
};

export default ProtectedRoute;
