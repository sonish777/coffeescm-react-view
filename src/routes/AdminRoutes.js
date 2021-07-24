import React from "react";
import { Route, Switch } from "react-router-dom";
import { Component } from "react";

import Login from "../pages/Login/Login";
import ContractDetail from "../pages/ContractDetail/ContractDetail";
import Contracts from "../pages/Contracts/Contracts";
import CreateUserForm from "../pages/admin/CreateUserForm/CreateUserForm";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Users from "../pages/admin/Users/Users";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";

class AdminRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <PublicRoute path="/admin" exact component={Login} isAdmin />
          <ProtectedRoute
            path="/admin/dashboard"
            exact
            component={Dashboard}
            isAdmin
          />
          <Route path="/admin/users" exact component={Users} />
          <Route
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
        </Switch>
      </div>
    );
  }
}

export default AdminRoutes;
