import {
  ListItem,
  ListItemIcon,
  Typography,
  withStyles,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import React from "react";

import styles from "./BatchDetailItemStyles";

const BatchDetailItem = ({
  id,
  label,
  value,
  classes,
  header,
  onClickHandler,
}) => {
  return (
    <ListItem
      className={classes.listItem}
      style={{
        border: header ? "0.5px solid rgba(0,0,0,0.5)" : "none",
        borderRadius: "6px",
      }}
      button={!!onClickHandler}
      onClick={() => onClickHandler && onClickHandler(id)}
    >
      <Typography variant="caption">{label}:</Typography>
      {Array.isArray(value) ? (
        value.map((v) => (
          <Typography variant="body2" className={classes.listItemText}>
            {v}
          </Typography>
        ))
      ) : (
        <Typography variant="body2" className={classes.listItemText}>
          {value ? value : "N/A"}
        </Typography>
      )}
      {header && (
        <ListItemIcon>
          <ArrowDropDownIcon />
        </ListItemIcon>
      )}
    </ListItem>
  );
};

export default withStyles(styles)(BatchDetailItem);
