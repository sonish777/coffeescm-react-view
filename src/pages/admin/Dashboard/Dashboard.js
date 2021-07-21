import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import jsonPretty from "json-pretty-html";
import ReactHtmlParser from "react-html-parser";

import MainHeader from "../../../components/MainHeader/MainHeader";
import styles from "./DashboardStyles";
import UserDetailCard from "../../../components/UserDetailCard/UserDetailCard";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import TableView from "../../../components/TableView/TableView";
import ModalView from "../../../components/ModalView/ModalView";
import "./json-pretty.css";

const transactionsTableHeaders = [
  "Transaction ID",
  "Transaction Type",
  "Participant Invoking",
  "Transaction Timestamp",
  "Actions",
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
  state = {
    transactions: [],
    viewTransactionDetail: false,
    transactionDetail: {},
  };

  viewTransactionDetailHandler = (idx) => {
    this.setState({
      transactionDetail: this.state.transactions[idx],
      viewTransactionDetail: true,
    });
  };

  closeTransactionDetailHandler = (idx) => {
    this.setState({
      transactionDetail: {},
      viewTransactionDetail: false,
    });
  };

  async componentDidMount() {
    const { data } = await axios.get(
      "http://localhost:8000/api/system/historian"
    );
    if (data.status === "success") {
      this.setState({
        transactions: data.data.map((t) => {
          return {
            ...t,
            transactionType:
              t.transactionType.split(".")[
                t.transactionType.split(".").length - 1
              ],
            participantInvoking: t.participantInvoking
              ? t.participantInvoking.split("#")[1].toUpperCase()
              : "-",
            transactionTimestamp: `${t.transactionTimestamp.split("T")[0]}\n${
              t.transactionTimestamp.split("T")[1].split(".")[0]
            }`,
          };
        }),
      });
    }
  }

  render() {
    const { transactions, viewTransactionDetail, transactionDetail } =
      this.state;
    return (
      <div>
        {viewTransactionDetail > 0 && (
          <ModalView
            open={viewTransactionDetail}
            onCloseHandler={this.closeTransactionDetailHandler}
            modalHeader="Transaction Details"
          >
            <h5>Transaction ID</h5>
            <span>{transactionDetail.transactionId}</span>
            <h5>Resources</h5>
            {ReactHtmlParser(
              jsonPretty(
                transactionDetail.eventsEmitted[0],
                transactionDetail.eventsEmitted[0]?.dimensions
              )
            )}
          </ModalView>
        )}
        <MainHeader>Dashboard</MainHeader>
        <WhiteCard>
          <UserDetailCard user={currentUser} />
        </WhiteCard>
        <MainHeader>Transactions</MainHeader>
        <WhiteCard>
          <TableView
            tableHeaders={transactionsTableHeaders}
            tableData={transactions.map((t) => {
              return {
                transactionId: t.transactionId,
                transactionType: t.transactionType,
                participantInvoking: t.participantInvoking,
                transactionTimestamp: t.transactionTimestamp,
              };
            })}
            actions={true}
            actionHandlers={[
              {
                handler: this.viewTransactionDetailHandler,
                text: "Details",
              },
            ]}
          />
        </WhiteCard>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
