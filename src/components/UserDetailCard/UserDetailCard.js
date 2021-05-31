import React from "react";
import { withStyles, Container, Typography, Divider } from "@material-ui/core";
import styles from "./UserDetailCardStyles";
import WhiteCard from "../WhiteCard/WhiteCard";

const UserDetailCard = (props) => {
  const { classes } = props;
  return (
    <WhiteCard>
      <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>User ID</Typography>
        <Typography className={classes.cardText}>123ajsj123h8</Typography>
      </Container>
      <Divider orientation="vertical" flexItem />
      <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>Name</Typography>
        <Typography className={classes.cardText}>Sonish Maharjan</Typography>
      </Container>
      <Divider orientation="vertical" flexItem />
      <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>Email</Typography>
        <Typography className={classes.cardText}>
          sonishmaharjan1@gmail.com
        </Typography>
      </Container>
      <Divider orientation="vertical" flexItem />
      <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>Contact</Typography>
        <Typography className={classes.cardText}>9869384022</Typography>
      </Container>
      <Divider orientation="vertical" flexItem />
      <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>Address</Typography>
        <Typography className={classes.cardText}>Gwarko, Lalitpur</Typography>
      </Container>
    </WhiteCard>
  );
};

export default withStyles(styles)(UserDetailCard);
