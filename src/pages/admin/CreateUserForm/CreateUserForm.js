import { Button, Paper, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./CreateUserStyle";
import withFormValidation from "../../../hoc/withFormValidation/withFormValidation";
import Input from "../../../components/Input/Input";

const roles = [
  {
    value: "GROWER",
    label: "Grower",
  },
  {
    value: "FARMINSPECTOR",
    label: "Farm Inspector",
  },
  {
    value: "SHIPPER",
    label: "Shipper",
  },
  {
    value: "PROCESSOR",
    label: "Processor",
  },
];

class CreateUserForm extends Component {
  state = {
    submit: false,
    formData: {
      name: {
        value: "",
        error: false,
        errorText: "",
        touched: false,
        validation: [{ type: "REQUIRED" }, { type: "MINLENGTH", value: 5 }],
      },
      email: {
        value: "",
        error: false,
        errorText: "",
        touched: false,
        validation: [{ type: "REQUIRED" }, { type: "EMAIL" }],
      },
      password: {
        value: "",
        error: false,
        errorText: "",
        touched: false,
        validation: [{ type: "REQUIRED" }, { type: "MINLENGTH", value: 8 }],
      },
      country: {
        value: "",
        error: false,
        errorText: "",
        touched: false,
        validation: [{ type: "REQUIRED" }],
      },
      role: {
        value: roles[0].value,
        error: false,
        errorText: "",
        touched: true,
        validation: [],
      },
    },
  };

  onInputChangeHandler = (event) => {
    const formData = { ...this.state.formData };
    formData[event.target.name].value = event.target.value;
    const [updatedFormData, error] = this.props.updateErrorData(
      formData,
      event.target.name
    );
    this.setState({
      formData: updatedFormData,
      submit: error,
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = { ...this.state.formData };
    this.state.submit && console.log(formData);
  };

  onBlurHandler = (event) => {
    const formData = { ...this.state.formData };
    if (formData[event.target.name].touched === true) return;
    const updatedFormData = this.props.updateTouchData(
      formData,
      event.target.name
    );
    this.setState({
      formData: updatedFormData,
    });
  };

  render() {
    const { formData } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <h3>Create a User</h3>
        <form className={classes.formBody}>
          <Input
            elementType="input"
            name="name"
            value={formData.name.value}
            placeholder="Name"
            onInputChangeHandler={this.onInputChangeHandler}
            onBlurHandler={this.onBlurHandler}
            error={formData.name.error}
            helperText={formData.name.errorText}
          />
          <Input
            elementType="input"
            name="email"
            value={formData.email.value}
            placeholder="Email"
            onInputChangeHandler={this.onInputChangeHandler}
            onBlurHandler={this.onBlurHandler}
            error={formData.email.error}
            helperText={formData.email.errorText}
          />
          <Input
            elementType="input"
            name="password"
            type="password"
            value={formData.password.value}
            placeholder="Password"
            onInputChangeHandler={this.onInputChangeHandler}
            onBlurHandler={this.onBlurHandler}
            error={formData.password.error}
            helperText={formData.password.errorText}
          />
          <Input
            elementType="input"
            name="country"
            value={formData.country.value}
            placeholder="Country"
            onInputChangeHandler={this.onInputChangeHandler}
            onBlurHandler={this.onBlurHandler}
            error={formData.country.error}
            helperText={formData.country.errorText}
          />
          <Input
            elementType="select"
            label="Select Role"
            name="role"
            value={formData.role.value}
            onInputChangeHandler={this.onInputChangeHandler}
            error={formData.role.error}
            helperText={formData.role.errorText}
            options={roles}
          />

          <div className={classes.formGroup}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSubmitHandler}
              disabled={!this.state.submit}
            >
              Create
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withFormValidation(withStyles(styles)(CreateUserForm));
