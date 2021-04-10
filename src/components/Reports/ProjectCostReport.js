import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, TableFooter, Typography } from "@material-ui/core";
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


function ProjectCostReport(props) {
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
            Project Cost Report
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
                  <TableCell align="left">Total Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.projectReport.map((row) => {
                  var startDate = row.task_start;
                  startDate = new Date(startDate).toUTCString();
                  startDate = startDate.split(" ").slice(0, 4).join(" ");

                  var finishDate = row.task_finish;
                  finishDate = new Date(finishDate).toUTCString();
                  finishDate = finishDate.split(" ").slice(0, 4).join(" ");
                  return(
                  <TableRow key={row.taskID}>
                    <TableCell align="left">{row.task_id}</TableCell>
                    <TableCell align="left">{row.task_name}</TableCell>
                    <TableCell align="left">{row.task_duration}</TableCell>
                    <TableCell align="left">{startDate}</TableCell>
                    <TableCell align="left">{finishDate}</TableCell>
                    <TableCell align="left">{row.resources.map((r)=> r+', ')}</TableCell>
                    <TableCell align="left">{row.total_cost}$</TableCell>
                  </TableRow>
                )})}
                <TableRow>
                  <TableCell align="left">Total Cost</TableCell>
                  <TableCell align="left" colSpan={5}></TableCell>
                  <TableCell align="left">
                    {/* {rows.reduce(
                      (prev, current) => prev + parseFloat(current.totalCost),
                      0
                    )} */}
                    {props.totalCost}
                    $
                  </TableCell>
                </TableRow>
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
    projectReport: state.report.projectReport,
    totalCost: state.report.totalCost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchReport: () => dispatch(reportActions.fetchProjectReport()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCostReport);