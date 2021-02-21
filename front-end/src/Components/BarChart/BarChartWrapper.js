import React, { useRef, useEffect } from "react";

/* D3 Chart module */
import BarChart from "./BarChart";

export default function BarChartWrapper(props) {
  /* Data (skills by default) props */
  const { data } = props;

  /* Div reference for appending d3 chart */
  const ref = useRef();

  useEffect(() => {
    console.log("parece que si");
    if (ref && ref.current && data) {
      console.log("entramos");
      BarChart(data, ref.current);
    }
  }, [ref, data]);

  return <div className='BarChartWrapper' ref={ref}></div>;
}
