import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, TableFooter, Typography } from "@material-ui/core";

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
    totalCost: "600",
  },
  {
    taskID: "2",
    taskName: "task1",
    duration: "5 days",
    start: "10-11-2020",
    finish: "14-11-2020",
    resourceName: "resource2",
    totalCost: "600",
  },
  {
    taskID: "3",
    taskName: "task1",
    duration: "5 days",
    start: "10-11-2020",
    finish: "14-11-2020",
    resourceName: "resource1",
    totalCost: "600",
  },
];

export default function ProjectCostReport(props) {
  const classes = useStyles();

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
                {rows.map((row) => (
                  <TableRow key={row.taskID}>
                    <TableCell align="left">{row.taskID}</TableCell>
                    <TableCell align="left">{row.taskName}</TableCell>
                    <TableCell align="left">{row.duration}</TableCell>
                    <TableCell align="left">{row.start}</TableCell>
                    <TableCell align="left">{row.finish}</TableCell>
                    <TableCell align="left">{row.resourceName}</TableCell>
                    <TableCell align="left">{row.totalCost}$</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align="left">Total Cost</TableCell>
                  <TableCell align="left" colSpan={5}></TableCell>
                  <TableCell align="left">
                    {rows.reduce(
                      (prev, current) => prev + parseFloat(current.totalCost),
                      0
                    )}
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
