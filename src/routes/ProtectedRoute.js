import React from "react";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  const context = useContext(UserContext);
  return context.isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to="/admin" />
  );
};

export default ProtectedRoute;
