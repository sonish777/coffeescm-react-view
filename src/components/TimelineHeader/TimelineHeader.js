import { Divider, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import React from "react";

import styles from "./TimelineHeaderStyles";

const TimelineHeader = (props) => {
  const { classes, state } = props;
  return (
    <>
      <div className={classes.flexBox}>
        <Typography variant="h6">State</Typography>
        <Typography>{state}</Typography>
      </div>
      <Divider />
    </>
  );
};

export default withStyles(styles)(TimelineHeader);
