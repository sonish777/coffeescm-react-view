import React from "react";
import { Redirect, Switch } from "react-router-dom";
import Login from "../pages/shared/Login/Login";
import UserBatchDetail from "../pages/shared/UserBatchDetail/UserBatchDetail";
import UserBatches from "../pages/shared/UserBatches/UserBatches";
import UserDashboard from "../pages/user/UserDashboard/UserDashboard";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoute";
import Register from "../pages/user/Register/Register";
import Contracts from "../pages/shared/Contracts/Contracts";
import ContractDetail from "../pages/shared/ContractDetail/ContractDetail";

const UserRoutes = () => {
  return localStorage.getItem("adminJwt") ? (
    <Redirect to="/admin/dashboard" />
  ) : (
    <Switch>
      <PublicRoute path="/" exact component={Login} />
      <PublicRoute path="/register" exact component={Register} />
      <ProtectedRoute path="/dashboard" exact component={UserDashboard} />
      <ProtectedRoute path="/contracts" exact component={Contracts} />
      <ProtectedRoute
        path="/contracts/:contractId"
        exact
        component={ContractDetail}
      />
      <ProtectedRoute path="/batches" exact component={UserBatches} />
      <ProtectedRoute
        path="/batches/:batchId"
        exact
        component={UserBatchDetail}
      />
    </Switch>
  );
};

export default UserRoutes;
