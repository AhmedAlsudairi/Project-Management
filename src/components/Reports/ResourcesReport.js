import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, Typography } from "@material-ui/core";
import * as resourcesActions from "../../store/actions/resources";
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
    resourceName: "1",
    type: "Work",
    max: "120",
    stRate: "15",
  },
  {
    resourceName: "2",
    type: "Work",
    max: "120",
    stRate: "15",
  },
  {
    resourceName: "3",
    type: "Work",
    max: "120",
    stRate: "15",
  },
];

function ResourcesReport(props) {
  const classes = useStyles();

  useEffect(()=>{
    props.onFetchResources();
  },[]);

  return (
    <Grid>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Typography variant="h2" component="h1" align="center">
            Resources Report
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
                  <TableCell align="left">Resource Name</TableCell>
                  <TableCell align="left">Type</TableCell>
                  <TableCell align="left">Material</TableCell>
                  <TableCell align="left">Max (No. of resources)</TableCell>
                  <TableCell align="left">St.Rate</TableCell>
                  <TableCell align="left">Ovt</TableCell>
                  <TableCell align="left">Cost/Use</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.resources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell align="left">{resource.name}</TableCell>
                    <TableCell align="left">{resource.type}</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">{resource.max}</TableCell>
                    <TableCell align="left">{resource.rate}$/hour</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                ))}
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
  return {
    resources: state.resources.resources,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchResources: () =>
      dispatch(
      resourcesActions.fetchResources()
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesReport);