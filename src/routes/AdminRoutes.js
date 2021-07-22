import React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../pages/Login/Login";
import ContractDetail from "../pages/admin/ContractDetail/ContractDetail";
import Contracts from "../pages/admin/Contracts/Contracts";
import CreateUserForm from "../pages/admin/CreateUserForm/CreateUserForm";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Users from "../pages/admin/Users/Users";
import { Component } from "react";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";

class AdminRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <PublicRoute path="/admin" exact component={Login} />
          <ProtectedRoute path="/admin/dashboard" exact component={Dashboard} />
          <Route path="/admin/users" exact component={Users} />
          <Route path="/admin/users/create" exact component={CreateUserForm} />
          <ProtectedRoute path="/admin/contracts" exact component={Contracts} />
          <ProtectedRoute
            path="/admin/contracts/:contractId"
            exact
            component={ContractDetail}
          />
        </Switch>
      </div>
    );
  }
}

export default AdminRoutes;
