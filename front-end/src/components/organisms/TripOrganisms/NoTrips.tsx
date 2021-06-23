import { Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Colors } from "../../../styles";
import { Routes, selectIsAuthenticated } from "../../../utils";
import { CustomButton, Text } from "../../atoms";

interface NoTripsProps {}

export function NoTrips({}: NoTripsProps) {
  const noTripStyles = makeStyles((theme: Theme) => ({
    buttonGrid: {
      // width: '50%',
    },
    noTripContainer: {
      alignContent: "center",
      height: "95vh",
      marginLeft: "265px",
      marginBottom: "100px",
      width: "calc(100% - 300px)",
      [theme.breakpoints.down(960)]: {
        margin: "auto",
        marginLeft: 0,
        width: "100%",
      },
      [theme.breakpoints.down(460)]: {
        height: "85vh",
      },
      [theme.breakpoints.down(375)]: {
        height: "65vh",
      },
    },
    noTripContentGrid: {
      width: "100%",
      [theme.breakpoints.down(960)]: {
        marginLeft: 0,
        width: "90%",
      },
    },
    textGrid: {
      margin: "auto",
      [theme.breakpoints.down(960)]: {
        width: "70%",
      },
      [theme.breakpoints.down(735)]: {
        width: "100%",
      },
    },
  }));

  const style = noTripStyles();
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
  const history = useHistory();

  function redirect() {
    isAuthenticated ? history.push(Routes.CREATE_TRIP) : history.push(Routes.LOGIN);
  }

  return (
    <Grid container className={style.noTripContainer} justify="center">
      <Grid container className={style.noTripContentGrid}>
        <Grid item className={style.textGrid}>
          <Text color={Colors.GRAY_TEXT}>
            Organize your ideal vacation in <b>Trips</b>. Book flights, hotels and more
            and group them in a single place.
          </Text>
        </Grid>

        <Grid item xs={12} className={style.buttonGrid}>
          <Grid container justify="center">
            {isAuthenticated ? (
              <CustomButton backgroundColor={Colors.GREEN} onClick={() => redirect()}>
                Create trip
              </CustomButton>
            ) : (
              <CustomButton backgroundColor={Colors.GREEN} onClick={() => redirect()}>
                Login to create a trip
              </CustomButton>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
