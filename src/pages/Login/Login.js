import React, { Component } from "react";
import { Button, Paper, withStyles } from "@material-ui/core";
import axios from "axios";

import styles from "./LoginStyle";
import Input from "../../components/Input/Input";
import withFormValidation from "../../hoc/withFormValidation/withFormValidation";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import ComponentWithLoading from "../../hoc/ComponentWithLoading";

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

class Login extends Component {
  static contextType = UserContext;
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
      role: {
        value: roles[0].value,
        error: false,
        errorText: "",
        validation: [],
      },
    },
    isLoading: false,
  };

  onInputChangeHandler = (e) => {
    const { formData } = this.state;
    formData[e.target.name].value = e.target.value;
    this.setState({
      formData,
    });
  };

  onSubmitHandler = (e, snackbarContext) => {
    e.preventDefault();
    this.setState({ isLoading: true });
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
          ...formData,
          email: updatedFormDataEmail.email,
          password: updatedFormDataPassword.password,
        },
      },
      () => {
        this.login(errorPassword, snackbarContext);
      }
    );
  };

  login = async (errorPassword, snackbarContext) => {
    const context = this.context;
    const isAdmin = window.location.pathname.includes("/admin");
    try {
      if (errorPassword) {
        const result = await axios({
          method: "POST",
          url: isAdmin
            ? "http://localhost:8000/api/system/login"
            : "http://localhost:8000/api/scmusers/login",
          data: {
            [isAdmin ? "username" : "email"]: this.state.formData.email.value,
            password: this.state.formData.password.value,
            isAdmin,
            role: isAdmin ? "" : this.state.formData.role.value,
          },
        });
        if (result.data.status === "success") {
          localStorage.setItem(
            isAdmin ? "adminJwt" : "userJwt",
            result.data.token
          );
          context.login(result.data.data);
          snackbarContext.viewSnackbar("Login Success");
          this.props.history.push(isAdmin ? "/admin/dashboard" : "/dashboard");
        } else {
          console.log("LOGIN FAILED");
          this.setState({ isLoading: false });
          snackbarContext.viewSnackbar("Login Failed");
        }
      } else {
        this.setState({ isLoading: false });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      error.response.data?.error.map((e) => snackbarContext.viewSnackbar(e));
    }
  };

  render() {
    const { formData } = this.state;
    const { classes } = this.props;
    const isAdmin = window.location.pathname.includes("/admin");
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
            autoComplete="on"
            value={formData.password.value}
            placeholder="Password"
            onInputChangeHandler={this.onInputChangeHandler}
            error={formData.password.error}
            helperText={formData.password.errorText}
          />
          {!isAdmin && (
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
          )}
          <div className={classes.formGroup}>
            <SnackbarContext.Consumer>
              {(snackbarContext) => (
                <ComponentWithLoading isLoading={this.state.isLoading}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => this.onSubmitHandler(e, snackbarContext)}
                  >
                    Login
                  </Button>
                </ComponentWithLoading>
              )}
            </SnackbarContext.Consumer>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withRouter(withFormValidation(withStyles(styles)(Login)));
