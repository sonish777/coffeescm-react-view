import { Button, Chip, withStyles } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import MainHeader from "../../components/MainHeader/MainHeader";
import TableView from "../../components/TableView/TableView";
import WhiteCard from "../../components/WhiteCard/WhiteCard";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { setAuthToken } from "../../helpers";
import ComponentWithLoading from "../../hoc/ComponentWithLoading";
import styles from "./ContractsStyle";
import ModalView from "../../components/ModalView/ModalView";
import Input from "../../components/Input/Input";

const contractTableHeaders = [
  "Contract Id",
  "Associated Batch Id",
  "Created At",
  "Active",
];

class Contracts extends Component {
  static contextType = SnackbarContext;
  state = {
    contracts: [],
    isSubmitting: false,
    showCreateContractForm: false,
    grower: "",
  };

  async componentDidMount() {
    this.loadContracts();
  }

  loadContracts = async () => {
    try {
      setAuthToken();
      const result = await axios.get("http://localhost:8000/api/contracts/");
      if (result.data.status === "success") {
        this.setState({
          contracts: result.data.data,
          isSubmitting: false,
          grower: "",
          showCreateContractForm: false,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      error.response.data?.error.map((e) => this.context.viewSnackbar(e));
    }
  };

  reloadContracts = () => {
    this.loadContracts();
  };

  onCreateContractHandler = async (e) => {
    this.setState({ isSubmitting: true });
    try {
      setAuthToken();
      const result = await axios({
        method: "POST",
        url: "http://localhost:8000/api/contracts",
        data: window.location.pathname.includes("/admin")
          ? {
              grower: this.state.grower,
            }
          : {},
      });
      if (result.data.status === "success") {
        this.context.viewSnackbar("Contract created successfully");
        this.reloadContracts();
      }
    } catch (error) {
      this.setState({ isSubmitting: false });
      console.log(error.response.data);
      error.response.data?.error.forEach((e) => this.context.viewSnackbar(e));
    }
  };

  openCreateCotractForm = () => {
    this.setState({
      showCreateContractForm: true,
    });
  };

  closeCreateContractForm = () => {
    this.setState({
      showCreateContractForm: false,
    });
  };

  onInputChangeHandler = (e) => {
    this.setState({
      grower: e.target.value,
    });
  };

  render() {
    const { contracts, showCreateContractForm, grower } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <ModalView
          open={showCreateContractForm}
          onCloseHandler={this.closeCreateContractForm}
          modalHeader="Create New Contract"
        >
          <Input
            elementType="input"
            name="grower"
            value={grower}
            placeholder="Grower ID"
            onInputChangeHandler={this.onInputChangeHandler}
          />

          <ComponentWithLoading isLoading={this.state.isSubmitting}>
            <Button
              color="primary"
              variant="outlined"
              onClick={this.onCreateContractHandler}
            >
              Submit
            </Button>
          </ComponentWithLoading>
        </ModalView>
        <header className={classes.contractHeader}>
          <MainHeader>Contracts</MainHeader>
          <Button
            onClick={
              window.location.pathname.includes("/admin")
                ? this.openCreateCotractForm
                : this.onCreateContractHandler
            }
          >
            <ComponentWithLoading isLoading={this.state.isSubmitting}>
              Create New Contract
            </ComponentWithLoading>
          </Button>
        </header>
        <WhiteCard>
          <ComponentWithLoading isLoading={contracts.length === 0}>
            <TableView
              tableHeaders={contractTableHeaders}
              tableData={contracts.map((row) => {
                return {
                  contractId: row.contractId,
                  batchId: row.batch.batchId,
                  createdAt: row.createdDateTime,
                  active: row.active ? (
                    <Chip color="primary" label="Active" size="small" />
                  ) : (
                    <Chip color="secondary" label="Completed" size="small" />
                  ),
                };
              })}
              links={true}
            />
          </ComponentWithLoading>
        </WhiteCard>
      </div>
    );
  }
}
export default withStyles(styles)(Contracts);
