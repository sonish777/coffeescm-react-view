import { Box, withStyles } from "@material-ui/core";
import React from "react";
import styles from "./TabPanelStyle";

const TabPanel = (props) => {
  const { classes, children } = props;
  return (
    <div
      role="tabpanel"
      hidden={props.index !== props.currentTabIndex}
      className={classes.root}
    >
      {props.index === props.currentTabIndex && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default withStyles(styles)(TabPanel);
