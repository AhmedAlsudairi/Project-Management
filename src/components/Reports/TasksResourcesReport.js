import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, Typography } from "@material-ui/core";
import * as reportActions from "../../store/actions/report";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 750,
  },
}));

const rows = [
  {
    taskID: "1",
    taskName: "task1",
    duration: "5 days",
    start: "10-11-2020",
    finish: "14-11-2020",
    resourceName: "resource1",
  },
  {
    taskID: "2",
    taskName: "task1",
    duration: "5 days",
    start: "10-11-2020",
    finish: "14-11-2020",
    resourceName: "resource2",
  },
  {
    taskID: "3",
    taskName: "task1",
    duration: "5 days",
    start: "10-11-2020",
    finish: "14-11-2020",
    resourceName: "resource1",
  },
];

function TasksResourcesReport(props) {
  const classes = useStyles();

  useEffect(() => {
    props.onFetchReport();
  }, []);

  return (
    <Grid>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Typography variant="h2" component="h1" align="center">
            Tasks & Resources Report
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs="2">
          <Button
            variant="contained"
            color="primary"
            onClick={() => props.history.goBack()}
          >
            {"<- Go back"}
          </Button>
        </Grid>
        <Grid item xs="8">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Task ID</TableCell>
                  <TableCell align="left">Tak Name</TableCell>
                  <TableCell align="left">Duration</TableCell>
                  <TableCell align="left">Start</TableCell>
                  <TableCell align="left">Finish</TableCell>
                  <TableCell align="left">Resource Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.taskResourcesReport.map((row) => {
                  var startDate = row.start;
                  startDate = new Date(startDate).toUTCString();
                  startDate = startDate.split(" ").slice(0, 4).join(" ");

                  var finishDate = row.finish;
                  finishDate = new Date(finishDate).toUTCString();
                  finishDate = finishDate.split(" ").slice(0, 4).join(" ");
                  return (
                    <TableRow key={row.id}>
                      <TableCell align="left">{row.id}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.duration}</TableCell>
                      <TableCell align="left">{startDate}</TableCell>
                      <TableCell align="left">{finishDate}</TableCell>
                      <TableCell align="left">{row.resources}</TableCell>
                    </TableRow>
                  )
                })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs="2"></Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    taskResourcesReport: state.report.taskResourcesReport,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReport: () => dispatch(reportActions.fetchTaskResourcesReport()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksResourcesReport);