import React from "react";
import { MenuItem, TextField, withStyles } from "@material-ui/core";

import styles from "./InputStyle";

const Input = ({
  elementType,
  onInputChangeHandler,
  onBlurHandler,
  options,
  ...props
}) => {
  let formElement = null;
  const { classes } = props;
  switch (elementType) {
    case "input":
      formElement = (
        <div className={classes.root}>
          <TextField
            classes={{
              root: classes.formInput,
            }}
            variant="filled"
            {...props}
            onChange={onInputChangeHandler}
            onBlur={onBlurHandler}
          />
        </div>
      );
      break;
    case "number":
      formElement = (
        <div className={classes.root}>
          <TextField
            classes={{
              root: classes.formInput,
            }}
            type="number"
            variant="filled"
            InputProps={{
              inputProps: {
                min: props.min ? props.min : 0,
              },
            }}
            {...props}
            onChange={onInputChangeHandler}
            onBlur={onBlurHandler}
          />
        </div>
      );
      break;
    case "date":
      formElement = (
        <div className={classes.root}>
          <TextField
            classes={{
              root: classes.formInput,
            }}
            type="date"
            label={props.placeholder}
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            {...props}
            onChange={onInputChangeHandler}
            onBlur={onBlurHandler}
          />
        </div>
      );
      break;
    case "select":
      formElement = (
        <div className={classes.root}>
          <TextField
            id="filled-select-currency-native"
            select
            onChange={onInputChangeHandler}
            variant="filled"
            {...props}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      );
      break;
    default:
      formElement = (
        <div className={classes.root}>
          <TextField
            variant="filled"
            {...props}
            onChange={onInputChangeHandler}
            onBlur={onBlurHandler}
          />
        </div>
      );
  }
  return formElement;
};

export default withStyles(styles)(Input);
