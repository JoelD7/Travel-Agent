import { Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { CloudImage } from "../assets";
import { ProgressCircle } from "../components";
import { selectTripperLogoImg } from "../utils";

interface LoadingProps {}

export function Loading({}: LoadingProps) {
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

  function getImage() {
    let image =
      localStorage.getItem("tripperLogo") === null
        ? ""
        : (localStorage.getItem("tripperLogo") as string);

    return image;
  }

  return (
    <Grid container justify="center" alignItems="center" className={style.mainContainer}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <img src={tripperLogoImg} className={style.image} />
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
