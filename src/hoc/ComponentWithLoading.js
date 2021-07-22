import React from "react";
import Loading from "../components/Loading/Loading";

const ComponentWithLoading = (props) => {
  return <>{props.isLoading ? <Loading /> : props.children}</>;
};

export default ComponentWithLoading;
