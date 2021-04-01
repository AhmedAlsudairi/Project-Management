import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

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

  const handleCreateTask = (e) => {
    e.preventDefault();
    console.log("task created");
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
        />
        <TextField
          className={classes.textField}
          required
          id="taskName"
          label="Task Name"
          margin="dense"
        />
        <TextField
          className={classes.textField}
          required
          id="taskDuration"
          label="Duration"
          margin="dense"
        />
        <TextField
          id="date"
          type="date"
          required
          className={classes.textField}
          //   value={taskSelected(row.id) ? currentTask.start : row.start}
          //   onChange={handleStartChange}
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
        >
          Create new task
        </Button>
      </form>
    </Paper>
  );
}

export default CreateTask;
