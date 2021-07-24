import { Chip, withStyles } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader/MainHeader";
import TableView from "../../../components/TableView/TableView";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import { UserContext } from "../../../contexts/UserContext";
import { setAuthToken } from "../../../helpers";
import ComponentWithLoading from "../../../hoc/ComponentWithLoading";

import styles from "./UserBatchStyles";

const batchTableHeaders = [
  "Batch ID",
  "Associated Contract ID",
  "Status",
  "Actions Required",
];

class UserBatches extends Component {
  static contextType = UserContext;
  state = {
    batches: [],
  };

  async componentDidMount() {
    try {
      setAuthToken();
      const result = await axios.get("http://localhost:8000/api/batches");
      if (result.data.status === "success") {
        console.log(result.data);
        this.setState({
          batches: result.data.data,
        });
      }
    } catch (error) {
      console.log(error.response.data);
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
    const context = this.context;

    return (
      <div>
        <MainHeader>My Batches</MainHeader>
        <WhiteCard>
          <ComponentWithLoading isLoading={batchTableData.length === 0}>
            <TableView
              currentUser={context.currentUser}
              tableHeaders={batchTableHeaders}
              tableData={batchTableData.map((row) => {
                return {
                  batchId: row.batchId,
                  contract: row.contract.contractId,
                  status: row.status,
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
          </ComponentWithLoading>
        </WhiteCard>
      </div>
    );
  }
}

export default withStyles(styles)(UserBatches);
