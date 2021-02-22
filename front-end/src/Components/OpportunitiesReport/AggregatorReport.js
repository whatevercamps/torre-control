import React, { useState, useEffect } from "react";
import NewRadarChart from "../RadarChart/NewRadarChart";

export default function AggregatorReport(props) {
  const { aggregatorData } = props;
  const { sketchAggregatorData } = props;

  const [mergedData, setMergedData] = useState(null);

  useEffect(() => {
    console.log("lkKSF+******SDALSKLD", sketchAggregatorData);

    if (aggregatorData) {
      const tempMergedData = aggregatorData.map((data, index) => {
        const sketchValue = sketchAggregatorData ? sketchAggregatorData[index].current : 0;

        return { ...data, sketch: sketchValue };
      });

      setMergedData(tempMergedData);
    }
  }, [aggregatorData, sketchAggregatorData]);

  return (
    <div className='AggregatorReport'>
      <NewRadarChart name='hola' data={mergedData} keys={["current", "sketch"]} />
    </div>
  );
}
