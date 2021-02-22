import React, { useRef, useEffect, useState } from "react";

/* D3 Chart module */
import NodesChart from "./NodesChart";

export default function NodesChartWrapper(props) {
  /* Data (skills by default) props */
  const { data } = props;

  /* Div reference for appending d3 chart */
  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current && data) {
      NodesChart(
        {
          nodes: data.map((node, index) => {
            return { ...node, id: index + 1 };
          }),
        },
        ref.current,
        props.sketchMode
      );
    }
  }, [ref, data]);

  return <div className='NodesChartWrapper' ref={ref}></div>;
}
