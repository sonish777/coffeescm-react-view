import { Button, Chip, Paper, Typography, withStyles } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { setAuthToken } from "../../helpers";
import withFormValidation from "../../hoc/withFormValidation/withFormValidation";
import Input from "../Input/Input";
import styles from "./BatchUpdateFormStyles";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import ComponentWithLoading from "../../hoc/ComponentWithLoading";

const formDataMap = {
  GROWER: {
    dryParchmentQuantity: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }, { type: "MINVAL", value: 1 }],
      config: {
        elementType: "number",
        name: "dryParchmentQuantity",
        placeholder: "Dry Parchment Quantity (KG)",
        min: 1,
      },
    },
  },
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
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "fertilizersUsed",
        placeholder: "Fertilizers Used (Separated by Comma)",
      },
    },
  },
  SHIPPER: {
    shippingQuantity: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }, { type: "MINVAL", value: 1 }],
      config: {
        elementType: "number",
        name: "shippingQuantity",
        placeholder: "Shipping Quantity (KG)",
        min: 1,
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
    shipName: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "shipName",
        placeholder: "Ship Name",
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
    warehouseAddress: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "input",
        name: "warehouseAddress",
        placeholder: "Warehouse Address",
      },
    },
  },

  PROCESSOR: {
    roastingTime: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }, { type: "MINVAL", value: 5 }],
      config: {
        elementType: "number",
        name: "roastingTime",
        placeholder: "Roasting Time (min)",
        min: 5,
      },
    },
    temperature: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }, { type: "MINVAL", value: 20 }],
      config: {
        elementType: "number",
        name: "temperature",
        placeholder: "Roasting Temperature (C)",
        min: 20,
      },
    },
    packagedCount: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }, { type: "MINVAL", value: 1 }],
      config: {
        elementType: "number",
        name: "packagedCount",
        placeholder: "Packaged Count (packets)",
        min: 1,
      },
    },
    packagingDateTime: {
      value: "",
      error: false,
      errorText: "",
      touched: false,
      validation: [{ type: "REQUIRED" }],
      config: {
        elementType: "date",
        name: "packagingDateTime",
        placeholder: "Packaged Date Time",
      },
    },
  },
};

const mapUpdateType = (role) => {
  switch (role) {
    case "GROWER":
      return "harvest";
    case "FARMINSPECTOR":
      return "inspect";
    case "SHIPPER":
      return "ship";
    case "PROCESSOR":
      return "process";
    default:
      return "";
  }
};

class BatchUpdateForm extends Component {
  static contextType = SnackbarContext;
  state = {
    submit: false,
    formData: formDataMap[this.props.role],
    formRef: React.createRef(),
    isUpdating: false,
    chips: [],
  };

  makeChips = (value) => {
    const chips = value.split(",");
    this.setState({
      chips,
    });
  };

  onInputChangeHandler = (event) => {
    const formData = { ...this.state.formData };
    if (event.target.name === "fertilizersUsed") {
      this.makeChips(event.target.value);
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

  onSubmitHandler = async (event) => {
    this.setState({
      isUpdating: true,
    });
    event.preventDefault();
    const formData = { ...this.state.formData };
    if (this.state.submit) {
      const data = {};
      const updateType = mapUpdateType(this.props.role);
      Object.keys(formData).map((key) => {
        if (key === "fertilizersUsed") {
          data[key] = formData[key].value.split(",");
        } else data[key] = formData[key].value;
      });
      const { batchId } = this.props.match.params;
      try {
        setAuthToken();
        const result = await axios({
          method: "PATCH",
          url: `http://localhost:8000/api/batches/${batchId}/${updateType}`,
          data,
        });
        if (result.data.status === "success") {
          this.context.viewSnackbar("Updated Successfully");
          this.props.updateBatchHandler();
          this.setState({
            formData: formDataMap[this.props.role],
          });
          console.log(result.data);
        }
      } catch (error) {
        this.setState({
          isUpdating: false,
        });
        console.log(error.response.data);
        error.response.data?.error.map((e) => this.context.viewSnackbar(e));
      }
    }
  };

  componentDidMount() {
    this.state.formRef.current.scrollIntoView({ behavior: "smooth" });
    this.setState({
      formData: formDataMap[this.props.role],
    });
  }

  render() {
    const { classes, role } = this.props;
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
          {role === "FARMINSPECTOR" && (
            <div style={{ margin: "4px 0" }}>
              {this.state.chips.map(
                (c, i) =>
                  c.trim().length > 0 && (
                    <Chip
                      key={i}
                      label={c}
                      variant="outlined"
                      style={{ margin: "2px" }}
                    />
                  )
              )}
            </div>
          )}
          <ComponentWithLoading isLoading={this.state.isUpdating}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSubmitHandler}
              disabled={formData && !this.state.submit}
            >
              Submit
            </Button>
          </ComponentWithLoading>
        </form>
      </Paper>
    );
  }
}

export default withFormValidation(
  withRouter(withStyles(styles)(BatchUpdateForm))
);
