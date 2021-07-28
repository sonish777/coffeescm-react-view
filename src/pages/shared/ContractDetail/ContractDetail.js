import {
  Breadcrumbs,
  Typography,
  Tabs,
  Tab,
  withStyles,
  Button,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { NavigateNext as NavigateNextIcon } from "@material-ui/icons";
import axios from "axios";
import React, { Component } from "react";
import TabPanel from "../../../components/TabPanel/TabPanel";
import UserDetailCard from "../../../components/UserDetailCard/UserDetailCard";
import WhiteCard from "../../../components/WhiteCard/WhiteCard";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { setAuthToken } from "../../../helpers";
import ComponentWithLoading from "../../../hoc/ComponentWithLoading";
import styles from "./ContractDetailStyle";
import Input from "../../../components/Input/Input";
import SearchResultBox from "../../../components/SearchResultBox/SearchResultBox";
import MainHeader from "../../../components/MainHeader/MainHeader";
import BatchDetail from "../../../components/BatchDetail/BatchDetail";

class ContractDetail extends Component {
  static contextType = SnackbarContext;
  state = {
    currentContract: null,
    currentTabIndex: 0,
    farmInspector: "",
    shipper: "",
    processor: "",
    isSubmitting: false,
    farmInspectorList: [],
    shipperList: [],
    processorList: [],
    searchedList: [],
  };

  onTabChangeHandler = (e, index) => {
    this.setState({
      currentTabIndex: index,
      searchedList: [],
      farmInspector: "",
      shipper: "",
      processor: "",
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
        `http://192.168.246.128:8000/api/contracts/${contractId}`
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
    const name = e.target.name;
    const value = e.target.value;
    const tempList = [];
    this.state[name + "List"].forEach((u) => {
      if (u.name.toLowerCase().includes(value)) {
        tempList.push(u);
      }
    });
    this.setState({
      searchedList: tempList,
      [name]: value,
    });
  };

  setUserId = (e, userId) => {
    const participants = ["grower", "farmInspector", "shipper", "processor"];
    const index = this.state.currentTabIndex;
    this.setState({
      [participants[index]]: userId,
      searchedList: [],
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
        url: `http://192.168.246.128:8000/api/contracts/${this.state.currentContract.contractId}`,
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

  loadUser = async (name) => {
    try {
      setAuthToken();
      const result = await axios.get(
        `http://192.168.246.128:8000/api/scmusers/${name}`
      );
      if (result.data.status === "success") {
        this.setState({
          [name + "List"]: result.data.data,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      error.response.data?.error.map((e) => this.context.viewSnackbar(e));
    }
  };

  render() {
    const { currentContract, currentTabIndex } = this.state;
    // const { batch } = currentContract;
    const { classes } = this.props;
    const addParticipantForm = (value, name, placeholder) => {
      this.state[name + "List"].length === 0 && this.loadUser(name);
      return (
        <>
          <Input
            value={value}
            name={name}
            placeholder={placeholder}
            onInputChangeHandler={this.onInputChangeHandler}
          />
          <SearchResultBox
            searchResultsList={this.state.searchedList}
            setUserIdHandler={this.setUserId}
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
          <Link
            to={
              window.location.pathname.includes("/admin")
                ? "/admin/contracts"
                : "/contracts"
            }
          >
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
          <Paper className={classes.paperRoot}>
            <MainHeader>Batch Detail</MainHeader>
            <Link
              to={`${
                window.location.pathname.includes("/admin") ? "/admin" : ""
              }/batches/${currentContract.batch.batchId}`}
            >
              View Batch Timeline
            </Link>

            <BatchDetail batch={currentContract.batch} />
          </Paper>
        </section>
      </>
    ) : (
      <ComponentWithLoading isLoading={currentContract == null} />
    );
  }
}

export default withStyles(styles)(ContractDetail);
