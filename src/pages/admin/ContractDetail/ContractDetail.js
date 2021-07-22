import {
  Breadcrumbs,
  Typography,
  Link,
  Tabs,
  Tab,
  withStyles,
} from "@material-ui/core";
import { NavigateNext as NavigateNextIcon } from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";
import TabPanel from "../../../components/TabPanel/TabPanel";
import UserDetailCard from "../../../components/UserDetailCard/UserDetailCard";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import ComponentWithLoading from "../../../hoc/ComponentWithLoading";
import styles from "./ContractDetailStyle";

class ContractDetail extends Component {
  static contextType = SnackbarContext;
  state = {
    currentContract: null,
    currentTabIndex: 0,
  };

  onTabChangeHandler = (e, index) => {
    this.setState({
      currentTabIndex: index,
    });
  };

  async componentDidMount() {
    const { contractId } = this.props.match.params;
    try {
      const result = await axios.get(
        `http://localhost:8000/api/contracts/${contractId}`
      );
      if (result.data.status === "success") {
        this.setState({
          currentContract: result.data.data,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      error.response.data?.error.map((e) => this.context.viewSnackbar(e));
    }
  }

  render() {
    const { currentContract, currentTabIndex } = this.state;
    const { classes } = this.props;
    return currentContract ? (
      <>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Link color="inherit" href="/contracts">
            Contracts
          </Link>
          <Typography color="textPrimary">
            {currentContract.contractId.toUpperCase()}
          </Typography>
        </Breadcrumbs>
        <section>
          <WhiteCard>
            <div className={classes.root}>
              <Tabs
                value={currentTabIndex}
                onChange={this.onTabChangeHandler}
                className={classes.tabRoot}
                indicatorColor="primary"
              >
                <Tab
                  label="Grower"
                  disableRipple
                  className={currentTabIndex === 0 ? classes.activeTab : ""}
                />
                <Tab
                  label="Farm Inspector"
                  disableRipple
                  className={currentTabIndex === 1 ? classes.activeTab : ""}
                />
                <Tab
                  label="Shipper"
                  disableRipple
                  className={currentTabIndex === 2 ? classes.activeTab : ""}
                />
                <Tab
                  label="Processor"
                  disableRipple
                  className={currentTabIndex === 3 ? classes.activeTab : ""}
                />
              </Tabs>
            </div>
            <TabPanel currentTabIndex={currentTabIndex} index={0}>
              <UserDetailCard user={currentContract.grower} />
            </TabPanel>
            <TabPanel currentTabIndex={currentTabIndex} index={1}>
              <UserDetailCard user={currentContract.farmInspector} />
            </TabPanel>
            <TabPanel currentTabIndex={currentTabIndex} index={2}>
              <UserDetailCard user={currentContract.shipper} />
            </TabPanel>
            <TabPanel currentTabIndex={currentTabIndex} index={3}>
              <UserDetailCard user={currentContract.processor} />
            </TabPanel>
          </WhiteCard>
        </section>
      </>
    ) : (
      <ComponentWithLoading isLoading={currentContract == null} />
    );
  }
}

export default withStyles(styles)(ContractDetail);
