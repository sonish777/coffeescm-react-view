import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader/MainHeader";
import UserDetailCard from "../../../components/UserDetailCard/UserDetailCard";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import { UserContext } from "../../../contexts/UserContext";

export default class UserDashboard extends Component {
  static contextType = UserContext;
  render() {
    return (
      <div>
        <MainHeader>User Dashboard</MainHeader>
        <WhiteCard>
          <UserDetailCard user={this.context.currentUser} />
        </WhiteCard>
      </div>
    );
  }
}
