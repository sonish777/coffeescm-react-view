import { Paper, withStyles } from "@material-ui/core";
import React from "react";
import styles from "./WhiteCardStyles";

const WhiteCard = (props) => {
  const { classes } = props;
  return (
    <Paper variant="outlined" className={classes.root}>
      {props.children}
    </Paper>
  );
};

export default withStyles(styles)(WhiteCard);
