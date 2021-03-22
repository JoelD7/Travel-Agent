import DateFnsUtils from "@date-io/date-fns";
import { faMapMarkerAlt, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  FormControl,
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Family } from "../../assets/fonts";
import { Colors, Shadow } from "../../styles";
import { homeStyles } from "../../styles/Home/home-styles";
import {
  capitalizeString,
  muiDateFormatter,
  selectAirportPredictions,
  selectFlightFromAutocomplete,
  selectFlightParams,
  selectFlightToAutocomplete,
  updateAirportPredictions,
} from "../../utils";
import {
  fetchAirportCitiesByInput,
  startAirportCityPrediction,
} from "../../utils/external-apis/amadeus-apis";
import {
  FlightSearch,
  setFlightAdults,
  setFlightClass,
  setFlightDeparture,
  setFlightFrom,
  setFlightFromAutocomplete,
  setFlightReturn,
  setFlightTo,
  setFlightToAutocomplete,
} from "../../utils/store/flight-slice";
import { AirportCity, IATALocation } from "../../utils/types/location-types";
import { CustomButton } from "../atoms";
import { IataAutocomplete } from "../molecules";
import { CustomTF } from "../atoms/CustomTF";

interface FlightType {
  departure: MaterialUiPickersDate;
  return: MaterialUiPickersDate;
  from: string;
  to: string;
  passengers: string;
  class: FlightClassType;
  [key: string]: FlightType[keyof FlightType];
}

export default function HomeFlightReservation() {
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

      MuiSelect: {
        select: {
          borderColor: "#cecece",
          "&:focus": {
            borderColor: "#cecece",
          },
        },
      },
    },
  });
  const dispatch = useDispatch();

  const flight: FlightSearch = useSelector(selectFlightParams);
  const [focusedAutocomplete, setFocusedAutocomplete] = useState<string>("");

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);

  const airportPredictions: IATALocation[] = useSelector(selectAirportPredictions);

  useEffect(() => {
    if (focusedAutocomplete === "From") {
      startAirportCityPrediction(flight.from, getAirportPredictions);
    } else {
      startAirportCityPrediction(flight.to, getAirportPredictions);
    }
  }, [flight.from, flight.to]);

  function getAirportPredictions(searchQuery: string) {
    if (searchQuery === "") {
      return;
    }
    fetchAirportCitiesByInput(searchQuery, "AIRPORT")
      .then((res) => {
        dispatch(updateAirportPredictions(res.data.data));
      })
      .catch((error) => console.log(error));
  }

  const locationParms: { label: string; prop: "from" | "to" }[] = [
    {
      label: "From",
      prop: "from",
    },
    {
      label: "To",
      prop: "to",
    },
  ];

  const classes: FlightClassType[] = ["Economy", "Premium Economy", "Business", "First"];

  const style = homeStyles();

  function updateLocationParams(
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    param: string
  ) {
    if (param === "from") {
      dispatch(setFlightFrom(e.target.value));
    } else {
      dispatch(setFlightTo(e.target.value));
    }
  }

  function getAutocompleteValue(param: string) {
    return param === "from" ? flightFromAutocomplete : flightToAutocomplete;
  }

  function onAutomcompleteValueChange(
    e: ChangeEvent<{}>,
    value: IATALocation | null,
    param: string
  ) {
    param === "from"
      ? dispatch(setFlightFromAutocomplete(value))
      : dispatch(setFlightToAutocomplete(value));
  }

  return (
    <div>
      <Grid container className={style.reservationParamsGrid} spacing={2}>
        <ThemeProvider theme={theme}>
          {/* Dates */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item className={style.datepickerItemGridFlight}>
              <h5 className={style.reservationParamText}>Departure</h5>
              <KeyboardDatePicker
                value={flight.departure}
                labelFunc={(date, invalidLabel) =>
                  muiDateFormatter(date, invalidLabel, "date")
                }
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy"
                onChange={(d) => dispatch(setFlightDeparture(d))}
              />
            </Grid>

            <Grid item className={style.datepickerItemGridFlight}>
              <h5 className={style.reservationParamText}>Return</h5>
              <KeyboardDatePicker
                value={flight.return}
                labelFunc={(date, invalidLabel) =>
                  muiDateFormatter(date, invalidLabel, "date")
                }
                className={style.datepicker}
                minDate={new Date()}
                format="dd MMM., yyyy"
                onChange={(d) => dispatch(setFlightReturn(d))}
              />
            </Grid>
          </MuiPickersUtilsProvider>

          {/* Locations */}
          {locationParms.map((param) => (
            <Grid item className={style.locationParamsGrid}>
              <h5 className={style.reservationParamText}>{param.label}</h5>
              <IataAutocomplete type="airport" flightDirection={param.prop} />
            </Grid>
          ))}
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <Grid item className={style.passengersClassGrid} key="passengers">
            <h5 className={style.reservationParamText}>Passengers</h5>

            <FormControl style={{ width: "100%" }}>
              <Select
                value={flight.adults}
                variant="outlined"
                className={style.select}
                startAdornment={<FontAwesomeIcon icon={faUsers} color={Colors.BLUE} />}
                onChange={(e) => dispatch(setFlightAdults(e.target.value as number))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <MenuItem value={n}>{n}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item className={style.passengersClassGrid} key="class">
            <h5 className={style.reservationParamText}>Class</h5>

            <FormControl style={{ width: "100%" }}>
              <Select
                value={flight.class}
                variant="outlined"
                className={style.select}
                startAdornment={<FontAwesomeIcon icon={faStar} color={Colors.BLUE} />}
                onChange={(e) =>
                  dispatch(setFlightClass(e.target.value as FlightClassType))
                }
              >
                {classes.map((n, i) => (
                  <MenuItem key={i} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Grid container justify="center">
              <CustomButton
                rounded
                style={{ width: "90%", boxShadow: Shadow.MEDIUM }}
                onClick={() => {}}
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
