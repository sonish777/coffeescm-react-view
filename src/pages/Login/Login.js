import React, { Component } from "react";
import { Button, Paper, withStyles } from "@material-ui/core";
import styles from "./LoginStyle";
import Input from "../../components/Input/Input";
import withFormValidation from "../../hoc/withFormValidation/withFormValidation";

class Login extends Component {
  state = {
    formData: {
      email: {
        value: "",
        error: false,
        errorText: "",
        validation: [{ type: "REQUIRED" }],
      },
      password: {
        value: "",
        error: false,
        errorText: "",
        validation: [{ type: "REQUIRED" }],
      },
    },
  };

  onInputChangeHandler = (e) => {
    const { formData } = this.state;
    formData[e.target.name].value = e.target.value;
    this.setState({
      formData,
    });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const [updatedFormDataEmail, errorEmail] = this.props.updateErrorData(
      formData,
      "email"
    );
    const [updatedFormDataPassword, errorPassword] = this.props.updateErrorData(
      formData,
      "password"
    );
    this.setState(
      {
        formData: {
          email: updatedFormDataEmail.email,
          password: updatedFormDataPassword.password,
        },
      },
      () => {
        errorPassword
          ? console.log("Loggin in with", formData)
          : console.log("Login Failed");
      }
    );
  };

  render() {
    const { formData } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <h3>Login</h3>
        <form className={classes.formBody}>
          <Input
            elementType="input"
            name="email"
            value={formData.email.value}
            placeholder="Email"
            onInputChangeHandler={this.onInputChangeHandler}
            error={formData.email.error}
            helperText={formData.email.errorText}
          />
          <Input
            elementType="input"
            type="password"
            name="password"
            value={formData.password.value}
            placeholder="Password"
            onInputChangeHandler={this.onInputChangeHandler}
            error={formData.password.error}
            helperText={formData.password.errorText}
          />
          <div className={classes.formGroup}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSubmitHandler}
            >
              Login
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withFormValidation(withStyles(styles)(Login));
