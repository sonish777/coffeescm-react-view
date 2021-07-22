import { LinearProgress } from "@material-ui/core";
import React, { useState } from "react";

const withLoading = (WrappedComponent) => (props) => {
  const [isLoading, setLoading] = useState(true);

  const setIsLoading = (loading) => {
    setLoading(loading);
  };

  return isLoading ? (
    <LinearProgress />
  ) : (
    <WrappedComponent {...props} setIsLoading={setIsLoading} />
  );
};

export default withLoading;
