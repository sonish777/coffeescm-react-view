import React from "react";
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";

class App extends Component {
  state = {
    isLoggedIn: false,
  };

  setLogin = () => {
    console.log("Called");
    this.setState({
      isLoggedIn: true,
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <Layout isLoggedIn={this.state.isLoggedIn}>
            <Switch>
              <Route
                path="/admin"
                component={() => <AdminRoutes login={this.setLogin} />}
              />
              <Route
                path="/"
                component={() => <UserRoutes login={this.setLogin} />}
              />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
