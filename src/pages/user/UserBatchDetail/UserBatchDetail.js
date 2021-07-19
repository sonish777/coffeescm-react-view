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
import {
  Breadcrumbs,
  Link,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import TimelineOppositeContentAvatar from "../../../components/TimelineOppositeContentAvatar/TimelineOppositeContentAvatar";
import TimelineData from "../../../components/TimelineData/TimelineData";

const batches = [
  {
    batchId: "bat_001",
    status: "GROWING",
    contract: {
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
    },
  },
  {
    batchId: "bat_002",
    status: "PROCESSING",
    typeOfSeed: "Arabica",
    coffeeFamily: "Black",
    fertilizersUsed: ["Compost", "Manure", "Amonium", "Nitrate"],
    harvestedDateTime: "2021/07/19",
    warehouseName: "KTM Express",
    shippingQuantity: 120,
    shipId: "ship_001",
    roastingTime: "210",
    roastingTemperature: "112",
    packagedCount: "1200",
    contract: {
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
  },
  {
    batchId: "bat_003",
    status: "INSPECTION",
    typeOfSeed: "Arabica",
    coffeeFamily: "Black",
    fertilizersUsed: ["Compost", "Manure"],
    contract: {
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
  },
  {
    batchId: "bat_005",
    status: "HARVESTED",
    typeOfSeed: "Arabica",
    coffeeFamily: "Black",
    fertilizersUsed: ["Compost", "Manure"],
    harvestedDateTime: "2021/07/19",
    contract: {
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
  },
  {
    batchId: "bat_007",
    status: "HARVESTED",
    typeOfSeed: "Arabica",
    coffeeFamily: "Black",
    fertilizersUsed: ["Compost", "Manure"],
    harvestedDateTime: "2021/07/19",
    contract: {
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
  },
  {
    batchId: "bat_022",
    status: "HARVESTED",
    typeOfSeed: "Arabica",
    coffeeFamily: "Black",
    fertilizersUsed: ["Compost", "Manure"],
    harvestedDateTime: "2021/07/19",
    contract: {
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
  },
];

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
          label="Harvested Date & Time"
          value={batch.harvestedDateTime}
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
        <TimelineData
          label="Shipping Quantity"
          value={batch.shippingQuantity}
        />
        <TimelineData
          label="Destination Warehouse"
          value={batch.warehouseName}
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
        <TimelineData label="Roasting Time" value={batch.roastingTime} />
        <TimelineData
          label="Roasting Temperature"
          value={batch.roastingTemperature}
        />
        <TimelineData label="Packaged Count" value={batch.packagedCount} />
        <TimelineFooter
          label="Processor"
          name={batch.contract.processor.name}
        />
      </Paper>
    </TimelineContent>
  </TimelineItem>
);

const displayBlankTimeline = (imgSource) => (
  <TimelineItem>
    <TimelineOppositeContent>
      <TimelineOppositeContentAvatar imgSource={imgSource} />
    </TimelineOppositeContent>
    <TimelineSeparator>
      <TimelineDot />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent></TimelineContent>
  </TimelineItem>
);

class UserBatchDetail extends Component {
  state = {
    currentBatch: null,
  };

  componentDidMount() {
    const { batchId } = this.props.match.params;
    const currentBatch = batches.find((el) => el.batchId === batchId);
    this.setState({
      currentBatch,
    });
    console.log(currentBatch);
  }

  batchTimelineGenerator = (classes) => {
    const { currentBatch } = this.state;
    const batchTimeline = [];
    switch (currentBatch && currentBatch.status) {
      case "GROWING":
        batchTimeline.push(displayGrowingData(currentBatch, classes));
        batchTimeline.push(displayBlankTimeline(Inspection));
        batchTimeline.push(displayBlankTimeline(Harvest));
        batchTimeline.push(displayBlankTimeline(Shipping));
        batchTimeline.push(displayBlankTimeline(Processing));

        break;
      case "INSPECTION":
        batchTimeline.push(displayGrowingData(currentBatch, classes));
        batchTimeline.push(displayInspectionData(currentBatch, classes));
        batchTimeline.push(displayBlankTimeline(Harvest));
        batchTimeline.push(displayBlankTimeline(Shipping));
        batchTimeline.push(displayBlankTimeline(Processing));
        break;
      case "HARVESTED":
        batchTimeline.push(displayGrowingData(currentBatch, classes));
        batchTimeline.push(displayInspectionData(currentBatch, classes));
        batchTimeline.push(displayHarvestedData(currentBatch, classes));
        batchTimeline.push(displayBlankTimeline(Shipping));
        batchTimeline.push(displayBlankTimeline(Processing));
        break;
      case "SHIPPING":
        batchTimeline.push(displayGrowingData(currentBatch, classes));
        batchTimeline.push(displayInspectionData(currentBatch, classes));
        batchTimeline.push(displayHarvestedData(currentBatch, classes));
        batchTimeline.push(displayShippingData(currentBatch, classes));
        batchTimeline.push(displayBlankTimeline(Processing));
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
    return batchTimeline;
  };

  render() {
    const currentBatch = this.state.currentBatch;
    const { classes } = this.props;
    const batchTimeline = this.batchTimelineGenerator(classes);
    return (
      <div>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Link color="inherit" href="/batches">
            Batches
          </Link>
          <Typography color="textPrimary">
            {currentBatch && currentBatch.batchId.toUpperCase()}
          </Typography>
        </Breadcrumbs>
        <Timeline align="alternate">{batchTimeline}</Timeline>
      </div>
    );
  }
}

export default withStyles(styles)(UserBatchDetail);
