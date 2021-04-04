import {
  Button,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import * as tasksActions from "../store/actions/tasks";
import { connect } from "react-redux";
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
    const task = {
      ID: ID.value,
      name: name.value,
      duration: duration.value,
      start: start.value,
      finish: getFinishDate(start.value, duration.value),
    };
    console.log(task);
  };

  const getFinishDate = (start, duration) => {
    var y = parseInt(start.split("-")[0]);
    var mm = parseInt(start.split("-")[1]) - 1;
    var dd = parseInt(start.split("-")[2]);
    var date = new Date(y, mm, dd, 0, 0, 0, 0);

    date.setTime(date.getTime() + duration * 24 * 60 * 60 * 1000);

    dd = date.getDate();
    mm = date.getMonth() + 1;
    y = date.getFullYear();
    return y + "-" + mm + "-" + dd;
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

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateTask: (name,duration,start,finish,resources) =>
      dispatch(
        tasksActions.createTaskInProject(name,duration,start,finish,resources)
      ),
  };
};

export default connect(null, mapDispatchToProps)(CreateTask);