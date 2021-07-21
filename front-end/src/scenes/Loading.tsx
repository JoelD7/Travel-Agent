import { Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { ProgressCircle } from "../components";
import { selectTripperLogoImg } from "../utils";

export function Loading() {
  const loadingStyles = makeStyles((theme: Theme) => ({
    image: {
      width: "20%",
    },
    mainContainer: {
      width: "100%",
      height: "100vh",
      alignContent: "center",
    },
  }));

  const style = loadingStyles();

  const tripperLogoImg: string = useSelector(selectTripperLogoImg);

  return (
    <Grid container justify="center" alignItems="center" className={style.mainContainer}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <img src={tripperLogoImg} alt="tripper-logo" className={style.image} />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container justify="center">
          <ProgressCircle />
        </Grid>
      </Grid>
    </Grid>
  );
}
