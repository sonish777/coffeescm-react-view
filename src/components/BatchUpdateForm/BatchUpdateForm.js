import { Button, Paper, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import withFormValidation from "../../hoc/withFormValidation/withFormValidation";
import Input from "../Input/Input";
import styles from "./BatchUpdateFormStyles";

const formDataMap = {
  GROWER: null,
  FARMINSPECTOR: {
    typeOfSeed: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "typeOfSeed",
        placeholder: "Type of Seed",
      },
    },
    coffeeFamily: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "coffeeFamily",
        placeholder: "Coffee Family",
      },
    },
    fertilizersUsed: {
      value: [],
      error: false,
      errorText: "",
      touched: false,
      validation: [],
      config: {
        elementType: "input",
        name: "fertilizersUsed",
        placeholder: "Fertilizers Used",
      },
    },
  },
  SHIPPER: {
    shippingQuantity: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "shippingQuantity",
        placeholder: "Shipping Quantity",
      },
    },
    shipId: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "shipId",
        placeholder: "Ship ID",
      },
    },
    warehouseName: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "warehouseName",
        placeholder: "Warehouse Name",
      },
    },
  },
  PROCESSOR: {
    roastingTime: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "roastingTime",
        placeholder: "Roasting Time (min)",
      },
    },
    roastingTemperature: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "roastingTemperature",
        placeholder: "Roasting Temperature (C)",
      },
    },
    packagedCount: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "packagedCount",
        placeholder: "Packaged Count (packets)",
      },
    },
  },
};

class BatchUpdateForm extends Component {
  state = {
    submit: false,
    formData: this.props.role !== "GROWER" && formDataMap[this.props.role],
    formRef: React.createRef(),
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

  onSubmitHandler = (event) => {
    event.preventDefault();
    const formData = { ...this.state.formData };
    this.state.submit && console.log(formData);
  };

  componentDidMount() {
    this.state.formRef.current.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { classes } = this.props;
    const { formData, formRef } = this.state;
    return (
      <Paper className={classes.root}>
        <h3>Update Data</h3>
        <form id="update-form" ref={formRef}>
          {formData &&
            Object.values(formData).map((el) => (
              <Input
                key={el.config.name}
                {...el.config}
                value={el.value}
                onInputChangeHandler={this.onInputChangeHandler}
                onBlurHandler={this.onBlurHandler}
                error={el.error}
                helperText={el.errorText}
              />
            ))}
          <Button
            variant="contained"
            color="primary"
            onClick={this.onSubmitHandler}
            disabled={formData && !this.state.submit}
          >
            {formData ? "Submit" : "Harvest"}
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withFormValidation(withStyles(styles)(BatchUpdateForm));
