import React, { useEffect, useState } from "react";

/* Components */
import BarChartWrapper from "./BarChart/BarChartWrapper";

export default function SkillsAroundMe(props) {
  // State
  const [data, setData] = useState(null);

  // Needed props
  const { SkillsAroundMe } = props;
  const { addSkill } = props;

  useEffect(() => {
    console.log("SkillsAroundMe", SkillsAroundMe);
    if (SkillsAroundMe) {
      setData({
        name: "SkillsAroundMe",
        children: SkillsAroundMe.map((skill) => {
          return { name: skill.value, value: skill.total };
        }),
      });
    }
  }, [SkillsAroundMe]);

  return (
    <div className='SkillsAroundMe'>
      <BarChartWrapper data={data} addSkill={addSkill} />
    </div>
  );
}
