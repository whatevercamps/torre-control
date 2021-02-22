import React, { useState, useEffect } from "react";

import RadarChart from "./RadarChart/RadarChartWrapper";

import { Row, Col } from "react-bootstrap";

export default function OpportunitiesReport(props) {
  const { opportunitiesInfo } = props;

  const [aggregators, setAggregators] = useState([]);

  useEffect(() => {
    if (opportunitiesInfo) {
      for (let aggregator in opportunitiesInfo) {
        // For remote report I'll implement another chart
        if (aggregator !== "remote") {
          setAggregators((aggs) => [...aggs, <RadarChart name={aggregator} data={opportunitiesInfo[aggregator]} />]);
        }
      }
    }
  }, [opportunitiesInfo]);

  return (
    <Row className='OpportunitiesReport'>
      {aggregators.map((aggregator, index) => (
        <Col md={5} key={index}>
          {aggregator}
        </Col>
      ))}
    </Row>
  );
}
