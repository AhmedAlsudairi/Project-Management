import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rotated: {
    transform: "rotate(90deg)",
  },
  rotation: {
    animation: "$rotate-text infinite 5s linear",
    marginTop: "20%",
    marginLeft: "50%",
    width: "fit-content",
    height: "fit-content",
    justifyContent: "center",
    alignSelf: "center",
    textAnchor: "center",
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

  return (
    <Grid container justify="center" lg={12}>
      <Grid container>
        <Grid item lg={2}></Grid>
        <Grid item lg={8}>
          <Typography variant="h1">
            Welcome To Main Page!!!
            <div className={classes.rotation}>
              <Typography variant="caption">
                Where there are nothing!
              </Typography>
            </div>
          </Typography>
        </Grid>
        <Grid item lg={2}></Grid>
      </Grid>
    </Grid>
  );
}

export default MainPage;
