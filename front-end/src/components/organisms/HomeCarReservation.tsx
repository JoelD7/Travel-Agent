import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, Grid, ThemeProvider } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays, format, parseISO } from "date-fns";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";
import { homeStyles } from "../../styles/Home/home-styles";
import {
  AutocompleteType,
  CarReducer,
  convertCarReducerToURLParams,
  isDateAfterOrEqual,
  muiDateFormatter,
  Routes,
  selectCarReducer,
  setCarSearch,
} from "../../utils";
import { CustomButton, Text } from "../atoms";
import { IataAutocomplete } from "./IataAutocomplete/IataAutocomplete";

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

  const carReducer: CarReducer = useSelector(selectCarReducer);

  const dispatch = useDispatch();

  const history = useHistory();

  const locationParms = [
    {
      label: "Pickup Location",
      prop: "pickupLocation",
    },
  ];

  const style = homeStyles();

  function onDateChange(date: MaterialUiPickersDate, type: string) {
    let newDate: Date;

    switch (type) {
      case "pickup_date":
        newDate = date === null ? new Date() : parseISO(date.toISOString());
        let dropoff_date: Date = parseISO(carReducer.carSearch.dropoff_date);

        if (dropoff_date && isDateAfterOrEqual(newDate, dropoff_date)) {
          dispatch(
            setCarSearch({
              ...carReducer.carSearch,
              pickup_date: format(newDate, `yyyy-MM-dd'T'HH:mm:ss`),
              dropoff_date: format(addDays(newDate, 1), `yyyy-MM-dd'T'HH:mm:ss`),
            })
          );
        } else {
          dispatch(
            setCarSearch({
              ...carReducer.carSearch,
              pickup_date: format(newDate, `yyyy-MM-dd'T'HH:mm:ss`),
            })
          );
        }

        break;
      case "dropoff_date":
        newDate = date === null ? new Date() : parseISO(date.toISOString());
        dispatch(
          setCarSearch({
            ...carReducer.carSearch,
            dropoff_date: format(newDate, `yyyy-MM-dd'T'HH:mm:ss`),
          })
        );
        break;
    }
  }

  function onSearchClick() {
    history.push(`${Routes.CAR_RENTAL}${convertCarReducerToURLParams(carReducer)}`);
  }

  return (
    <div>
      <Grid container className={style.reservationParamsGrid} spacing={2}>
        <ThemeProvider theme={theme}>
          {/* Dates */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item className={style.datepickerItemGridCar}>
              <Text color={Colors.BLUE} bold>
                Pickup
              </Text>
              <KeyboardDatePicker
                value={carReducer.carSearch.pickup_date}
                labelFunc={(date, invalidLabel) =>
                  muiDateFormatter(date, invalidLabel, "date")
                }
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy  hh:mm a"
                onChange={(d) => onDateChange(d, "pickup_date")}
              />
            </Grid>

            <Grid item className={style.datepickerItemGridCar}>
              <Text color={Colors.BLUE} bold>
                Dropoff
              </Text>
              <KeyboardDatePicker
                value={carReducer.carSearch.dropoff_date}
                labelFunc={(date, invalidLabel) =>
                  muiDateFormatter(date, invalidLabel, "date")
                }
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy  hh:mm a"
                onChange={(d) => onDateChange(d, "dropoff_date")}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          {locationParms.map((param) => (
            <Grid item key={param.label} className={style.locationParamsGrid}>
              <Text color={Colors.BLUE} bold>
                Pickup location
              </Text>
              <div style={{ width: "100%" }}>
                <IataAutocomplete type={AutocompleteType.AIRPORT} flightDirection="to" />
              </div>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Grid container justify="center">
              <CustomButton
                rounded
                style={{ width: "90%", boxShadow: Shadow.MEDIUM }}
                onClick={() => onSearchClick()}
              >
                Search
              </CustomButton>
            </Grid>
          </Grid>
        </ThemeProvider>
      </Grid>
    </div>
  );
}
