import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  withStyles,
} from "@material-ui/core";
import React, { Component } from "react";

import styles from "./SearchResultBoxStyles";

class SearchResultBox extends Component {
  render() {
    const { searchResultsList, setUserIdHandler, classes } = this.props;

    return (
      <Paper elevation={0} variant="outlined" className={classes.paperRoot}>
        <List>
          {searchResultsList.map((el) => (
            <ListItem
              button
              key={el.userId}
              onClick={(e) => setUserIdHandler(e, el.userId)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={el.name}
                  src={`http://192.168.246.128:8000/images/${el.avatarPath}`}
                />
              </ListItemAvatar>
              <ListItemText>
                {el.name}
                <span className={classes.userEmail}>({el.email})</span>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchResultBox);
