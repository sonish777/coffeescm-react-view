import { Typography, withStyles } from "@material-ui/core";
import React from "react";
import styles from "./MainHeaderStyles";

const MainHeader = (props) => {
  const { classes, children } = props;
  return (
    <div>
      <Typography variant="h5" className={classes.root}>
        {children}
      </Typography>
    </div>
  );
};

export default withStyles(styles)(MainHeader);
