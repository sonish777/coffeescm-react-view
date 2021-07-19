import React from "react";
import { withStyles } from "@material-ui/core";

import styles from "./TimelineOppositeContentAvatarStyles";

const TimelineOpposotieContentAvatar = (props) => {
  const { classes, imgSource } = props;
  return (
    <img
      src={imgSource}
      className={classes.largeAvatar}
      style={{ marginLeft: "auto" }}
      alt="State"
    />
  );
};

export default withStyles(styles)(TimelineOpposotieContentAvatar);
