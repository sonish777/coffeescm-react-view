import { Typography } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader/MainHeader";
import TableView from "../../../components/TableView/TableView";
import UserDetailCard from "../../../components/UserDetailCard/UserDetailCard";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import { UserContext } from "../../../contexts/UserContext";
import { setAuthToken } from "../../../helpers";

const donationTableHeaders = [
  "Donation ID",
  "Message",
  "Donated Amount (RS)",
  "Donated By",
];

export default class UserDashboard extends Component {
  static contextType = UserContext;

  state = {
    donations: [],
  };

  async componentDidMount() {
    try {
      setAuthToken();
      const result = await axios({
        method: "GET",
        url: `http://localhost:8000/api/scmusers/donations`,
      });
      if (result.data.status === "success") {
        console.log(result.data);
        this.setState({
          donations: result.data.data,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }

  render() {
    const { donations } = this.state;
    return (
      <div>
        <MainHeader>User Dashboard</MainHeader>
        <WhiteCard>
          <UserDetailCard user={this.context.currentUser} />
        </WhiteCard>
        {this.context.currentUser.role === "GROWER" && (
          <div>
            <MainHeader>My Donations</MainHeader>
            <WhiteCard>
              {donations.length > 0 ? (
                <TableView
                  tableHeaders={donationTableHeaders}
                  tableData={donations.map((el) => {
                    return {
                      donationId: el.donationId,
                      donationMessage: el.donationMessage,
                      donationAmt: el.donationAmt,
                      donatedBy: el.customer.customerName,
                    };
                  })}
                />
              ) : (
                <Typography>
                  Oops! You haven't received any donations yet.
                </Typography>
              )}
            </WhiteCard>
          </div>
        )}
      </div>
    );
  }
}
