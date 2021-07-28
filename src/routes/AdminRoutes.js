import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Component } from "react";

import Login from "../pages/shared/Login/Login";
import ContractDetail from "../pages/shared/ContractDetail/ContractDetail";
import Contracts from "../pages/shared/Contracts/Contracts";
import CreateUserForm from "../pages/admin/CreateUserForm/CreateUserForm";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Users from "../pages/admin/Users/Users";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";
import UserBatches from "../pages/shared/UserBatches/UserBatches";
import UserBatchDetail from "../pages/shared/UserBatchDetail/UserBatchDetail";

class AdminRoutes extends Component {
  render() {
    return localStorage.getItem("userJwt") ? (
      <Redirect to="/dashboard" />
    ) : (
      <div>
        <Switch>
          <PublicRoute path="/admin" exact component={Login} isAdmin />
          <ProtectedRoute
            path="/admin/dashboard"
            exact
            component={Dashboard}
            isAdmin
          />
          <ProtectedRoute path="/admin/users" exact component={Users} isAdmin />
          <ProtectedRoute
            path="/admin/users/create"
            exact
            component={CreateUserForm}
            isAdmin
          />
          <ProtectedRoute
            path="/admin/contracts"
            exact
            component={Contracts}
            isAdmin
          />
          <ProtectedRoute
            path="/admin/contracts/:contractId"
            exact
            component={ContractDetail}
            isAdmin
          />
          <ProtectedRoute
            path="/admin/batches"
            exact
            component={UserBatches}
            isAdmin
          />
          <ProtectedRoute
            path="/admin/batches/:batchId"
            exact
            component={UserBatchDetail}
            isAdmin
          />
        </Switch>
      </div>
    );
  }
}

export default AdminRoutes;
