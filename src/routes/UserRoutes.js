import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login/Login";
import UserBatchDetail from "../pages/user/UserBatchDetail/UserBatchDetail";
import UserBatches from "../pages/user/UserBatches/UserBatches";
import UserDashboard from "../pages/user/UserDashboard/UserDashboard";

const UserRoutes = ({ login }) => {
  return (
    <Switch>
      <Route path="/" exact component={() => <Login login={login} />} />
      <Route path="/dashboard" exact component={UserDashboard} />
      <Route path="/batches" exact component={UserBatches} />
      <Route path="/batches/:batchId" exact component={UserBatchDetail} />
    </Switch>
  );
};

export default UserRoutes;
