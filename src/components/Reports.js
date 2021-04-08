import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(2),
    // padding: theme.spacing(2),
  },
  btn: {
    marginTop: theme.spacing(2),
    maxWidth: "12rem",
  },
}));
function Reports(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      alignContent="center"
      direction="column"
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h4" component="h1" align="center">
          Reports
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={() => props.history.push("/tasks-report")}
        >
          Tasks Report
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={() => props.history.push("/resources-report")}
        >
          Resources Report
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={() => props.history.push("/tasks-resources-report")}
        >
          Tasks & Resources Report
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={() => props.history.push("/tasks-cost-report")}
        >
          Tasks Cost Report
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={() => props.history.push("/project-cost-report")}
        >
          Project Cost Report
        </Button>
      </Grid>
    </Grid>
  );
}

export default withRouter(Reports);
