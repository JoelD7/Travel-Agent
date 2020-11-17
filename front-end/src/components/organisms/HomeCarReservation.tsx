import DateFnsUtils from "@date-io/date-fns";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createMuiTheme, Grid, ThemeProvider } from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";
import { homeStyles } from "../../styles/Home/home-styles";
import { muiDateFormatter } from "../../utils";
import { CustomButton } from "../atoms";
import { CustomTF } from "../atoms/CustomTF";

interface CarType {
  pickUp: MaterialUiPickersDate;
  dropOff: MaterialUiPickersDate;
  pickupLocation: string;
  dropOffLocation: string;
  [key: string]: CarType[keyof CarType];
}

export default function HomeCarReservation() {
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Family,
        },
      },
      MuiButton: {
        root: {
          fontFamily: Family,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: Family,
          color: Colors.BLUE,
        },
      },
      //@ts-ignore
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiTypography: {
        h4: {
          fontFamily: Family,
        },
        subtitle1: {
          fontFamily: Family,
        },
        body1: {
          fontFamily: Family,
        },
        body2: {
          fontFamily: Family,
        },
        caption: {
          fontFamily: Family,
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: "10px",
          backgroundColor: "white",

          "&:hover": {
            borderColor: "#cecece",
          },
        },
      },
      MuiPickersDay: {
        current: {
          color: Colors.BLUE,
        },
        daySelected: {
          backgroundColor: Colors.BLUE,

          "&:hover": {
            backgroundColor: Colors.BLUE_HOVER,
          },
        },
      },
    },
  });

  const [car, setCar] = useState<CarType>({
    pickUp: new Date(),
    dropOff: addDays(new Date(), 2),
    pickupLocation: "",
    dropOffLocation: "",
  });

  const dateTimeParams = [
    {
      label: "Pick up",
      prop: "pickUp",
    },
    {
      label: "Drop Off",
      prop: "dropOff",
    },
  ];

  const locationParms = [
    {
      label: "Pickup Location",
      prop: "pickupLocation",
    },
    {
      label: "Drop Off Location",
      prop: "dropOffLocation",
    },
  ];

  const style = homeStyles();

  console.log(`hotel car`);
  return (
    <div>
      <Grid container className={style.reservationParamsGrid} spacing={2}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {dateTimeParams.map((param) => (
              <Grid item className={style.datepickerItemGridCar}>
                <h5 className={style.reservationParamText}>{param.label}</h5>
                <KeyboardDateTimePicker
                  value={car[param.prop]}
                  labelFunc={muiDateFormatter}
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy  hh:mm a"
                  onChange={(d) => setCar({ ...car, [param.prop]: d })}
                />
              </Grid>
            ))}
          </MuiPickersUtilsProvider>

          {locationParms.map((param) => (
            <Grid item className={style.locationParamsGrid}>
              <h5 className={style.reservationParamText}>{param.label}</h5>

              <CustomTF
                value={car[param.prop] as string}
                rounded
                width="100%"
                updateState={(e) =>
                  setCar({ ...car, [param.prop]: e.target.value })
                }
                startAdornment={
                  <FontAwesomeIcon icon={faMapMarkerAlt} color={Colors.BLUE} />
                }
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Grid container justify="center">
              <CustomButton
                rounded
                label="Search"
                style={{ width: "90%", boxShadow: Shadow.MEDIUM }}
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </div>
  );
}
