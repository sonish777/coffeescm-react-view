import { Divider, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import React from "react";

import styles from "./TimelineFooterStyles";

const TimelineHeader = (props) => {
  const { classes, label, name } = props;
  return (
    <>
      <Divider />
      <div className={classes.flexBox}>
        <Typography variant="h6">{label}</Typography>
        <Typography>{name}</Typography>
      </div>
    </>
  );
};

export default withStyles(styles)(TimelineHeader);
