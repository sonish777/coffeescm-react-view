import { List, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import React from "react";

import styles from "./TimelineDataStyles";

const TimelineData = (props) => {
  const { classes, label, value } = props;
  return (
    <>
      <div className={classes.flexBox}>
        <Typography variant="h6" className={classes.label}>
          {label}
        </Typography>
        {Array.isArray(value) ? (
          <List>
            {value.map((el, idx) => (
              <Typography key={idx}>{el}</Typography>
            ))}
          </List>
        ) : (
          <Typography>{value}</Typography>
        )}
      </div>
    </>
  );
};

export default withStyles(styles)(TimelineData);
