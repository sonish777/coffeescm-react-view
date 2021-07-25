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

import "./json-pretty.css";

const userTableHeaders = ["User Id", "Identity Id", "Name", "State", "Actions"];

const userTableData = [
  {
    userId: "sonish1234",
    identityId:
      "fafa3511f7a9839397512b585b1086d85352885b0981a93092e23401c0469018",
    name: "admin",
    certificate:
      "-----BEGIN CERTIFICATE-----\nMIICATCCAaigAwIBAgIUKCRGKMISlNXxWcXQB91Qu3jCgpcwCgYIKoZIzj0EAwIw\nczELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh\nbiBGcmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMT\nE2NhLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwNTI4MTMzNDAwWhcNMjIwNTI4MTMz\nOTAwWjAhMQ8wDQYDVQQLEwZjbGllbnQxDjAMBgNVBAMTBWFkbWluMFkwEwYHKoZI\nzj0CAQYIKoZIzj0DAQcDQgAEvreJZy9JVcC6bhbJ4DpX/sbnItwTJXp8QGeBSWhn\nyKe/wy4hSlHdvlDAEfFX53YT7nwH/X7Y5z+wTZgKoOq/mqNsMGowDgYDVR0PAQH/\nBAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFKCdGEK5ck9KB3KJfbKyN9qP\nZkumMCsGA1UdIwQkMCKAIBmrZau7BIB9rRLkwKmqpmSecIaOOr0CF6Mi2J5H4aau\nMAoGCCqGSM49BAMCA0cAMEQCIB8vTq90ZxA0CCjmktCGscvTkI4OFPIRWK+qWZul\n2YJDAiBFr0wIjwJTGFTXpc2/aV6S6nufgOzK0kUBaDuhezVccw==\n-----END CERTIFICATE-----\n",
    state: "ACTIVATED",
  },
  {
    userId: "binu12",
    identityId:
      "fafa3511f7a9839397512b585b1086d85352885b0981a93092e23401c04690as2",
    name: "admin",
    certificate:
      "-----BEGIN CERTIFICATE-----\nSIIcaATCCAaigAwIBAgIUKCRGKMISlNXxWcXQB91Qu3jCgpcwCgYIKoZIzj0EAwIw\nczELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh\nbiBGcmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMT\nE2NhLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwNTI4MTMzNDAwWhcNMjIwNTI4MTMz\nOTAwWjAhMQ8wDQYDVQQLEwZjbGllbnQxDjAMBgNVBAMTBWFkbWluMFkwEwYHKoZI\nzj0CAQYIKoZIzj0DAQcDQgAEvreJZy9JVcC6bhbJ4DpX/sbnItwTJXp8QGeBSWhn\nyKe/wy4hSlHdvlDAEfFX53YT7nwH/X7Y5z+wTZgKoOq/mqNsMGowDgYDVR0PAQH/\nBAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFKCdGEK5ck9KB3KJfbKyN9qP\nZkumMCsGA1UdIwQkMCKAIBmrZau7BIB9rRLkwKmqpmSecIaOOr0CF6Mi2J5H4aau\nMAoGCCqGSM49BAMCA0cAMEQCIB8vTq90ZxA0CCjmktCGscvTkI4OFPIRWK+qWZul\n2YJDAiBFr0wIjwJTGFTXpc2/aV6S6nufgOzK0kUBaDuhezVccw==\n-----END CERTIFICATE-----\n",
    state: "ACTIVATED",
  },
  {
    userId: "ash212",
    identityId:
      "fafa3511f7a9839397512b585b1086d85352885b0981a93092e23401c04690128",
    name: "admin",
    certificate:
      "-----BEGIN CERTIFICATE-----\nMASFCATCCAaigAwIBAgIUKCRGKMISlNXxWcXQB91Qu3jCgpcwCgYIKoZIzj0EAwIw\nczELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh\nbiBGcmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMT\nE2NhLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwNTI4MTMzNDAwWhcNMjIwNTI4MTMz\nOTAwWjAhMQ8wDQYDVQQLEwZjbGllbnQxDjAMBgNVBAMTBWFkbWluMFkwEwYHKoZI\nzj0CAQYIKoZIzj0DAQcDQgAEvreJZy9JVcC6bhbJ4DpX/sbnItwTJXp8QGeBSWhn\nyKe/wy4hSlHdvlDAEfFX53YT7nwH/X7Y5z+wTZgKoOq/mqNsMGowDgYDVR0PAQH/\nBAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFKCdGEK5ck9KB3KJfbKyN9qP\nZkumMCsGA1UdIwQkMCKAIBmrZau7BIB9rRLkwKmqpmSecIaOOr0CF6Mi2J5H4aau\nMAoGCCqGSM49BAMCA0cAMEQCIB8vTq90ZxA0CCjmktCGscvTkI4OFPIRWK+qWZul\n2YJDAiBFr0wIjwJTGFTXpc2/aV6S6nufgOzK0kUBaDuhezVccw==\n-----END CERTIFICATE-----\n",
    state: "ACTIVATED",
  },
  {
    userId: "07.agent",
    identityId:
      "fafa3511f7a9839397512b585b1086d85352885b0981a93092e23401c0434018",
    name: "admin",
    certificate:
      "-----BEGIN CERTIFICATE-----\nMMOMATCCAaigAwIBAgIUKCRGKMISlNXxWcXQB91Qu3jCgpcwCgYIKoZIzj0EAwIw\nczELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh\nbiBGcmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMT\nE2NhLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwNTI4MTMzNDAwWhcNMjIwNTI4MTMz\nOTAwWjAhMQ8wDQYDVQQLEwZjbGllbnQxDjAMBgNVBAMTBWFkbWluMFkwEwYHKoZI\nzj0CAQYIKoZIzj0DAQcDQgAEvreJZy9JVcC6bhbJ4DpX/sbnItwTJXp8QGeBSWhn\nyKe/wy4hSlHdvlDAEfFX53YT7nwH/X7Y5z+wTZgKoOq/mqNsMGowDgYDVR0PAQH/\nBAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFKCdGEK5ck9KB3KJfbKyN9qP\nZkumMCsGA1UdIwQkMCKAIBmrZau7BIB9rRLkwKmqpmSecIaOOr0CF6Mi2J5H4aau\nMAoGCCqGSM49BAMCA0cAMEQCIB8vTq90ZxA0CCjmktCGscvTkI4OFPIRWK+qWZul\n2YJDAiBFr0wIjwJTGFTXpc2/aV6S6nufgOzK0kUBaDuhezVccw==\n-----END CERTIFICATE-----\n",
    state: "ACTIVATED",
  },
  {
    userId: "its.heisenberg",
    identityId:
      "fafa3511f7a9839397512b585b1086d853528a6b0981a93092e23401c0469018",
    name: "admin",
    certificate:
      "-----BEGIN CERTIFICATE-----\nASKSATCCAaigAwIBAgIUKCRGKMISlNXxWcXQB91Qu3jCgpcwCgYIKoZIzj0EAwIw\nczELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh\nbiBGcmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMT\nE2NhLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwNTI4MTMzNDAwWhcNMjIwNTI4MTMz\nOTAwWjAhMQ8wDQYDVQQLEwZjbGllbnQxDjAMBgNVBAMTBWFkbWluMFkwEwYHKoZI\nzj0CAQYIKoZIzj0DAQcDQgAEvreJZy9JVcC6bhbJ4DpX/sbnItwTJXp8QGeBSWhn\nyKe/wy4hSlHdvlDAEfFX53YT7nwH/X7Y5z+wTZgKoOq/mqNsMGowDgYDVR0PAQH/\nBAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFKCdGEK5ck9KB3KJfbKyN9qP\nZkumMCsGA1UdIwQkMCKAIBmrZau7BIB9rRLkwKmqpmSecIaOOr0CF6Mi2J5H4aau\nMAoGCCqGSM49BAMCA0cAMEQCIB8vTq90ZxA0CCjmktCGscvTkI4OFPIRWK+qWZul\n2YJDAiBFr0wIjwJTGFTXpc2/aV6S6nufgOzK0kUBaDuhezVccw==\n-----END CERTIFICATE-----\n",
    state: "ACTIVATED",
  },
  {
    userId: "its.aenima",
    identityId:
      "fafa3511f7a9839397512b585b1086d853528a6b0981a93092e23401c0469abx2",
    name: "admin",
    certificate:
      "-----BEGIN CERTIFICATE-----\nMJKSSATCCAaigAwIBAgIUKCRGKMISlNXxWcXQB91Qu3jCgpcwCgYIKoZIzj0EAwIw\nczELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh\nbiBGcmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMT\nE2NhLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwNTI4MTMzNDAwWhcNMjIwNTI4MTMz\nOTAwWjAhMQ8wDQYDVQQLEwZjbGllbnQxDjAMBgNVBAMTBWFkbWluMFkwEwYHKoZI\nzj0CAQYIKoZIzj0DAQcDQgAEvreJZy9JVcC6bhbJ4DpX/sbnItwTJXp8QGeBSWhn\nyKe/wy4hSlHdvlDAEfFX53YT7nwH/X7Y5z+wTZgKoOq/mqNsMGowDgYDVR0PAQH/\nBAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFKCdGEK5ck9KB3KJfbKyN9qP\nZkumMCsGA1UdIwQkMCKAIBmrZau7BIB9rRLkwKmqpmSecIaOOr0CF6Mi2J5H4aau\nMAoGCCqGSM49BAMCA0cAMEQCIB8vTq90ZxA0CCjmktCGscvTkI4OFPIRWK+qWZul\n2YJDAiBFr0wIjwJTGFTXpc2/aV6S6nufgOzK0kUBaDuhezVccw==\n-----END CERTIFICATE-----\n",
    state: "ACTIVATED",
  },
  {
    userId: "its.heisenberg",
    identityId:
      "fafa3511f7a9839397512b585b1086d853528a6b0981a93092e23401c046an2118",
    name: "admin",
    certificate:
      "-----BEGIN CERTIFICATE-----\nAB0SATCCAaigAwIBAgIUKCRGKMISlNXxWcXQB91Qu3jCgpcwCgYIKoZIzj0EAwIw\nczELMAkGA1UEBhMCVVMxEzARBgNVBAgTCkNhbGlmb3JuaWExFjAUBgNVBAcTDVNh\nbiBGcmFuY2lzY28xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMT\nE2NhLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwNTI4MTMzNDAwWhcNMjIwNTI4MTMz\nOTAwWjAhMQ8wDQYDVQQLEwZjbGllbnQxDjAMBgNVBAMTBWFkbWluMFkwEwYHKoZI\nzj0CAQYIKoZIzj0DAQcDQgAEvreJZy9JVcC6bhbJ4DpX/sbnItwTJXp8QGeBSWhn\nyKe/wy4hSlHdvlDAEfFX53YT7nwH/X7Y5z+wTZgKoOq/mqNsMGowDgYDVR0PAQH/\nBAQDAgeAMAwGA1UdEwEB/wQCMAAwHQYDVR0OBBYEFKCdGEK5ck9KB3KJfbKyN9qP\nZkumMCsGA1UdIwQkMCKAIBmrZau7BIB9rRLkwKmqpmSecIaOOr0CF6Mi2J5H4aau\nMAoGCCqGSM49BAMCA0cAMEQCIB8vTq90ZxA0CCjmktCGscvTkI4OFPIRWK+qWZul\n2YJDAiBFr0wIjwJTGFTXpc2/aV6S6nufgOzK0kUBaDuhezVccw==\n-----END CERTIFICATE-----\n",
    state: "ACTIVATED",
  },
];

class Users extends Component {
  state = {
    viewCertificate: false,
    currentCertificate: {},
  };

  viewCertificateHandler = (id) => {
    this.setState({
      viewCertificate: true,
      currentCertificate: userTableData[id],
    });
  };

  closeCertificateHandler = () => {
    this.setState({
      viewCertificate: false,
      currentCertificate: {},
    });
  };

  render() {
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
          <TableView
            tableHeaders={userTableHeaders}
            tableData={userTableData.map((d) => {
              return { ...d, certificate: null };
            })}
            actions={true}
            actionHandlers={[
              {
                text: "View Certificate",
                handler: this.viewCertificateHandler,
              },
            ]}
          />
        </WhiteCard>
      </div>
    );
  }
}

export default withStyles(styles)(Users);
