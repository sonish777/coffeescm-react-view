import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login/Login";
import ContractDetail from "../pages/admin/ContractDetail/ContractDetail";
import Contracts from "../pages/admin/Contracts/Contracts";
import CreateUserForm from "../pages/admin/CreateUserForm/CreateUserForm";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Users from "../pages/admin/Users/Users";

const AdminRoutes = ({ login }) => {
  console.log("Admin routes");
  return (
    <Switch>
      <Route path="/admin" exact component={() => <Login login={login} />} />
      <Route path="/admin/dashboard" exact component={Dashboard} />
      <Route path="/admin/users" exact component={Users} />
      <Route path="/admin/users/create" exact component={CreateUserForm} />
      <Route path="/admin/contracts" exact component={Contracts} />
      <Route
        path="/admin/contracts/:contractId"
        exact
        component={ContractDetail}
      />
    </Switch>
  );
};

export default AdminRoutes;
