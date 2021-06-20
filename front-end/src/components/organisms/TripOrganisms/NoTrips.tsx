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
    noTripContainer: {},
  }));

  const style = noTripStyles();
  const isAuthenticated: boolean = useSelector(selectIsAuthenticated);
  const history = useHistory();

  function redirect() {
    isAuthenticated ? history.push(Routes.CREATE_TRIP) : history.push(Routes.LOGIN);
  }

  return (
    <Grid
      container
      className={style.noTripContainer}
      justify="center"
      alignItems="center"
    >
      <Text color={Colors.GRAY_TEXT}>
        Organize your ideal vacation in <b>Trips</b>. Book flights, hotels and more and
        group them in a single place.
      </Text>

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
  );
}
