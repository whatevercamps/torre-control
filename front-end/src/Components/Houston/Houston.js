import React from "react";

import Conversation from "./Conversation";
import "./Houston.css";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default function Houston({ active, setMobileHoustonActive }) {
  return (
    <div className={`Houston ${active ? "active" : ""}`}>
      {active && (
        <div style={{ width: "100%" }} className='text-right'>
          <IconButton aria-label='close houston chatbot' onClick={() => setMobileHoustonActive(false)}>
            <CloseIcon style={{ color: "#e83e8c" }} />
          </IconButton>
        </div>
      )}
      <Conversation />
    </div>
  );
}
