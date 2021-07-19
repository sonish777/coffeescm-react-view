import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader/MainHeader";
import TableView from "../../../components/TableView/TableView";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";

const batchTableHeaders = [
  "Batch ID",
  "Associated Contract ID",
  "Status",
  "Actions",
];

export default class UserBatches extends Component {
  state = {
    batches: [
      {
        batchId: "bat_001",
        status: "GROWING",
        contract: "con__1",
      },
      {
        batchId: "bat_002",
        status: "PROCESSING",
        typeOfSeed: "Arabica",
        coffeeFamily: "Black",
        fertilizersUsed: ["Compost", "Manure"],
        harvestedDateTime: "2021/07/19",
        warehouseName: "KTM Express",
        shippingQuantity: 120,
        shipId: "ship_001",
        contract: "con__2",
      },
      {
        batchId: "bat_003",
        status: "INSPECTION",
        typeOfSeed: "Arabica",
        coffeeFamily: "Black",
        fertilizersUsed: ["Compost", "Manure"],
        contract: "con__3",
      },
      {
        batchId: "bat_005",
        status: "HARVESTED",
        typeOfSeed: "Arabica",
        coffeeFamily: "Black",
        fertilizersUsed: ["Compost", "Manure"],
        harvestedDateTime: "2021/07/19",
        contract: "con__4",
      },
      {
        batchId: "bat_007",
        status: "HARVESTED",
        typeOfSeed: "Arabica",
        coffeeFamily: "Black",
        fertilizersUsed: ["Compost", "Manure"],
        harvestedDateTime: "2021/07/19",
        contract: "con__4",
      },
      {
        batchId: "bat_022",
        status: "HARVESTED",
        typeOfSeed: "Arabica",
        coffeeFamily: "Black",
        fertilizersUsed: ["Compost", "Manure"],
        harvestedDateTime: "2021/07/19",
        contract: "con__4",
      },
    ],
  };

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

  handleUpdate = (idx) => {
    const currentBatch = this.state.batches[idx];
    console.log(currentBatch);
  };

  render() {
    const batchTableData = this.state.batches;
    const currentUser = this.props.currentUser;
    return (
      <div>
        <MainHeader>My Batches</MainHeader>
        <WhiteCard>
          <TableView
            currentUser={currentUser}
            tableHeaders={batchTableHeaders}
            tableData={batchTableData.map((row) => {
              return {
                batchId: row.batchId,
                contract: row.contract,
                status: row.status,
              };
            })}
            actions={true}
            actionHandlers={[
              {
                text: "Update",
                handler: this.handleUpdate,
                updateBatch: true,
              },
            ]}
            links={true}
          />
        </WhiteCard>
      </div>
    );
  }
}
