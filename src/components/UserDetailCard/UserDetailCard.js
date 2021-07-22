import React from "react";
import { withStyles, Container, Typography, Divider } from "@material-ui/core";
import styles from "./UserDetailCardStyles";
import WhiteCard from "../WhiteCard/WhiteCard";

const UserDetailCard = (props) => {
  const { classes, user } = props;
  return user ? (
    <>
      <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>User ID</Typography>
        <Typography className={classes.cardText}>{user.userId}</Typography>
      </Container>
      <Divider orientation="vertical" flexItem />
      <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>Name</Typography>
        <Typography className={classes.cardText}>{user.name}</Typography>
      </Container>
      <Divider orientation="vertical" flexItem />
      <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>Email</Typography>
        <Typography className={classes.cardText}>{user.email}</Typography>
      </Container>
      <Divider orientation="vertical" flexItem />
      <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>Contact</Typography>
        <Typography className={classes.cardText}>{user.contact}</Typography>
      </Container>
      <Divider orientation="vertical" flexItem />
      {/* <Container className={classes.cardBody}>
        <Typography className={classes.cardHeading}>Address</Typography>
        <Typography className={classes.cardText}>{user.address}</Typography>
      </Container> */}
      {user.role && (
        <>
          <Divider orientation="vertical" flexItem />
          <Container className={classes.cardBody}>
            <Typography className={classes.cardHeading}>Role</Typography>
            <Typography className={classes.cardText}>{user.role}</Typography>
          </Container>
        </>
      )}
    </>
  ) : (
    <WhiteCard>
      <Typography>This participant hasnt been added to the contract</Typography>
    </WhiteCard>
  );
};

export default withStyles(styles)(UserDetailCard);
