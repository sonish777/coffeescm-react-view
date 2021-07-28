import { Chip, Typography, withStyles } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";

import MainHeader from "../../../components/MainHeader/MainHeader";
import TableView from "../../../components/TableView/TableView";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import { UserContext } from "../../../contexts/UserContext";
import { setAuthToken } from "../../../helpers";
import ComponentWithLoading from "../../../hoc/ComponentWithLoading";

import styles from "./UserBatchStyles";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

const batchTableHeaders = [
  "Batch ID",
  "Associated Contract ID",
  "Status",
  "Actions Required",
];

class UserBatches extends Component {
  static contextType = SnackbarContext;
  state = {
    batches: [],
    isLoading: true,
  };

  async componentDidMount() {
    try {
      setAuthToken();
      const result = await axios.get("http://192.168.246.128:8000/api/batches");
      if (result.data.status === "success") {
        console.log(result.data);
        this.setState({
          batches: result.data.data.sort(
            (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime)
          ),
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error.response.data);
      error.response.data?.error.map((e) => this.context.viewSnackbar(e));
    }
  }

  canUserUpdate = (role, batchStatus) => {
    switch (role) {
      case "GROWER":
        return batchStatus === "INSPECTION";
      case "FARMINSPECTOR":
        return batchStatus === "GROWING";
      case "SHIPPER":
        return batchStatus === "HARVESTED";
      case "PROCESSOR":
        return batchStatus === "SHIPPING";
      default:
        return false;
    }
  };

  render() {
    const batchTableData = this.state.batches;

    return (
      <div>
        <MainHeader>My Batches</MainHeader>
        <WhiteCard>
          <UserContext.Consumer>
            {(context) => (
              <ComponentWithLoading isLoading={this.state.isLoading}>
                {batchTableData.length === 0 ? (
                  <Typography>
                    Oops! You are not involved in any batches yet.
                  </Typography>
                ) : (
                  <TableView
                    currentUser={context.currentUser}
                    tableHeaders={batchTableHeaders}
                    tableData={batchTableData.map((row) => {
                      return {
                        batchId: row.batchId,
                        contract: row.contract.contractId,
                        status:
                          row.status === "PROCESSING" ? (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <AssignmentTurnedInIcon
                                style={{ color: "green", marginRight: "2px" }}
                              />
                              <Typography variant="body2">PROCESSED</Typography>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AssignmentTurnedInIcon
                                style={{ marginRight: "2px" }}
                              />{" "}
                              <Typography variant="body2">
                                {row.status}
                              </Typography>
                            </div>
                          ),
                        actionsRequired: this.canUserUpdate(
                          context.currentUser.role,
                          row.status
                        ) ? (
                          <Chip
                            color="secondary"
                            label="Update Available"
                            clickable
                            size="small"
                          />
                        ) : (
                          "-"
                        ),
                      };
                    })}
                    links={true}
                  />
                )}
              </ComponentWithLoading>
            )}
          </UserContext.Consumer>
        </WhiteCard>
      </div>
    );
  }
}

export default withStyles(styles)(UserBatches);
