import React, { useRef, useEffect } from "react";

/* D3 Chart module */
import BarChart from "./BarChart";

export default function BarChartWrapper(props) {
  /* Data (skills by default) props */
  const { data } = props;

  /* Div reference for appending d3 chart */
  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current && data) {
      BarChart(data, ref.current, props.addSkill);
    }
  }, [ref, data]);

  return <div className='BarChartWrapper' ref={ref}></div>;
}
