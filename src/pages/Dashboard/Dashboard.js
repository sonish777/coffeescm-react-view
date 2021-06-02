import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import MainHeader from "../../components/MainHeader/MainHeader";
import styles from "./DashboardStyles";
import UserDetailCard from "../../components/UserDetailCard/UserDetailCard";
import WhiteCard from "../../components/WhiteCard/WhiteCard";
import TableView from "../../components/TableView/TableView";

const transactionsTableHeaders = [
  "Transaction ID",
  "Transaction Type",
  "Participant Invoking",
  "Transaction Timestamp",
];

const transactionTableData = [
  {
    transactionId:
      "f6b09e9a3f9f0f5b42a2d77878f45565e6c29a8c2ae909c0da11d3d97a255da9",
    transactionType: "AddParticipant",
    participantInvoking: "admin",
    transactionTimestamp: "2021-05-30T15:54:42.598Z",
  },
  {
    transactionId:
      "f6b09e9a3f9f0f5b42a2d77878f45565e6c29a8c2ae909c0da11d3d97a255da2",
    transactionType: "CreateContract",
    participantInvoking: "g1",
    transactionTimestamp: "2021-05-30T15:54:42.598Z",
  },
  {
    transactionId:
      "f6b09e9a3f9f0f5b42a2d77878f45565e6c29a8c2ae909c0da11d3d97a255das",
    transactionType: "InspectBatcg",
    participantInvoking: "fi1",
    transactionTimestamp: "2021-05-30T15:54:42.598Z",
  },
  {
    transactionId:
      "f6b09e9a3f9f0f5b42a2d77878f45565e6c29a8c2ae909c0da11d3d97a255dj6",
    transactionType: "ShipBatch",
    participantInvoking: "s1",
    transactionTimestamp: "2021-05-30T15:54:42.598Z",
  },
  {
    transactionId:
      "f6b09e9a3f9f0f5b42a2d77878f45565e6c29a8c2ae909c0da11d3d97a255dl1",
    transactionType: "ProcessBatch",
    participantInvoking: "p1",
    transactionTimestamp: "2021-05-30T15:54:42.598Z",
  },
  {
    transactionId:
      "f6b09e9a3f9f0f5b42a2d77878f45565e6c29a8c2ae909c0da11d3d97a255d09",
    transactionType: "AddContractParticipant",
    participantInvoking: "admin",
    transactionTimestamp: "2021-05-30T15:54:42.598Z",
  },
  {
    transactionId:
      "f6b09e9a3f9f0f5b42a2d77878f45565e6c29a8c2ae909c0da11d3d97a255as7",
    transactionType: "AddParticipant",
    participantInvoking: "admin",
    transactionTimestamp: "2021-05-30T15:54:42.598Z",
  },
  {
    transactionId:
      "f6b09e9a3f9f0f5b42a2d77878f45565e6c29a8c2ae909c0da11d3d97a255ll2",
    transactionType: "AddParticipant",
    participantInvoking: "admin",
    transactionTimestamp: "2021-05-30T15:54:42.598Z",
  },
];

const currentUser = {
  userId: "USER_001",
  name: "Sonish Maharjan",
  email: "sonishmaharjan1@gmail.com",
  password: "test1234",
  contact: "98989898",
  address: "Nepal, Lalitpur",
};

class Dashboard extends Component {
  render() {
    return (
      <div>
        <MainHeader>Dashboard</MainHeader>
        <WhiteCard>
          <UserDetailCard user={currentUser} />
        </WhiteCard>
        <MainHeader>Transactions</MainHeader>
        <WhiteCard>
          <TableView
            tableHeaders={transactionsTableHeaders}
            tableData={transactionTableData}
          />
        </WhiteCard>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
