import { Button, FormLabel, Paper, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import styles from "./CreateUserStyle";
import withFormValidation from "../../../hoc/withFormValidation/withFormValidation";
import Input from "../../../components/Input/Input";
import { setAuthToken } from "../../../helpers";
import axios from "axios";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import ComponentWithLoading from "../../../hoc/ComponentWithLoading";

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

const formDataStructure = {
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
  contact: {
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
  avatarPath: {
    value: "",
    error: false,
    erroText: "",
    touched: true,
    validation: [],
  },
};

class CreateUserForm extends Component {
  static contextType = SnackbarContext;
  state = {
    submit: false,
    isSubmitting: false,
    formData: formDataStructure,
  };

  onInputChangeHandler = (event) => {
    const formData = { ...this.state.formData };
    if (event.target.name === "avatarPath") {
      formData[event.target.name].value = event.target.files[0];
      if (event.target.files.length > 0) {
        this.setState({
          formData,
        });
      }
      return;
    }
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

  onSubmitHandler = async (event) => {
    this.setState({
      isSubmitting: true,
    });
    event.preventDefault();
    const formData = { ...this.state.formData };
    if (this.state.submit) {
      const data = new FormData();
      data.append("name", formData.name.value);
      data.append("email", formData.email.value);
      data.append("password", formData.password.value);
      data.append("role", formData.role.value);
      data.append("contact", formData.contact.value);
      formData.avatarPath.value !== "" &&
        data.append("avatarPath", formData.avatarPath.value);

      setAuthToken();
      try {
        const result = await axios({
          method: "POST",
          url: "http://localhost:8000/api/scmusers/",
          data,
        });
        if (result.data.status === "success") {
          this.setState({
            isSubmitting: false,
            formData: formDataStructure,
            submit: false,
          });
          this.context.viewSnackbar("User Created Successfully");
          this.props.history.push("/admin/users");
        }
      } catch (error) {
        this.setState({ isSubmitting: false });
        console.log(error.response.data);
        error.response.data?.error.map((e) => this.context.viewSnackbar(e));
      }
    }
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
        <h3>Become a Member</h3>
        <form className={classes.formBody} onSubmit={this.reset}>
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
            name="contact"
            value={formData.contact.value}
            placeholder="Contact"
            onInputChangeHandler={this.onInputChangeHandler}
            onBlurHandler={this.onBlurHandler}
            error={formData.contact.error}
            helperText={formData.contact.errorText}
          />
          <div className={classes.inputFileRoot}>
            <FormLabel>Avatar Image</FormLabel>
            <input
              accept="image/*"
              name="avatarPath"
              className={classes.inputFile}
              onChange={this.onInputChangeHandler}
              type="file"
            />
          </div>
          <div className={classes.formGroup}>
            <ComponentWithLoading isLoading={this.state.isSubmitting}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.onSubmitHandler}
                disabled={!this.state.submit}
              >
                Create
              </Button>
            </ComponentWithLoading>
          </div>
        </form>
      </Paper>
    );
  }
}

export default withFormValidation(withStyles(styles)(CreateUserForm));
