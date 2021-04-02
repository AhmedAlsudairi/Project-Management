import {
  Button,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

function CreateTask() {
  const classes = useStyles();
  const [ID, setID] = useState({ value: "", valid: false });
  const [name, setName] = useState({ value: "", valid: false });
  const [duration, setDuration] = useState({ value: "", valid: false });
  const [start, setStart] = useState({ value: "", valid: false });

  const handleCreateTask = (e) => {
    e.preventDefault();
    console.log("task created");
  };

  const handleIDChange = (e) => {
    const newID = e.target.value;
    if (newID === "") setID({ value: "", valid: false });
    else setID({ value: newID, valid: true });
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (newName === "") setName({ value: "", valid: false });
    else setName({ value: newName, valid: true });
  };
  const handleDurationChange = (e) => {
    const newDuration = e.target.value;
    if (isNaN(newDuration)) return;
    if (newDuration === "") setDuration({ value: "", valid: false });
    else setDuration({ value: newDuration, valid: true });
  };
  const handleStartChange = (e) => {
    const newStart = e.target.value;
    if (newStart === "") setStart({ value: "", valid: false });
    else setStart({ value: newStart, valid: true });
  };
  return (
    <Paper square className={classes.paper}>
      <Typography variant="h5">Create a task:</Typography>
      <form>
        <TextField
          className={classes.textField}
          required
          id="taskID"
          label="Task ID"
          margin="dense"
          value={ID.value}
          onChange={handleIDChange}
        />
        <TextField
          className={classes.textField}
          required
          id="taskName"
          label="Task Name"
          margin="dense"
          value={name.value}
          onChange={handleNameChange}
        />
        <TextField
          className={classes.textField}
          required
          id="taskDuration"
          label="Duration"
          margin="dense"
          value={duration.value}
          onChange={handleDurationChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">days</InputAdornment>,
          }}
        />
        <TextField
          id="date"
          type="date"
          required
          label="Start Date"
          className={classes.textField}
          value={start.value}
          onChange={handleStartChange}
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          onClick={handleCreateTask}
          variant="contained"
          color="primary"
          type={"submit"}
          disabled={!(ID.valid && name.valid && duration.valid && start.valid)}
        >
          Create new task
        </Button>
      </form>
    </Paper>
  );
}

export default CreateTask;
