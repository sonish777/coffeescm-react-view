import {
  Breadcrumbs,
  Typography,
  Link,
  Tabs,
  Tab,
  withStyles,
} from "@material-ui/core";
import { NavigateNext as NavigateNextIcon } from "@material-ui/icons";
import React, { Component } from "react";
import TabPanel from "../../../components/TabPanel/TabPanel";
import UserDetailCard from "../../../components/UserDetailCard/UserDetailCard";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import styles from "./ContractDetailStyle";

const allContracts = [
  {
    contractId: "con_1",
    batchId: "bat__1",
    createdDateTime: "2020/01/10",
    active: "true",
    grower: {
      userId: "grower1",
      name: "Grower 1",
      email: "g1@email.com",
      password: "test1234",
      address: "Nepal",
    },
    farmInspector: {
      userId: "fi1",
      name: "Farm Inspector 1",
      email: "fi1@email.com",
      password: "test1234",
      address: "Nepal",
    },
    shipper: {
      userId: "s1",
      name: "Shipper 1",
      email: "s1@email.com",
      password: "test1234",
      address: "Nepal",
    },
    processor: {
      userId: "p1",
      name: "Processor 1",
      email: "p1@email.com",
      password: "test1234",
      address: "Nepal",
    },
  },
  {
    contractId: "con_2",
    batchId: "bat__2",
    createdDateTime: "2020/01/10",
    active: "true",
    grower: {
      userId: "grower2",
      name: "Grower 2",
      email: "g2@email.com",
      password: "test1234",
      address: "Nepal",
    },
    farmInspector: {
      userId: "fi2",
      name: "Farm Inspector 2",
      email: "fi2@email.com",
      password: "test1234",
      address: "Nepal",
    },
    shipper: {
      userId: "s2",
      name: "Shipper 2",
      email: "s2@email.com",
      password: "test1234",
      address: "Nepal",
    },
    processor: {
      userId: "p2",
      name: "Processor 2",
      email: "p2@email.com",
      password: "test1234",
      address: "Nepal",
    },
  },
  {
    contractId: "con_3",
    batchId: "bat__3",
    createdDateTime: "2020/01/10",
    active: "true",
    grower: {
      userId: "grower3",
      name: "Grower 3",
      email: "g3@email.com",
      password: "test3234",
      address: "Nepal",
    },
    farmInspector: {
      userId: "fi3",
      name: "Farm Inspector 3",
      email: "fi3@email.com",
      password: "test3234",
      address: "Nepal",
    },
    shipper: {
      userId: "s3",
      name: "Shipper 3",
      email: "s3@email.com",
      password: "test3234",
      address: "Nepal",
    },
    processor: {
      userId: "p3",
      name: "Processor 3",
      email: "p3@email.com",
      password: "test1234",
      address: "Nepal",
    },
  },
  {
    contractId: "con_4",
    batchId: "bat__4",
    createdDateTime: "2020/01/10",
    active: "true",
    grower: {
      userId: "grower4",
      name: "Grower 4",
      email: "g4@email.com",
      password: "test4234",
      address: "Nepal",
    },
    farmInspector: {
      userId: "fi4",
      name: "Farm Inspector 4",
      email: "fi4@email.com",
      password: "test4234",
      address: "Nepal",
    },
    shipper: {
      userId: "s4",
      name: "Shipper 4",
      email: "s4@email.com",
      password: "test4234",
      address: "Nepal",
    },
    processor: {
      userId: "p4",
      name: "Processor 4",
      email: "p4@email.com",
      password: "test4234",
      address: "Nepal",
    },
  },
  {
    contractId: "con_5",
    batchId: "bat__5",
    createdDateTime: "2020/01/10",
    active: "true",
    grower: {
      userId: "grower5",
      name: "Grower 5",
      email: "g5@email.com",
      password: "test5234",
      address: "Nepal",
    },
    farmInspector: {
      userId: "fi5",
      name: "Farm Inspector 5",
      email: "fi5@email.com",
      password: "test5234",
      address: "Nepal",
    },
    shipper: {
      userId: "s5",
      name: "Shipper 5",
      email: "s5@email.com",
      password: "test5234",
      address: "Nepal",
    },
    processor: {
      userId: "p5",
      name: "Processor 5",
      email: "p5@email.com",
      password: "test5234",
      address: "Nepal",
    },
  },
];

class ContractDetail extends Component {
  state = {
    currentContract: null,
    currentTabIndex: 0,
  };

  onTabChangeHandler = (e, index) => {
    this.setState({
      currentTabIndex: index,
    });
  };

  componentDidMount() {
    console.log(this.props);
    const { contractId } = this.props.match.params;
    const currentContract = allContracts.find(
      (el) => el.contractId === contractId
    );
    this.setState({
      currentContract,
    });
  }

  render() {
    const { currentContract, currentTabIndex } = this.state;
    const { classes } = this.props;
    return currentContract ? (
      <div>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Link color="inherit" href="/contracts">
            Contracts
          </Link>
          <Typography color="textPrimary">
            {currentContract && currentContract.contractId.toUpperCase()}
          </Typography>
        </Breadcrumbs>
        <section>
          <WhiteCard>
            <div className={classes.root}>
              <Tabs
                value={currentTabIndex}
                onChange={this.onTabChangeHandler}
                className={classes.tabRoot}
                indicatorColor="#1f212b"
              >
                <Tab
                  label="Grower"
                  disableRipple
                  className={currentTabIndex === 0 && classes.activeTab}
                />
                <Tab
                  label="Farm Inspector"
                  disableRipple
                  className={currentTabIndex === 1 && classes.activeTab}
                />
                <Tab
                  label="Shipper"
                  disableRipple
                  className={currentTabIndex === 2 && classes.activeTab}
                />
                <Tab
                  label="Processor"
                  disableRipple
                  className={currentTabIndex === 3 && classes.activeTab}
                />
              </Tabs>
            </div>
            <TabPanel currentTabIndex={currentTabIndex} index={0}>
              <UserDetailCard user={currentContract.grower} />
            </TabPanel>
            <TabPanel
              currentTabIndex={currentTabIndex}
              index={1}
              user={currentContract.farmInspector}
            >
              <UserDetailCard user={currentContract.farmInspector} />
            </TabPanel>
            <TabPanel
              currentTabIndex={currentTabIndex}
              index={2}
              user={currentContract.shipper}
            >
              <UserDetailCard user={currentContract.shipper} />
            </TabPanel>
            <TabPanel
              currentTabIndex={currentTabIndex}
              index={3}
              user={currentContract.processor}
            >
              <UserDetailCard user={currentContract.processor} />
            </TabPanel>
          </WhiteCard>
        </section>
      </div>
    ) : (
      <h4>Loading</h4>
    );
  }
}

export default withStyles(styles)(ContractDetail);
