import DateFnsUtils from "@date-io/date-fns";
import {
  faMapMarkerAlt,
  faUsers,
  faBaby,
  faChild,
  faStar,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  Divider,
  Drawer,
  FormControl,
  Grid,
  MenuItem,
  Select,
  ThemeProvider,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays, parseISO, isBefore } from "date-fns";
import React, { useState } from "react";
import { FONT } from "../../assets/fonts";
import {
  CardFlight,
  CustomButton,
  DatetimeRange,
  FlightTimesRange,
  Navbar,
  PriceRange,
  ServicesToolbar,
} from "../../components";
import { CustomTF } from "../../components/atoms/CustomTF";
import { Colors, Shadow } from "../../styles";
import { muiDateFormatter } from "../../utils";
import { FlightTypes } from "../../utils/types";
import { Flight } from "../../utils/types/Flight";
import {
  flightClasses,
  FlightClassType,
} from "../../utils/types/FlightClassType";
import {
  FlightSearchParams,
  DatetimeRange as DatetimeRangeType,
} from "../../utils/types/FlightSearchParams";
import { flightListStyles } from "./flight-list-styles";

export function Flight_List() {
  const style = flightListStyles();

  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: FONT,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
          },
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
    },
  });

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
    exitFlightDates: {
      minDeparture: new Date(2020, 10, 9, 10, 0),
      maxDeparture: new Date(2020, 10, 10, 10, 0),

      minArrival: new Date(2020, 10, 10, 17, 0),
      maxArrival: new Date(2020, 10, 11, 5, 0),

      departureDatetimeRange: [
        new Date(2020, 10, 9, 10, 0),
        new Date(2020, 10, 10, 10, 0),
      ],
      arrivalDatetimeRange: [
        new Date(2020, 10, 10, 17, 0),
        new Date(2020, 10, 11, 5, 0),
      ],
    },
    returnFlightDates: {
      minDeparture: new Date(2020, 10, 20, 10, 0),
      maxDeparture: new Date(2020, 10, 20, 15, 0),

      minArrival: new Date(2020, 10, 21, 8, 0),
      maxArrival: new Date(2020, 10, 21, 15, 0),

      departureDatetimeRange: [
        new Date(2020, 10, 20, 10, 0),
        new Date(2020, 10, 20, 15, 0),
      ],
      arrivalDatetimeRange: [
        new Date(2020, 10, 21, 8, 0),
        new Date(2020, 10, 21, 15, 0),
      ],
    },
  });

  const [openDrawer, setOpenDrawer] = useState(false);

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

  const flights: Flight[] = [
    {
      price: {
        currency: "USD",
        total: 245,
      },
      class: "Economy",
      itineraries: [
        {
          duration: "PT8H15M",
          segments: [
            {
              departure: {
                iata: "SIN",
                city: "Singapore",
                at: parseISO("2021-02-02T00:30:00"),
                terminal: "2",
              },
              arrival: {
                iata: "DMK",
                city: "Bangkok",
                at: parseISO("2021-02-02T23:30:00"),
                terminal: "31",
              },
              carrier: "Egyptair",
              duration: "PT8H15M",
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

  function onDateRangeChanged(
    arr: number[],
    flightDateRangeField: "exitFlightDates" | "returnFlightDates",
    destinationDateRangeField: "departureDatetimeRange" | "arrivalDatetimeRange"
  ) {
    let curFlightTypeRange: DatetimeRangeType | undefined =
      state[flightDateRangeField];

    if (curFlightTypeRange) {
      setState({
        ...state,
        [flightDateRangeField]: {
          ...curFlightTypeRange,
          [destinationDateRangeField]: [new Date(arr[0]), new Date(arr[1])],
        },
      });
    }
  }

  function SearchFilters() {
    return (
      <>
        <h2>Search filters</h2>
        <h3>Price range</h3>
        <PriceRange
          value={state.priceRange ? state.priceRange : [0, 100]}
          max={500}
          updateState={(slider) => setState({ ...state, priceRange: slider })}
        />

        <Divider style={{ margin: "10px auto" }} />

        <div key="flight times">
          <h3 style={{ marginBottom: "0px" }}>Flight times</h3>

          <FlightTimesRange
            city={state.from}
            label="Take-off"
            max={state.exitFlightDates?.maxDeparture}
            min={state.exitFlightDates?.minDeparture}
            destinationDateRangeField="departureDatetimeRange"
            flightDateRangeField="exitFlightDates"
            destinationDateRangeValue={
              state.exitFlightDates?.departureDatetimeRange
            }
            onDateRangeChanged={onDateRangeChanged}
          />

          <FlightTimesRange
            city={state.to}
            label="Landing"
            max={state.exitFlightDates?.maxArrival}
            min={state.exitFlightDates?.minArrival}
            destinationDateRangeField="arrivalDatetimeRange"
            flightDateRangeField="exitFlightDates"
            destinationDateRangeValue={
              state.exitFlightDates?.arrivalDatetimeRange
            }
            onDateRangeChanged={onDateRangeChanged}
          />

          <FlightTimesRange
            city={state.to}
            label="Take-off"
            max={state.returnFlightDates?.maxDeparture}
            min={state.returnFlightDates?.minDeparture}
            destinationDateRangeField="departureDatetimeRange"
            flightDateRangeField="returnFlightDates"
            destinationDateRangeValue={
              state.returnFlightDates?.departureDatetimeRange
            }
            onDateRangeChanged={onDateRangeChanged}
          />

          <FlightTimesRange
            city={state.from}
            label="Landing"
            max={state.returnFlightDates?.maxArrival}
            min={state.returnFlightDates?.minArrival}
            destinationDateRangeField="arrivalDatetimeRange"
            flightDateRangeField="returnFlightDates"
            destinationDateRangeValue={
              state.returnFlightDates?.arrivalDatetimeRange
            }
            onDateRangeChanged={onDateRangeChanged}
          />
        </div>
      </>
    );
  }

  return (
    <div className={style.mainContainer}>
      <Navbar />
      <ServicesToolbar />

      <div className={style.pageTitleContainerPic}>
        <Grid container spacing={4} className={style.pageTitleContainer}>
          <Grid item xs={12}>
            <h1 style={{ color: "white", marginBottom: "0px" }}>
              Flights to Dubai
            </h1>
          </Grid>

          <Grid key="destinationTF" item className={style.reservParamGrid}>
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
            <Grid item className={style.reservParamGrid} key="destinationTF">
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
              <Grid item className={style.datepickerGrid}>
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
                <Grid item className={style.datepickerGrid}>
                  <h5 className={style.reservationParamText}>Return</h5>
                  <KeyboardDatePicker
                    value={state.return}
                    labelFunc={muiDateFormatter}
                    className={style.datepicker}
                    //@ts-ignore
                    minDate={addDays(state.departure.valueOf(), 1)}
                    format="dd MMM., yyyy"
                    onChange={(d) => setState({ ...state, return: d })}
                  />
                </Grid>
              )}
            </MuiPickersUtilsProvider>

            {passengersParams.map((passenger, i) => (
              <Grid item key={i} className={style.passengerParamGrid}>
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

            <Grid item className={style.reservParamGrid}>
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
                  {flightClasses.map((n, i) => (
                    <MenuItem key={i} value={n}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item style={{ margin: "auto 0px 0px auto" }}>
              <CustomButton
                label="Search"
                backgroundColor={Colors.GREEN}
                style={{
                  width: "140px",
                  boxShadow: Shadow.DARK,
                  color: Colors.BLUE,
                }}
                onClick={() => {}}
              />
            </Grid>
          </ThemeProvider>
        </Grid>
      </div>

      <div className={style.pageContentContainer}>
        <Grid container className={style.pageContentContainerGrid}>
          <Grid item className={style.filtersGrid}>
            <SearchFilters />
          </Grid>

          <Grid item className={style.filterButtonGrid}>
            <CustomButton
              label="Filter"
              icon={faFilter}
              backgroundColor={Colors.PURPLE}
              style={{ paddingLeft: "10px", fontSize: "14px" }}
              onClick={() => setOpenDrawer(true)}
            />
          </Grid>

          <Grid item className={style.flightsGrid}>
            {flights.map((flight, i) => (
              <CardFlight key={i} flight={flight} />
            ))}
          </Grid>
        </Grid>
      </div>

      <Drawer
        open={openDrawer}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: style.drawer }}
      >
        <SearchFilters />
      </Drawer>
    </div>
  );
}
