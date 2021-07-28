import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import jsonPretty from "json-pretty-html";
import ReactHtmlParser from "react-html-parser";

import MainHeader from "../../../components/MainHeader/MainHeader";
import ModalView from "../../../components/ModalView/ModalView";
import TableView from "../../../components/TableView/TableView";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import styles from "./UsersStyle";
import { SnackbarContext } from "../../../contexts/SnackbarContext";

import "./json-pretty.css";
import { setAuthToken } from "../../../helpers";
import axios from "axios";
import ComponentWithLoading from "../../../hoc/ComponentWithLoading";

const userTableHeaders = ["User Id", "Name", "State", "Actions"];

class Users extends Component {
  static contextType = SnackbarContext;

  state = {
    viewCertificate: false,
    currentCertificate: {},
    users: [],
  };

  async componentDidMount() {
    try {
      setAuthToken();
      const result = await axios.get(
        "http://192.168.246.128:8000/api/system/identities"
      );
      if (result.data.status === "success") {
        console.log(result.data);
        this.setState({
          users: result.data.data,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      this.context.viewSnackbar(
        "Something went wrong while fetching user data"
      );
    }
  }

  viewCertificateHandler = (id) => {
    this.setState({
      viewCertificate: true,
      currentCertificate: this.state.users[id],
    });
  };

  closeCertificateHandler = () => {
    this.setState({
      viewCertificate: false,
      currentCertificate: {},
    });
  };

  render() {
    const { users } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <ModalView
          open={this.state.viewCertificate}
          onCloseHandler={this.closeCertificateHandler}
          modalHeader="X.502 Certificate"
        >
          {ReactHtmlParser(
            jsonPretty(
              this.state.currentCertificate,
              this.state.currentCertificate.dimensions
            )
          )}
        </ModalView>
        <div className={classes.header}>
          <MainHeader>Users</MainHeader>
          <Link to="/admin/users/create" className={classes.link}>
            Create User
          </Link>
        </div>
        <WhiteCard>
          <ComponentWithLoading isLoading={this.state.users.length === 0}>
            <TableView
              tableHeaders={userTableHeaders}
              tableData={users.map((u) => {
                return {
                  userId: u.participant.split("#")[1],
                  // identityId: u.identityId,
                  name: u.name,
                  state: u.state,
                };
              })}
              actions={true}
              actionHandlers={[
                {
                  text: "View Certificate",
                  handler: this.viewCertificateHandler,
                },
              ]}
            />
          </ComponentWithLoading>
        </WhiteCard>
      </div>
    );
  }
}

export default withStyles(styles)(Users);
