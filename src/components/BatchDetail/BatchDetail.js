import { List } from "@material-ui/core";
import React, { Component } from "react";
import { beautifyDateTime } from "../../helpers";
import BatchDetailItem from "./BatchDetailItem/BatchDetailItem";

class BatchDetail extends Component {
  state = {
    viewGrowingDetails: false,
    viewInspectedDetails: false,
    viewHarvestedDetails: false,
    viewShippedDetails: false,
    viewProcessedDetails: false,
  };

  onClickHandler = (key) => {
    console.log(key);
    this.setState({
      [key]: !this.state[key],
    });
  };

  render() {
    const { batch } = this.props;

    return (
      <List>
        <BatchDetailItem
          label="Status"
          value="GROWING"
          header
          id="viewGrowingDetails"
          onClickHandler={this.onClickHandler}
        />
        <div
          style={{
            display: this.state.viewGrowingDetails ? "block" : "none",
          }}
        >
          <BatchDetailItem label="Batch ID" value={batch.batchId} />
          <BatchDetailItem
            label="Created At"
            value={
              batch.createdDateTime && beautifyDateTime(batch.createdDateTime)
            }
          />
        </div>
        <BatchDetailItem
          label="Status"
          value="INSPECTED"
          header
          id="viewInspectedDetails"
          onClickHandler={this.onClickHandler}
        />
        <div
          style={{
            display: this.state.viewInspectedDetails ? "block" : "none",
          }}
        >
          <BatchDetailItem
            label="Inspected At"
            value={
              batch.inspectedDateTime &&
              beautifyDateTime(batch.inspectedDateTime)
            }
          />
          <BatchDetailItem label="Type of Seed" value={batch.typeOfSeed} />
          <BatchDetailItem label="Coffee Family" value={batch.coffeeFamily} />
          <BatchDetailItem
            label="Fertilizers Used"
            value={batch.fertilizersUsed}
          />
        </div>

        <BatchDetailItem
          label="Status"
          value="HARVESTED"
          header
          id="viewHarvestedDetails"
          onClickHandler={this.onClickHandler}
        />
        <div
          style={{
            display: this.state.viewHarvestedDetails ? "block" : "none",
          }}
        >
          <BatchDetailItem
            label="Harvested At"
            value={
              batch.harvestedDateTime &&
              beautifyDateTime(batch.harvestedDateTime)
            }
          />
          <BatchDetailItem
            label="Dry Parchment Quantity"
            value={batch.dryParchmentQuantity}
          />
        </div>

        <BatchDetailItem
          label="Status"
          value="SHIPPED"
          header
          id="viewShippedDetails"
          onClickHandler={this.onClickHandler}
        />
        <div
          style={{
            display: this.state.viewShippedDetails ? "block" : "none",
          }}
        >
          <BatchDetailItem
            label="Shipped At"
            value={
              batch.shippedDateTime && beautifyDateTime(batch.shippedDateTime)
            }
          />
          <BatchDetailItem label="Ship ID" value={batch.shipId} />
          <BatchDetailItem label="Ship Name" value={batch.shipName} />
          <BatchDetailItem
            label="Shipping Quantity KG"
            value={batch.shippingQuantity}
          />
          <BatchDetailItem label="Warehouse Name" value={batch.warehouseName} />
          <BatchDetailItem
            label="Warehouse Address"
            value={batch.warehouseAddress}
          />
        </div>

        <BatchDetailItem
          label="Status"
          value="PROCESSED"
          header
          id="viewProcessedDetails"
          onClickHandler={this.onClickHandler}
        />
        <div
          style={{
            display: this.state.viewProcessedDetails ? "block" : "none",
          }}
        >
          <BatchDetailItem
            label="Processed At"
            value={
              batch.processedDateTime &&
              beautifyDateTime(batch.processedDateTime)
            }
          />
          <BatchDetailItem
            label="Roasting Time Minutes"
            value={batch.roastingTime}
          />
          <BatchDetailItem
            label="Roasting Temperature (Celcius)"
            value={batch.temperature}
          />
          <BatchDetailItem
            label="Number of packages"
            value={batch.packagedCount}
          />
        </div>
      </List>
    );
  }
}

export default BatchDetail;
