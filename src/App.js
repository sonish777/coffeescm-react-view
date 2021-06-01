import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import CreateUserForm from "./pages/CreateUserForm/CreateUserForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/create" exact component={CreateUserForm} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
