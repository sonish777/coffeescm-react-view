import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Login from "../pages/Login/Login";
import ContractDetail from "../pages/admin/ContractDetail/ContractDetail";
import Contracts from "../pages/admin/Contracts/Contracts";
import CreateUserForm from "../pages/admin/CreateUserForm/CreateUserForm";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Users from "../pages/admin/Users/Users";
import { Component } from "react";
import { withCookies } from "react-cookie";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";

class AdminRoutes extends Component {
  state = {
    currentUser: null,
    isAuthenticated: false,
  };

  async componentDidMount() {
    const { cookies } = this.props;
    if (cookies.get("adminJwt")) {
      console.log(cookies.get("adminJwt"));
      try {
        const result = await axios({
          method: "GET",
          url: "http://localhost:8000/api/system/me",
          withCredentials: true,
        });
        if (result.data.status === "success") {
          this.setState({
            currentUser: result.data.data,
            isAuthenticated: true,
          });
        }
      } catch (error) {
        console.log("Not Logged In");
      }
    }
  }

  loginHandler = (user) => {
    this.setState({
      currentUser: user,
      isAuthenticated: true,
    });
  };

  render() {
    return (
      <Switch>
        <PublicRoute
          isAuthenticated={this.state.isAuthenticated}
          path="/admin"
          exact
          component={() => <Login loginHandler={this.loginHandler} />}
        />
        <ProtectedRoute
          isAuthenticated={this.state.isAuthenticated}
          path="/admin/dashboard"
          exact
          component={Dashboard}
        />
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
  }
}

export default withCookies(AdminRoutes);
