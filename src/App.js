import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/users" exact component={Users} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
