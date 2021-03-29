import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import TasksTable from "../components/TasksTable";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Tasks() {
  const classes = useStyles();

  return (
    <Grid>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Typography variant="h2" component="h1" align="center">
            Tasks
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs="2"></Grid>
        <Grid item xs="8">
          {" "}
          <TasksTable />
        </Grid>
        <Grid item xs="2"></Grid>
      </Grid>
    </Grid>
  );
}

export default Tasks;
