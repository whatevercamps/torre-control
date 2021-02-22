import React from "react";

/* components */
import NodesChartWrapper from "./NodesChart/NodesChartWrapper";

export default function MySkills(props) {
  return (
    <div className='MySkills'>
      <NodesChartWrapper data={props.mySkills} sketchMode={props.sketchMode} />
    </div>
  );
}
