import { Modal, Paper, withStyles } from "@material-ui/core";
import React from "react";
import styles from "./ModalViewStyle";

const ModalView = (props) => {
  const { classes } = props;
  return (
    <Modal open={props.open} onClose={props.onCloseHandler}>
      <Paper className={classes.modalBody}>
        <h3 className={classes.modalHeader}>{props.modalHeader}</h3>
        <p>{props.children}</p>
      </Paper>
    </Modal>
  );
};

export default withStyles(styles)(ModalView);
