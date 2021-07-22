import { Chip } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader/MainHeader";
import TableView from "../../../components/TableView/TableView";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import ComponentWithLoading from "../../../hoc/ComponentWithLoading";

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
  };

  async componentDidMount() {
    try {
      const result = await axios.get("http://localhost:8000/api/contracts/");
      if (result.data.status === "success") {
        this.setState({
          contracts: result.data.data,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      error.response.data?.error.map((e) => this.context.viewSnackbar(e));
    }
  }
  render() {
    const { contracts } = this.state;
    return (
      <div>
        <MainHeader>Contracts</MainHeader>
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
export default Contracts;
