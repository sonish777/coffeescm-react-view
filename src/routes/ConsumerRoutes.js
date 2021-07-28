import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../pages/consumer/Homepage/Homepage";
import UserBatchDetail from "../pages/shared/UserBatchDetail/UserBatchDetail";

const ConsumerRoutes = () => {
  return (
    <Switch>
      <Route path="/track-my-coffee" exact component={Homepage} />
      <Route
        path="/track-my-coffee/:batchId"
        exact
        component={UserBatchDetail}
      />
    </Switch>
  );
};

export default ConsumerRoutes;
