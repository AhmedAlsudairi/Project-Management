import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import TasksTable from "../components/TasksTable";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ResourcesTable from "../components/ResourcesTable";

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

function MainPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Typography variant="h2" component="h1" align="center">
            Project Management
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs="2"></Grid>
        <Grid item xs="8">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Tasks" />
            <Tab label="Resources" />
          </Tabs>
          {value === 0 ? <TasksTable /> : <ResourcesTable />}
        </Grid>
        <Grid item xs="2"></Grid>
      </Grid>
    </Grid>
  );
}

export default MainPage;
