import DateFnsUtils from "@date-io/date-fns";
import {
  faBaby,
  faChild,
  faMapMarkerAlt,
  faPlane,
  faPlaneDeparture,
  faStar,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  createMuiTheme,
  FormControl,
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { addDays, format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Family } from "../../assets/fonts";
import {
  CardFlight,
  CustomButton,
  IconText,
  Navbar,
  PageSubtitle,
  ServicesToolbar,
  Text,
} from "../../components";
import { CustomTF } from "../../components/atoms/CustomTF";
import { Colors } from "../../styles";
import {
  formatFlightDateTime,
  getFlightCitiesLabel,
  muiDateFormatter,
  Routes,
} from "../../utils";
import { FlightTypes } from "../../utils/types";
import { FlightSearchParams } from "../../utils/types/FlightSearchParams";
import { flightStyles } from "./flights-styles";

import axios, { AxiosRequestConfig } from "axios";
import { useHistory } from "react-router-dom";

export function Flights_Home() {
  const style = flightStyles();

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

  const reservationParamsTheme = createMuiTheme({
    overrides: {
      MuiInputBase: {
        root: {
          fontFamily: Family,
        },
      },
      MuiMenuItem: {
        root: {
          fontFamily: Family,
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
    image: "dubai.jpg",
    name: "Dubai",
  };

  const history = useHistory();

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
    priceRange: [0, 500],
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

  const classes: FlightClassType[] = ["Economy", "Premium Economy", "Business", "First"];

  const deals: Flight[] = [
    {
      price: {
        currency: "USD",
        total: 198,
      },
      class: "Economy",
      itineraries: [
        {
          duration: "PT6H15M",
          segments: [
            {
              departure: {
                iata: "SIN",
                city: "Singapore",
                at: parseISO("2021-02-02T07:15:00"),
                terminal: "2",
              },
              arrival: {
                iata: "DXB",
                city: "Dubai",
                at: parseISO("2021-02-02T13:39:00"),
                terminal: "31",
              },
              carrier: "Egyptair",
              duration: "PT6H15M",
            },
          ],
        },
        {
          duration: "PT8H25M",
          segments: [
            {
              departure: {
                iata: "DXB",
                city: "Dubai",
                at: parseISO("2021-02-12T09:15:00"),
                terminal: "2",
              },
              arrival: {
                iata: "SIN",
                city: "Singapore",
                at: parseISO("2021-02-12T16:55:00"),
                terminal: "31",
              },
              carrier: "Emirates",
              duration: "PT8H25M",
            },
          ],
        },
      ],
    },
    {
      price: {
        currency: "USD",
        total: 198,
      },
      class: "Economy",
      itineraries: [
        {
          duration: "PT6H15M",
          segments: [
            {
              departure: {
                iata: "SIN",
                city: "Singapore",
                at: parseISO("2021-02-02T07:15:00"),
                terminal: "2",
              },
              arrival: {
                iata: "DXB",
                city: "Dubai",
                at: parseISO("2021-02-02T13:39:00"),
                terminal: "31",
              },
              carrier: "Egyptair",
              duration: "PT6H15M",
            },
          ],
        },
      ],
    },
    {
      price: {
        currency: "USD",
        total: 198,
      },
      class: "Economy",
      itineraries: [
        {
          duration: "PT6H15M",
          segments: [
            {
              departure: {
                iata: "SIN",
                city: "Singapore",
                at: parseISO("2021-02-02T07:15:00"),
                terminal: "2",
              },
              arrival: {
                iata: "DXB",
                city: "Dubai",
                at: parseISO("2021-02-02T13:39:00"),
                terminal: "31",
              },
              carrier: "Egyptair",
              duration: "PT6H15M",
            },
          ],
        },
        {
          duration: "PT8H25M",
          segments: [
            {
              departure: {
                iata: "DXB",
                city: "Dubai",
                at: parseISO("2021-02-12T09:15:00"),
                terminal: "2",
              },
              arrival: {
                iata: "SIN",
                city: "Singapore",
                at: parseISO("2021-02-12T16:55:00"),
                terminal: "31",
              },
              carrier: "Emirates",
              duration: "PT8H25M",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className={style.mainContainer}>
      <Navbar />

      <Grid
        container
        className={style.topContainer}
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <Grid item xs={12}>
          <ServicesToolbar />
        </Grid>
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

          <Grid
            item
            key="destinationTF"
            className={
              state.flightType === FlightTypes.ROUND
                ? style.largeGrid
                : style.largeGridFull
            }
          >
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

          {state.flightType === FlightTypes.ROUND && (
            <Grid item className={style.largeGrid} key="destinationTF">
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
          )}

          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid
                item
                className={
                  state.flightType === FlightTypes.ROUND
                    ? style.largeGrid
                    : style.largeGridFull
                }
              >
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

              {state.flightType === FlightTypes.ROUND && (
                <Grid item className={style.largeGrid}>
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
              )}
            </MuiPickersUtilsProvider>
          </ThemeProvider>

          <ThemeProvider theme={reservationParamsTheme}>
            {passengersParams.map((passenger, i) => (
              <Grid item key={i} className={style.passengerParamGrid}>
                <h5 className={style.reservationParamText}>{passenger.label}</h5>

                <FormControl style={{ width: "100%" }}>
                  <Select
                    value={state[passenger.variable]}
                    variant="outlined"
                    className={style.select}
                    startAdornment={
                      <FontAwesomeIcon icon={passenger.icon} color={Colors.BLUE} />
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

            <Grid item className={style.largeGrid}>
              <h5 className={style.reservationParamText}>Class</h5>

              <FormControl style={{ width: "100%" }}>
                <Select
                  value={state.class}
                  variant="outlined"
                  className={style.select}
                  startAdornment={<FontAwesomeIcon icon={faStar} color={Colors.BLUE} />}
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

          <Grid item xs={12}>
            <CustomButton
              rounded
              backgroundColor={Colors.PURPLE}
              style={{ width: "100%" }}
              onClick={() => history.push(Routes.FLIGHT_LIST)}
            >Find flights</CustomButton>
          </Grid>
        </Grid>
      </Grid>

      <PageSubtitle label="Great deals" containerStyle={{ margin: "20px auto" }} />

      <Grid container spacing={2} className={style.dealsContainer}>
        {deals.map((deal, i) => (
          <CardFlight variant="deal" flight={deal} />
        ))}
      </Grid>
    </div>
  );
}
