import DateFnsUtils from "@date-io/date-fns";
import {
  faBaby,
  faChild,
  faMapMarkerAlt,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  FormControl,
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { FONT } from "../../assets/fonts";
import { Navbar, ServicesToolbar } from "../../components";
import { CustomTF } from "../../components/atoms/CustomTF";
import { Colors } from "../../styles";
import { muiDateFormatter } from "../../utils";
import { FlightClass, FlightTypes } from "../../utils/types";
import { FlightClassType } from "../../utils/types/FlightClassType";
import { FlightSearchParams } from "../../utils/types/FlightSearchParams";
import { flightStyles } from "./flights-styles";

export function Flights_Home() {
  const style = flightStyles();

  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: FONT,
        },
      },
      MuiButton: {
        root: {
          fontFamily: FONT,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: FONT,
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
          fontFamily: FONT,
        },
        subtitle1: {
          fontFamily: FONT,
        },
        body1: {
          fontFamily: FONT,
        },
        body2: {
          fontFamily: FONT,
        },
        caption: {
          fontFamily: FONT,
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

  const reservationParamsTheme = createMuiTheme({
    overrides: {
      MuiInputBase: {
        root: {
          fontFamily: FONT,
        },
      },
      MuiMenuItem: {
        root: {
          fontFamily: FONT,
        },
      },
      MuiListItem: {
        button: {
          borderBottom: "1px solid rgba(0,0,0,0)",
          "&:hover": {
            borderBottom: "1px solid rgba(0,0,0,0)",
          },
        },
      },

      MuiOutlinedInput: {
        root: {
          "&:hover fieldset": {
            borderColor: "#cecece",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#cecece",
          },
        },
      },
    },
  });

  const destination = {
    image: "/destinations/dubai.jpg",
    name: "Dubai",
  };

  const [state, setState] = useState<FlightSearchParams>({
    adults: "",
    children: "",
    class: "Economy",
    departure: new Date(),
    return: addDays(new Date(), 2),
    from: "",
    to: "",
    flightType: "Round trip",
    infants: "",
  });

  const passengersParams = [
    {
      variable: "adults",
      icon: faUsers,
      label: "Adults",
    },
    {
      variable: "children",
      icon: faChild,
      label: "Children",
    },
    {
      variable: "infants",
      icon: faBaby,
      label: "Infants",
    },
  ];

  const classes = [
    FlightClass.Economy,
    FlightClass.PremiumEconomy,
    FlightClass.Business,
    FlightClass.First,
  ];

  return (
    <div>
      <Navbar />
      <ServicesToolbar />

      <div
        className={style.topContainer}
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <Grid container spacing={2} className={style.reservationContainer}>
          <Grid item xs={12}>
            <h2>{`Find the best flight to ${destination.name}`}</h2>
          </Grid>

          <Grid item xs={12} key="toolbar">
            <Toolbar classes={{ root: style.reservationOptionsToolbar }}>
              <MenuItem
                selected={state.flightType === FlightTypes.ROUND}
                classes={{ root: style.menuItemRoot }}
                onClick={() => setState({ ...state, flightType: "Round trip" })}
              >
                Round-trip
              </MenuItem>

              <MenuItem
                selected={state.flightType === FlightTypes.ONE_WAY}
                classes={{ root: style.menuItemRoot }}
                onClick={() => setState({ ...state, flightType: "One way" })}
              >
                One way
              </MenuItem>
            </Toolbar>
          </Grid>

          <Grid item xs={6} key="destinationTF">
            <h5 className={style.reservationParamText}>From</h5>
            <CustomTF
              value={state.from}
              className={style.destinationTF}
              outlineColor={Colors.BLUE}
              updateState={(e) => setState({ ...state, from: e.target.value })}
              placeholder="City or airport"
              startAdornment={
                <FontAwesomeIcon icon={faMapMarkerAlt} color={Colors.BLUE} />
              }
            />
          </Grid>

          <Grid item xs={6} key="destinationTF">
            <h5 className={style.reservationParamText}>To</h5>
            <CustomTF
              value={state.to}
              className={style.destinationTF}
              outlineColor={Colors.BLUE}
              updateState={(e) => setState({ ...state, to: e.target.value })}
              placeholder="City or airport"
              startAdornment={
                <FontAwesomeIcon icon={faMapMarkerAlt} color={Colors.BLUE} />
              }
            />
          </Grid>

          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid item xs={6}>
                <h5 className={style.reservationParamText}>Departure</h5>
                <KeyboardDatePicker
                  value={state.departure}
                  labelFunc={muiDateFormatter}
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy"
                  onChange={(d) => setState({ ...state, departure: d })}
                />
              </Grid>

              <Grid item xs={6}>
                <h5 className={style.reservationParamText}>Return</h5>
                <KeyboardDatePicker
                  value={state.return}
                  labelFunc={muiDateFormatter}
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy"
                  onChange={(d) => setState({ ...state, return: d })}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </ThemeProvider>

          <ThemeProvider theme={reservationParamsTheme}>
            {passengersParams.map((passenger, i) => (
              <Grid item key={i} xs={4}>
                <h5 className={style.reservationParamText}>
                  {passenger.label}
                </h5>

                <FormControl style={{ width: "100%" }}>
                  <Select
                    value={state[passenger.variable]}
                    variant="outlined"
                    className={style.select}
                    startAdornment={
                      <FontAwesomeIcon
                        icon={passenger.icon}
                        color={Colors.BLUE}
                      />
                    }
                    onChange={(e) =>
                      setState({
                        ...state,
                        [passenger.variable]: e.target.value as string,
                      })
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <MenuItem value={n}>{n}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}

            <Grid item xs={6}>
              <h5 className={style.reservationParamText}>Class</h5>

              <FormControl style={{ width: "100%" }}>
                <Select
                  value={state.class}
                  variant="outlined"
                  className={style.select}
                  startAdornment={
                    <FontAwesomeIcon icon={faStar} color={Colors.BLUE} />
                  }
                  onChange={(e) =>
                    setState({
                      ...state,
                      class: e.target.value as FlightClassType,
                    })
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
          </ThemeProvider>
        </Grid>
      </div>
    </div>
  );
}
