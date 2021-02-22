import React, { useRef, useEffect } from "react";
import "./RadarChart.css";

/* D3 Chart module */
import RadarChart from "./RadarChart";

export default function RadarChartWrapper(props) {
  /* Data props (oportunities info by default) */
  const { data, name } = props;

  /* Div reference for appending d3 chart */
  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current && data) {
      console.log("data radar", data);

      const axes = data.map((d) => {
        return {
          axis: d.value,
          value: d.total,
        };
      });

      const chartOptions = {
        maxValue: 60,
        levels: 6,
        roundStrokes: false,
        format: ".0f",
        legend: { title: `${name} report`, translateX: -100, translateY: 40 },
        unit: "",
      };

      RadarChart([{ name: "current" || "Opportunity", axes: axes }], ref.current, chartOptions);
    }
  }, [ref, data]);

  return <div className='RadarChartWrapper' ref={ref}></div>;
}
