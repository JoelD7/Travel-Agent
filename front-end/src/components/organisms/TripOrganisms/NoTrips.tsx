import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Colors } from "../../../styles";
import { Routes, selectIsAuthenticated } from "../../../utils";
import { CustomButton, IconText, Text } from "../../atoms";

export function NoTrips() {
  const noTripStyles = makeStyles((theme: Theme) => ({
    noTripContainer: {
      marginLeft: "260px",
      marginBottom: "100px",
      width: "calc(100% - 260px)",
      [theme.breakpoints.down(960)]: {
        margin: "auto",
        width: "97%",
      },

      [theme.breakpoints.down(450)]: {
        padding: 10,
      },
    },
    noTripGrid: {
      alignContent: "center",
      height: "75vh",
      marginBottom: "100px",
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
    <div className={style.noTripContainer}>
      <IconText
        style={{ marginBottom: "20px", marginTop: "10px" }}
        iconStyle={{ padding: "12px" }}
        shadow
        size={35}
        icon={faPlaneDeparture}
      >
        <Text bold component="h1">
          Trips
        </Text>
      </IconText>

      <Grid container className={style.noTripGrid} justify="center">
        <Grid container className={style.noTripContentGrid}>
          <Grid item className={style.textGrid}>
            <Text color={Colors.GRAY_TEXT}>
              Organize your ideal vacation in <b>Trips</b>. Book flights, hotels and more
              and group them in a single place.
            </Text>
          </Grid>

          <Grid item xs={12}>
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
    </div>
  );
}
