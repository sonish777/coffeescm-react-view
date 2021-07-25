import React from "react";
import { Component } from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";

import styles from "./UserBatchStyles";
import Growing from "../../../assets/sprout.png";
import Inspection from "../../../assets/inspection.png";
import Harvest from "../../../assets/harvest.png";
import Shipping from "../../../assets/delivery-truck.png";
import Processing from "../../../assets/sack.png";

import TimelineHeader from "../../../components/TimelineHeader/TimelineHeader";
import TimelineFooter from "../../../components/TimelineFooter/TimelineFooter";

import {
  NavigateNext as NavigateNextIcon,
  Check as CheckIcon,
} from "@material-ui/icons";
import { Breadcrumbs, Paper, Typography, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import TimelineOppositeContentAvatar from "../../../components/TimelineOppositeContentAvatar/TimelineOppositeContentAvatar";
import TimelineData from "../../../components/TimelineData/TimelineData";
import BatchUpdateForm from "../../../components/BatchUpdateForm/BatchUpdateForm";
import axios from "axios";
import ComponentWithLoading from "../../../hoc/ComponentWithLoading";
import { UserContext } from "../../../contexts/UserContext";
import { setAuthToken } from "../../../helpers";

const displayGrowingData = (batch, classes) => (
  <TimelineItem key="GROWING">
    <TimelineOppositeContent>
      <TimelineOppositeContentAvatar imgSource={Growing} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot style={{ background: "#4BB543" }}>
        <CheckIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Paper className={classes.paperRoot} elevation={0}>
        <TimelineHeader state="Growing" />
        <TimelineFooter name={batch.contract.grower.name} label="Grower" />
      </Paper>
    </TimelineContent>
  </TimelineItem>
);

const displayInspectionData = (batch, classes) => (
  <TimelineItem key="INSPECTION">
    <TimelineOppositeContent>
      <TimelineOppositeContentAvatar imgSource={Inspection} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot style={{ background: "#4BB543" }}>
        <CheckIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Paper className={classes.paperRoot} elevation={0}>
        <TimelineHeader state="Inspection" />
        <TimelineData label="Type of Seed" value={batch && batch.typeOfSeed} />
        <TimelineData label="Coffee Family" value={batch.coffeeFamily} />
        <TimelineData label="Fertilizers Used" value={batch.fertilizersUsed} />
        <TimelineFooter
          label="Farm Inspector"
          name={batch.contract.farmInspector.name}
        />
      </Paper>
    </TimelineContent>
  </TimelineItem>
);

const displayHarvestedData = (batch, classes) => (
  <TimelineItem key="HARVEST">
    <TimelineOppositeContent>
      <TimelineOppositeContentAvatar imgSource={Harvest} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot style={{ background: "#4BB543" }}>
        <CheckIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Paper className={classes.paperRoot} elevation={0}>
        <TimelineHeader state="Harvested" />
        <TimelineData
          label="Dry Parchment Quantity"
          value={`${batch.dryParchmentQuantity} KG`}
        />
        <TimelineData
          label="Harvested Date & Time"
          value={`${batch.harvestedDateTime.split("T")[0]} / ${
            batch.harvestedDateTime.split("T")[1].split(".")[0]
          }`}
        />
        <TimelineFooter label="Harvestor" name={batch.contract.grower.name} />
      </Paper>
    </TimelineContent>
  </TimelineItem>
);

const displayShippingData = (batch, classes) => (
  <TimelineItem key="SHIPPING">
    <TimelineOppositeContent>
      <TimelineOppositeContentAvatar imgSource={Shipping} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot style={{ background: "#4BB543" }}>
        <CheckIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Paper className={classes.paperRoot} elevation={0}>
        <TimelineHeader state="Shipping" />
        <TimelineData label="Ship ID" value={batch.shipId} />
        <TimelineData label="Ship Name" value={batch.shipName} />

        <TimelineData
          label="Shipping Quantity"
          value={`${batch.shippingQuantity} KG`}
        />
        <TimelineData
          label="Destination Warehouse"
          value={batch.warehouseName}
        />
        <TimelineData
          label="Warehouse Address"
          value={batch.warehouseAddress}
        />
        <TimelineFooter label="Shipper" name={batch.contract.shipper.name} />
      </Paper>
    </TimelineContent>
  </TimelineItem>
);

const displayProcessingData = (batch, classes) => (
  <TimelineItem key="PROCESSING">
    <TimelineOppositeContent>
      <TimelineOppositeContentAvatar imgSource={Processing} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot style={{ background: "#4BB543" }}>
        <CheckIcon />
      </TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Paper className={classes.paperRoot} elevation={0}>
        <TimelineHeader state="Processing" />
        <TimelineData
          label="Roasting Time"
          value={`${batch.roastingTime} minutes`}
        />
        <TimelineData
          label="Roasting Temperature"
          value={`${batch.temperature} degC`}
        />
        <TimelineData
          label="Packaged Count"
          value={`${batch.packagedCount} packets`}
        />
        <TimelineData
          label="Packaged Date"
          value={batch.packagingDateTime.split("T")[0]}
        />
        <TimelineFooter
          label="Processor"
          name={batch.contract.processor.name}
        />
      </Paper>
    </TimelineContent>
  </TimelineItem>
);

const displayBlankTimeline = (imgSource, update, role, updateBatchHandler) => (
  <TimelineItem key={imgSource}>
    <TimelineOppositeContent>
      <TimelineOppositeContentAvatar imgSource={imgSource} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      {update && (
        <BatchUpdateForm role={role} updateBatchHandler={updateBatchHandler} />
      )}
    </TimelineContent>
  </TimelineItem>
);

class UserBatchDetail extends Component {
  static contextType = UserContext;

  state = {
    currentBatch: null,
  };

  async componentDidMount() {
    this.loadCurrentBatch();
  }

  reloadCurrentBatch = () => {
    this.loadCurrentBatch();
  };

  loadCurrentBatch = async () => {
    const { batchId } = this.props.match.params;
    try {
      setAuthToken();
      const result = await axios.get(
        `http://localhost:8000/api/batches/${batchId}`
      );
      if (result.data.status === "success") {
        console.log(result.data);
        this.setState({
          currentBatch: result.data.data,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  batchTimelineGenerator = (classes, updateBatchHandler) => {
    const { currentBatch } = this.state;
    const { currentUser } = this.context;
    const batchTimeline = [];
    switch (currentBatch && currentBatch.status) {
      case "GROWING":
        batchTimeline.push(displayGrowingData(currentBatch, classes));
        currentUser.role === "FARMINSPECTOR"
          ? batchTimeline.push(
              displayBlankTimeline(
                Inspection,
                true,
                currentUser.role,
                updateBatchHandler
              )
            )
          : batchTimeline.push(displayBlankTimeline(Inspection));
        batchTimeline.push(displayBlankTimeline(Harvest));
        batchTimeline.push(displayBlankTimeline(Shipping));
        batchTimeline.push(displayBlankTimeline(Processing));
        break;
      case "INSPECTION":
        batchTimeline.push(displayGrowingData(currentBatch, classes));
        batchTimeline.push(displayInspectionData(currentBatch, classes));
        currentUser.role === "GROWER"
          ? batchTimeline.push(
              displayBlankTimeline(
                Harvest,
                true,
                currentUser.role,
                updateBatchHandler
              )
            )
          : batchTimeline.push(displayBlankTimeline(Harvest));
        batchTimeline.push(displayBlankTimeline(Shipping));
        batchTimeline.push(displayBlankTimeline(Processing));
        break;
      case "HARVESTED":
        batchTimeline.push(displayGrowingData(currentBatch, classes));
        batchTimeline.push(displayInspectionData(currentBatch, classes));
        batchTimeline.push(displayHarvestedData(currentBatch, classes));
        currentUser.role === "SHIPPER"
          ? batchTimeline.push(
              displayBlankTimeline(
                Shipping,
                true,
                currentUser.role,
                updateBatchHandler
              )
            )
          : batchTimeline.push(displayBlankTimeline(Shipping));
        batchTimeline.push(displayBlankTimeline(Processing));
        break;
      case "SHIPPING":
        batchTimeline.push(displayGrowingData(currentBatch, classes));
        batchTimeline.push(displayInspectionData(currentBatch, classes));
        batchTimeline.push(displayHarvestedData(currentBatch, classes));
        batchTimeline.push(displayShippingData(currentBatch, classes));
        currentUser.role === "PROCESSOR"
          ? batchTimeline.push(
              displayBlankTimeline(
                Processing,
                true,
                currentUser.role,
                updateBatchHandler
              )
            )
          : batchTimeline.push(displayBlankTimeline(Processing));
        break;
      case "PROCESSING":
        batchTimeline.push(displayGrowingData(currentBatch, classes));
        batchTimeline.push(displayInspectionData(currentBatch, classes));
        batchTimeline.push(displayHarvestedData(currentBatch, classes));
        batchTimeline.push(displayShippingData(currentBatch, classes));
        batchTimeline.push(displayProcessingData(currentBatch, classes));
        break;
      default:
        return;
    }
    return currentBatch && batchTimeline;
  };

  render() {
    const { currentBatch } = this.state;
    const { classes } = this.props;
    const { batchId } = this.props.match.params;
    const batchTimeline = this.batchTimelineGenerator(
      classes,
      this.reloadCurrentBatch
    );
    return (
      <div>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Link
            to={
              window.location.pathname.includes("/admin")
                ? "/admin/batches"
                : "/batches"
            }
          >
            Batches
          </Link>
          <Typography color="textPrimary">{batchId}</Typography>
        </Breadcrumbs>
        <ComponentWithLoading isLoading={currentBatch === null}>
          <Timeline align="alternate">{batchTimeline}</Timeline>
        </ComponentWithLoading>
      </div>
    );
  }
}

export default withStyles(styles)(UserBatchDetail);
