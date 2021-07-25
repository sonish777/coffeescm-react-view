import {
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { Search as SearchIcon } from "@material-ui/icons";
import MainHeader from "../../../components/MainHeader/MainHeader";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import styles from "./HomepageStyles";

const Homepage = ({ classes }) => {
  return (
    <div>
      <Typography variant="h6">
        Please enter the batch number printed on the back of your coffee's
        packet.
      </Typography>
      <form className={classes.formRoot}>
        <TextField
          className={classes.searchBox}
          id="input-with-icon-textfield"
          label="Batch Number"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default withStyles(styles)(Homepage);
