import { Chip, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader/MainHeader";
import TableView from "../../../components/TableView/TableView";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";

import styles from "./UserBatchStyles";

const batchTableHeaders = [
  "Batch ID",
  "Associated Contract ID",
  "Status",
  "Actions Required",
];

const currentUser = {
  userId: "USER_001",
  name: "Sonish Maharjan",
  email: "sonishmaharjan1@gmail.com",
  password: "test1234",
  contact: "98989898",
  address: "Nepal, Lalitpur",
  role: "SHIPPER",
};

class UserBatches extends Component {
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
      {
        batchId: "bat_030",
        status: "SHIPPING",
        typeOfSeed: "Arabica",
        coffeeFamily: "Black",
        fertilizersUsed: ["Compost", "Manure"],
        harvestedDateTime: "2021/07/19",
        warehouseName: "KTM Express",
        shippingQuantity: 120,
        shipId: "ship_001",
        contract: "con__2",
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

  render() {
    const batchTableData = this.state.batches;
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
                actionsRequired: this.canUserUpdate(
                  currentUser.role,
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
        </WhiteCard>
      </div>
    );
  }
}

export default withStyles(styles)(UserBatches);
