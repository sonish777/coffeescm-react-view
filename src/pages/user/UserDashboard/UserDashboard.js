import React, { Component } from "react";
import MainHeader from "../../../components/MainHeader/MainHeader";
import UserDetailCard from "../../../components/UserDetailCard/UserDetailCard";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";

const currentUser = {
  userId: "USER_001",
  name: "Sonish Maharjan",
  email: "sonishmaharjan1@gmail.com",
  password: "test1234",
  contact: "98989898",
  address: "Nepal, Lalitpur",
  role: "GROWER",
};

export default class UserDashboard extends Component {
  render() {
    return (
      <div>
        <MainHeader>User Dashboard</MainHeader>
        <WhiteCard>
          <UserDetailCard user={currentUser} />
        </WhiteCard>
      </div>
    );
  }
}
