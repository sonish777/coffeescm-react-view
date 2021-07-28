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
import { UserContext } from "../../../contexts/UserContext";
import ComponentWithLoading from "../../../hoc/ComponentWithLoading";
import { setAuthToken } from "../../../helpers";

const transactionsTableHeaders = [
  "Transaction ID",
  "Transaction Type",
  "Participant Invoking",
  "Transaction Timestamp",
  "Actions",
];

class Dashboard extends Component {
  static contextType = UserContext;
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
    setAuthToken();
    const { data } = await axios.get(
      "http://192.168.246.128:8000/api/system/historian"
    );
    if (data.status === "success") {
      this.setState({
        transactions: data.data
          .sort(
            (a, b) =>
              new Date(b.transactionTimestamp) -
              new Date(a.transactionTimestamp)
          )
          .map((t) => {
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
    const { currentUser } = this.context;
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
          <ComponentWithLoading isLoading={!currentUser}>
            <UserDetailCard user={currentUser} />
          </ComponentWithLoading>
        </WhiteCard>
        <MainHeader>Transactions</MainHeader>
        <WhiteCard>
          <ComponentWithLoading isLoading={transactions.length === 0}>
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
          </ComponentWithLoading>
        </WhiteCard>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
