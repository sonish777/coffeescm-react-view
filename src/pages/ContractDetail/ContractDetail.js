import {
  Breadcrumbs,
  Typography,
  Link,
  Tabs,
  Tab,
  withStyles,
  Button,
  Paper,
} from "@material-ui/core";
import { NavigateNext as NavigateNextIcon } from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";
import TabPanel from "../../components/TabPanel/TabPanel";
import UserDetailCard from "../../components/UserDetailCard/UserDetailCard";
import WhiteCard from "../../components/WhiteCard/WhiteCard";
import { SnackbarContext } from "../../contexts/SnackbarContext";
import { setAuthToken } from "../../helpers";
import ComponentWithLoading from "../../hoc/ComponentWithLoading";
import styles from "./ContractDetailStyle";
import Input from "../../components/Input/Input";

class ContractDetail extends Component {
  static contextType = SnackbarContext;
  state = {
    currentContract: null,
    currentTabIndex: 0,
    farmInspector: "",
    shipper: "",
    processor: "",
    isSubmitting: false,
  };

  onTabChangeHandler = (e, index) => {
    this.setState({
      currentTabIndex: index,
    });
  };

  componentDidMount() {
    this.loadCurrentContract();
  }

  loadCurrentContract = async () => {
    const { contractId } = this.props.match.params;
    try {
      setAuthToken();
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
  };

  reloadCurrentContract = () => {
    this.loadCurrentContract();
  };

  onInputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitHandler = async (e) => {
    this.setState({ isSubmitting: true });
    e.preventDefault();
    const participants = ["grower", "farmInspector", "shipper", "processor"];
    const index = this.state.currentTabIndex;
    try {
      setAuthToken();
      const result = await axios({
        method: "PATCH",
        url: `http://localhost:8000/api/contracts/${this.state.currentContract.contractId}`,
        data: {
          [participants[index]]: this.state[participants[index]],
        },
      });
      if (result.data.status === "success") {
        this.context.viewSnackbar("Participant Added Successfully");
        this.setState({
          [participants[index]]: "",
          isSubmitting: false,
        });
        this.reloadCurrentContract();
      }
    } catch (error) {
      this.setState({ isSubmitting: false });
      console.log(error.response.data);
      error.response.data?.error.forEach((e) => this.context.viewSnackbar(e));
    }
  };

  render() {
    const { currentContract, currentTabIndex } = this.state;
    const { classes } = this.props;
    const addParticipantForm = (value, name, placeholder) => {
      return (
        <>
          <Input
            value={value}
            name={name}
            placeholder={placeholder}
            onInputChangeHandler={this.onInputChangeHandler}
          />
          <ComponentWithLoading isLoading={this.state.isSubmitting}>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.onSubmitHandler}
            >
              Add
            </Button>
          </ComponentWithLoading>
        </>
      );
    };
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
              {currentContract.farmInspector ? (
                <UserDetailCard user={currentContract.farmInspector} />
              ) : (
                <Paper
                  elevation={0}
                  variant="outlined"
                  className={classes.paperRoot}
                >
                  <Typography>
                    This participant hasnt been added to the contract yet.
                  </Typography>
                  {window.location.pathname.includes("/admin") &&
                    addParticipantForm(
                      this.state.farmInspector,
                      "farmInspector",
                      "Farm Inspector ID"
                    )}
                </Paper>
              )}
            </TabPanel>
            <TabPanel currentTabIndex={currentTabIndex} index={2}>
              {currentContract.shipper ? (
                <UserDetailCard user={currentContract.shipper} />
              ) : (
                <Paper
                  elevation={0}
                  variant="outlined"
                  className={classes.paperRoot}
                >
                  <Typography>
                    This participant hasnt been added to the contract yet.
                  </Typography>
                  {window.location.pathname.includes("/admin") &&
                    addParticipantForm(
                      this.state.shipper,
                      "shipper",
                      "Shipper ID"
                    )}
                </Paper>
              )}
            </TabPanel>
            <TabPanel currentTabIndex={currentTabIndex} index={3}>
              {currentContract.processor ? (
                <UserDetailCard user={currentContract.processor} />
              ) : (
                <Paper
                  elevation={0}
                  variant="outlined"
                  className={classes.paperRoot}
                >
                  <Typography>
                    This participant hasnt been added to the contract yet.
                  </Typography>
                  {window.location.pathname.includes("/admin") &&
                    addParticipantForm(
                      this.state.processor,
                      "processor",
                      "Processor ID"
                    )}
                </Paper>
              )}
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
