import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "4px 1em 4px 1.5em",
    display: "flex",
    alignItems: "center",
    minWidth: "25%",
    maxWidth: "75%",
    height: "4.5em",
    borderRadius: "2.5em",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  input: {
    fontSize: "1.5em",
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    fontSize: "1.5em",
  },
}));

export default function Login() {
  const [input, setInput] = useState("");
  const classes = useStyles();
  let history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (input.trim().length) {
      history.push(input);
    } else {
      alert("please, provide a valid Torre username");
    }
  };

  return (
    <div
      className='Login'
      style={{ backgroundImage: "url(/Arlanda_Tower_at_night.jpg)" }}
    >
      <Paper component='form' className={classes.root} onSubmit={handleSubmit}>
        <InputBase
          className={classes.input}
          onChange={(evt) => setInput(evt.target.value)}
          value={input}
          placeholder='Torre profile'
          inputProps={{ "aria-label": "enter torre profile" }}
        />

        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='directions'
        >
          <SearchIcon className={classes.icon} />
        </IconButton>
      </Paper>
    </div>
  );
}
