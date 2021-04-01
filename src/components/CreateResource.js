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

function CreateResource() {
  const classes = useStyles();

  const handleCreateTask = (e) => {
    e.preventDefault();
    console.log("task created");
  };
  return (
    <Paper square className={classes.paper}>
      <Typography variant="h5">Create a resource:</Typography>
      <form>
        <TextField
          className={classes.textField}
          required
          id="name"
          label="Resource Name"
          margin="dense"
        />
        <TextField
          className={classes.textField}
          required
          id="type"
          label="Type"
          margin="dense"
        />
        <TextField
          className={classes.textField}
          required
          id="max"
          label="Max No.Resource"
          margin="dense"
        />
        <TextField
          className={classes.textField}
          required
          id="stRate"
          label="St.Rate"
          margin="dense"
        />

        <Button
          onClick={handleCreateTask}
          variant="contained"
          color="primary"
          type={"submit"}
        >
          Create new resource
        </Button>
      </form>
    </Paper>
  );
}

export default CreateResource;
