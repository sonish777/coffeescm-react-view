import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import {
  withStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import styles from "./LayoutStyles";

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

  const loggedOutNavLinks = [{ text: "Login", route: props.location.pathname }];

  const classes = props.classes;
  const linksArr = props.isLoggedIn
    ? loggedInNavLinks[
        props.location.pathname.includes("/admin") ? "/admin" : "/scmusers"
      ]
    : loggedOutNavLinks;
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {linksArr.map((link, index) => (
            <NavLink
              key={index}
              to={link.route}
              exact
              className={classes.navLinks}
              activeClassName={classes.activeNavLink}
            >
              <ListItem button>
                <ListItemText primary={link.text} style={{ paddingLeft: 20 }} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
};

export default withRouter(withStyles(styles, { withTheme: true })(Layout));
