import React from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from "../pages/consumer/Homepage/Homepage";

const ConsumerRoutes = () => {
  return (
    <Switch>
      <Route path="/track-my-coffee" exact component={Homepage} />
    </Switch>
  );
};

export default ConsumerRoutes;
