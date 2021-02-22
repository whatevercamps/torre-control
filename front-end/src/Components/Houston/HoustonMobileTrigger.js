import React from "react";
import Fab from "@material-ui/core/Fab";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";

export default function HoustonMobileTrigger({ setMobileHoustonActive }) {
  return (
    <div className='HoustonMobileTrigger'>
      <Fab aria-label='add' className='HoustonMobileTriggerFab' style={{ backgroundColor: "#cddc39" }} onClick={() => setMobileHoustonActive(true)}>
        <ForumRoundedIcon style={{ color: "#27292d" }} />
      </Fab>
    </div>
  );
}
