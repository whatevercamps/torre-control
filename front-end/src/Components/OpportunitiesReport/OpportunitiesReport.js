import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import AggregatorReport from "./AggregatorReport";

export default function OpportunitiesReport(props) {
  const { opportunitiesReport } = props;

  useEffect(() => {
    console.log("opportunities report", JSON.stringify(opportunitiesReport));
  }, [opportunitiesReport]);

  return (
    <Row className='OpportunitiesReport'>
      {opportunitiesReport &&
        opportunitiesReport.map((aggregator, index) => (
          <Col sm={12} key={index}>
            <AggregatorReport aggregatorData={aggregator} sketchAggregatorData={props.sketchOpportunitiesReport && props.sketchOpportunitiesReport[index]} />
          </Col>
        ))}
    </Row>
  );
}
