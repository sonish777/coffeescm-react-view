import React, { Component } from "react";
import { Button, Paper, withStyles } from "@material-ui/core";
import axios from "axios";
import { withCookies } from "react-cookie";

import styles from "./LoginStyle";
import Input from "../../components/Input/Input";
import withFormValidation from "../../hoc/withFormValidation/withFormValidation";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    formData: {
      email: {
        value: "",
        error: false,
        errorText: "",
        validation: [
          { type: "REQUIRED" },
          !window.location.pathname.includes("/admin") && { type: "EMAIL" },
        ],
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
    const [updatedFormDataEmail] = this.props.updateErrorData(
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
        this.login(errorPassword);
      }
    );
  };

  login = async (errorPassword) => {
    const { cookies, loginHandler } = this.props;
    const isAdmin = window.location.pathname.includes("/admin");
    try {
      if (errorPassword) {
        const result = await axios({
          method: "POST",
          url: "http://localhost:8000/api/system/login",
          data: {
            [isAdmin ? "username" : "email"]: this.state.formData.email.value,
            password: this.state.formData.password.value,
            isAdmin,
          },
        });
        if (result.data.status === "success") {
          cookies.set("adminJwt", result.data.token);
          loginHandler(result.data.data);
          this.props.history.push("/admin/dashboard");
        } else {
          console.log("LOGIN FAILED");
        }
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      error.response.data?.error.map((e) => console.log(e));
    }
  };

  render() {
    const { formData } = this.state;
    const { classes } = this.props;
    console.log(this.props);
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

export default withCookies(
  withRouter(withFormValidation(withStyles(styles)(Login)))
);
