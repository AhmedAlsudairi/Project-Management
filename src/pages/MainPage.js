import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rotated: {
    transform: "rotate(90deg)",
  },
  rotation: {
    animation: "$rotate-text infinite 5s linear",
    height: "50%",
    marginTop: "20%",
    marginLeft: "50%",
    width: "20%",
    justifyContent: "center",
    alignSelf: "center",
  },
  "@keyframes rotate-text": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));

function MainPage() {
  const classes = useStyles();
  const rotation = () => {
    return;
  };
  return (
    <Grid container alignItems="center" alignContent="center">
      <Grid item container lg={2}></Grid>
      <Grid item container lg={10}>
        <Typography variant="h1">
          Welcome To Main Page!!!
          <div className={classes.rotation}>
            <Typography variant="caption">Where there are nothing!</Typography>
          </div>
        </Typography>{" "}
      </Grid>
      <Grid item container lg={2}></Grid>
    </Grid>
  );
}

export default MainPage;
