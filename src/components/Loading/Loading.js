import { CircularProgress } from "@material-ui/core";
import React from "react";

const Loading = () => {
  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
