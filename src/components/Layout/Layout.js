import React from "react";
import { NavLink } from "react-router-dom";
import {
  withStyles,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import styles from "./LayoutStyles";

const navLinks = [
  { text: "Dashboard", route: "/dashboard" },
  { text: "Users", route: "/users" },
  { text: "Contracts", route: "/contracts" },
  { text: "Batches", route: "/batches" },
];

const Layout = (props) => {
  const classes = props.classes;
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
          {navLinks.map((link, index) => (
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

export default withStyles(styles, { withTheme: true })(Layout);
