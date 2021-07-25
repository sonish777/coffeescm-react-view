import React, { useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  withStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";

import styles from "./LayoutStyles";
import { UserContext } from "../../contexts/UserContext";

const Layout = (props) => {
  const loggedInNavLinks = {
    "/admin": [
      { text: "Dashboard", route: "/admin/dashboard" },
      { text: "Users", route: "/admin/users" },
      { text: "Contracts", route: "/admin/contracts" },
      { text: "Batches", route: "/admin/batches" },
    ],
    "/scmusers": [
      { text: "Dashboard", route: "/dashboard" },
      { text: "Contracts", route: "/contracts" },
      { text: "Batches", route: "/batches" },
    ],
  };

  const loggedOutNavLinks = {
    "/admin": [{ text: "Login", route: "/admin" }],
    "/scmusers": [
      { text: "Login", route: "/" },
      { text: "Register", route: "/register" },
    ],
  };
  const userContext = useContext(UserContext);

  const classes = props.classes;
  const linksArr = props.isLoggedIn
    ? loggedInNavLinks[
        props.location.pathname.includes("/admin") ? "/admin" : "/scmusers"
      ]
    : loggedOutNavLinks[
        props.location.pathname.includes("/admin") ? "/admin" : "/scmusers"
      ];
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        style={{
          display: window.location.pathname.includes("/track-my-coffee")
            ? "none"
            : "block",
        }}
      >
        <List>
          {linksArr.map((link, index) => (
            <NavLink
              key={index}
              to={link.route}
              className={classes.navLinks}
              activeClassName={classes.activeNavLink}
              onClick={() => console.log("CLICKED")}
            >
              <ListItem button>
                <ListItemText primary={link.text} style={{ paddingLeft: 20 }} />
              </ListItem>
            </NavLink>
          ))}
          {props.isLoggedIn && (
            <ListItem>
              <Button
                color="secondary"
                onClick={userContext.logout}
                style={{ padding: "0 20px" }}
              >
                Logout
              </Button>
            </ListItem>
          )}
        </List>
      </Drawer>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
};

export default withRouter(withStyles(styles, { withTheme: true })(Layout));
