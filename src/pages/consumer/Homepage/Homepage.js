import {
  Button,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Search as SearchIcon } from "@material-ui/icons";
import axios from "axios";

import styles from "./HomepageStyles";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { beautifyDateTime } from "../../../helpers";

const Homepage = ({ classes, ...props }) => {
  const [batches, setBatches] = useState([]);
  const [searchedList, setSearchedList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const snackbarContext = useContext(SnackbarContext);

  const onInputChangeHandler = (e) => {
    const value = e.target.value;
    setSearchString(e.target.value);
    const tempList = [];
    if (value.length > 4) {
      batches.forEach((el) => {
        if (
          el.batch.shortBatchId?.toLowerCase().includes(value.toLowerCase())
        ) {
          tempList.push(el.batch);
        }
      });
    }
    setSearchedList(tempList);
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const result = await axios({
          method: "GET",
          url: "http://192.168.246.128:8000/api/consumer/batches",
        });
        if (result.data.status === "success") {
          setBatches(result.data.data);
        }
      } catch (error) {
        console.log(error.response.data);
        snackbarContext.viewSnackbar(
          "Something went wrong while fetching the data"
        );
      }
    };
    fetchBatches();
  }, []);

  const onClickHandler = (e, idx) => {
    // console.log(props);
    props.history.push(`/track-my-coffee/${searchedList[idx].batchId}`);
  };

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
          name="searchString"
          value={searchString}
          onChange={onInputChangeHandler}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Paper className={classes.paperRoot}>
          <List>
            {searchedList.map((el, idx) => (
              <ListItem
                button
                onClick={(e) => onClickHandler(e, idx)}
                key={el.batchId}
              >
                <ListItemText>
                  {`Batch: ${el.shortBatchId}`}
                  <span className={classes.processedDateTime}>
                    ({beautifyDateTime(el.processedDateTime)})
                  </span>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </form>
    </div>
  );
};

export default withStyles(styles)(Homepage);
