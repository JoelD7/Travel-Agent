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
  Backdrop,
  createMuiTheme,
  Divider,
  Drawer,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  ThemeProvider,
} from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays, parseISO, isBefore, format } from "date-fns";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Family } from "../../assets/fonts";
import {
  CardFlight,
  CustomButton,
  DatetimeRange,
  FlightTimesRange,
  IataAutocomplete,
  Navbar,
  PriceRange,
  ServicesToolbar,
  Text,
} from "../../components";
import { CustomTF, ProgressCircle } from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  flightsPlaceholder,
  getPlaceAutocompleteURL,
  muiDateFormatter,
  getSavedAccessToken,
  getAccessToken,
  proxyUrl,
  selectFlightListURL,
  startFlightFetching,
  selectFlightDictionaries,
  selectFlightToAutocomplete,
  selectFlightFromAutocomplete,
  selectAirportPredictions,
  capitalizeString,
  startAirportCityPrediction,
  fetchAirportCitiesByInput,
  updateAirportPredictions,
  selectFlightParams,
  iataCodes,
} from "../../utils";
import { FlightTypes } from "../../utils/types";
import { FlightSearchParams } from "../../utils/types/FlightSearchParams";
import { flightListStyles } from "./flight-list-styles";
import { FlightDetails } from "./FlightDetails";
import Helmet from "react-helmet";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  FlightSearch,
  setFlightAdults,
  setFlightChildren,
  setFlightClass,
  setFlightDeparture,
  setFlightDictionaries,
  setFlightFrom,
  setFlightFromAutocomplete,
  setFlightInfants,
  setFlightReturn,
  setFlightTo,
  setFlightToAutocomplete,
} from "../../utils/store/flight-slice";
import { Autocomplete } from "@material-ui/lab";
import { AirportCity, IATALocation } from "../../utils/types/location-types";
import { CSSProperties } from "@material-ui/styles";

export function Flight_List() {
  const style = flightListStyles();

  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Family,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
          },
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
          borderRadius: "4px",
          backgroundColor: "white",

          "&:hover": {
            borderColor: Colors.GREEN_HOVER,
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

  const flight: FlightSearch = useSelector(selectFlightParams);

  const [state, setState] = useState<FlightSearchParams>({
    // adults: "",
    // children: "",
    // class: "Economy",
    // departure: new Date(),
    // return: addDays(new Date(), 2),
    // from: "",
    // to: "",
    flightType: "Round trip",
    // infants: "",
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
      arrivalDatetimeRange: [new Date(2020, 10, 10, 17, 0), new Date(2020, 10, 11, 5, 0)],
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
      arrivalDatetimeRange: [new Date(2020, 10, 21, 8, 0), new Date(2020, 10, 21, 15, 0)],
    },
  });

  const airportPredictions: IATALocation[] = useSelector(selectAirportPredictions);
  // const [airportPredictions, setAirportPredictions] = useState<IATALocation[]>([]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [loadingOnMount, setLoadingOnMount] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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

  const [flights, setFlights] = useState<Flight[]>(flightsPlaceholder);
  const flightListURL: string = useSelector(selectFlightListURL);

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);

  const [focusedAutocomplete, setFocusedAutocomplete] = useState<string>("");

  const flightClasses: FlightClassType[] = [
    "Business",
    "Economy",
    "First",
    "Premium Economy",
  ];

  useEffect(() => {
    startFlightFetching(flightListURL, fetchFlights);
  }, []);

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

  function fetchFlights(flightListURL: string) {
    let accessToken = getSavedAccessToken();

    Axios.get(flightListURL, {
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
      },
    })
      .then((res) => {
        dispatch(setFlightDictionaries(res.data.dictionaries));
        filterSimilarFlights(res.data.data);
        setLoadingOnMount(false);
      })
      .catch((error) => console.log(error));
  }

  /**
   * Similar flights have the exact same price. The only
   * things that varies a little is the schedule.
   *
   * By using the price, this function filters out
   * flights that have similar characteristics in order
   * to give the user a non-repetitive variety of flights.
   * @param flights
   */
  function filterSimilarFlights(flights: any[]) {
    let buffer: any[] = [];
    let count = 0;
    let curPrice = "0";

    flights.forEach((flight) => {
      if (count === 2 && flight.price.total !== curPrice) {
        curPrice = flight.price.total;
        buffer.push(flight);
        count = 0;
        count++;
      } else if (flight.price.total === curPrice && count < 2) {
        buffer.push(flight);
        count++;
      } else if (count < 2) {
        curPrice = flight.price.total;
        buffer.push(flight);
        count++;
      }
    });

    setFlights(buffer);
  }

  function onDateRangeChanged(
    arr: number[],
    flightDateRangeField: "exitFlightDates" | "returnFlightDates",
    destinationDateRangeField: "departureDatetimeRange" | "arrivalDatetimeRange"
  ) {
    let curFlightTypeRange: DatetimeRange | undefined = state[flightDateRangeField];

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
        <Text style={{ color: Colors.BLUE }} weight="bold" component="h3">
          Search filters
        </Text>
        <Text style={{ color: Colors.BLUE }} weight="bold" component="h4">
          Price range
        </Text>
        <PriceRange
          value={state.priceRange ? state.priceRange : [0, 100]}
          max={500}
          updateState={(slider) => setState({ ...state, priceRange: slider })}
        />

        <Divider style={{ margin: "10px auto" }} />

        <div key="flight times">
          <Text style={{ color: Colors.BLUE }} weight="bold" component="h4">
            Flight times
          </Text>

          <FlightTimesRange
            city={flight.from}
            label="Take-off"
            max={state.exitFlightDates?.maxDeparture}
            min={state.exitFlightDates?.minDeparture}
            destinationDateRangeField="departureDatetimeRange"
            flightDateRangeField="exitFlightDates"
            destinationDateRangeValue={state.exitFlightDates?.departureDatetimeRange}
            onDateRangeChanged={onDateRangeChanged}
          />

          <FlightTimesRange
            city={flight.to}
            label="Landing"
            max={state.exitFlightDates?.maxArrival}
            min={state.exitFlightDates?.minArrival}
            destinationDateRangeField="arrivalDatetimeRange"
            flightDateRangeField="exitFlightDates"
            destinationDateRangeValue={state.exitFlightDates?.arrivalDatetimeRange}
            onDateRangeChanged={onDateRangeChanged}
          />

          <FlightTimesRange
            city={flight.to}
            label="Take-off"
            max={state.returnFlightDates?.maxDeparture}
            min={state.returnFlightDates?.minDeparture}
            destinationDateRangeField="departureDatetimeRange"
            flightDateRangeField="returnFlightDates"
            destinationDateRangeValue={state.returnFlightDates?.departureDatetimeRange}
            onDateRangeChanged={onDateRangeChanged}
          />

          <FlightTimesRange
            city={flight.from}
            label="Landing"
            max={state.returnFlightDates?.maxArrival}
            min={state.returnFlightDates?.minArrival}
            destinationDateRangeField="arrivalDatetimeRange"
            flightDateRangeField="returnFlightDates"
            destinationDateRangeValue={state.returnFlightDates?.arrivalDatetimeRange}
            onDateRangeChanged={onDateRangeChanged}
          />
        </div>
      </>
    );
  }

  function onSearchFlightsClick() {
    setLoading(true);
    getAccessToken()
      .then((res) => {
        let accessToken = res;
        Axios.get(`https://test.api.amadeus.com/v2/shopping/flight-offers`, {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
          },
          params: {
            originLocationCode: flightFromAutocomplete?.code,
            destinationLocationCode: flightToAutocomplete?.code,
            departureDate: format(flight.departure, "yyyy-MM-dd"),
            returnDate: format(flight.return, "yyyy-MM-dd"),
            adults: flight.adults,
            children: flight.children,
            infants: flight.infants,
          },
        })
          .then((res) => {
            dispatch(setFlightDictionaries(res.data.dictionaries));
            filterSimilarFlights(res.data.data);
            setLoading(false);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

  function onPassengerParamsChange(
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    param: string
  ) {
    if (param === "adults") {
      dispatch(setFlightAdults(e.target.value as string));
    } else if (param === "children") {
      dispatch(setFlightChildren(e.target.value as string));
    } else {
      dispatch(setFlightInfants(e.target.value as string));
    }
  }

  function isLoadingEnabled() {
    return loadingOnMount || loading;
  }

  function getLoadingCircleStyle() {
    let style: CSSProperties = loading
      ? { display: "flex", position: "absolute", top: "100px", left: "47px" }
      : { display: "flex" };

    return style;
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Flights to Dubai</title>
      </Helmet>

      <Navbar />

      {/* Page title box */}
      <Grid container className={style.pageTitleContainerPic}>
        {/* Services toolbar and title */}
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <ServicesToolbar style={{ boxShadow: Shadow.MEDIUM }} />
            </Grid>

            <Grid item xs={10} style={{ margin: "0px auto" }}>
              <Text component="hm" bold color="white">
                Flights to Dubai
              </Text>
            </Grid>
          </Grid>
        </Grid>

        {/* Reservation params */}
        <Grid item xs={12}>
          <Grid container spacing={4} className={style.resevationParamsContainer}>
            {/* From */}
            <Grid id="destinationTF" item className={style.reservParamGrid}>
              <h5 className={style.reservationParamText}>From</h5>
              <IataAutocomplete type="airport" flightDirection="from" />
            </Grid>

            {/* To */}
            {state.flightType === FlightTypes.ROUND && (
              <Grid item className={style.reservParamGrid} id="destinationTF">
                <h5 className={style.reservationParamText}>To</h5>
                <IataAutocomplete type="airport" flightDirection="to" />
              </Grid>
            )}

            <ThemeProvider theme={theme}>
              {/* Departure and return dates */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item className={style.datepickerGrid}>
                  <h5 className={style.reservationParamText}>Departure</h5>
                  <KeyboardDatePicker
                    value={flight.departure}
                    labelFunc={muiDateFormatter}
                    className={style.datepicker}
                    minDate={new Date()}
                    format="dd MMM., yyyy"
                    onChange={(d) => dispatch(setFlightDeparture(d))}
                  />
                </Grid>

                {state.flightType === FlightTypes.ROUND && (
                  <Grid item className={style.datepickerGrid}>
                    <h5 className={style.reservationParamText}>Return</h5>
                    <KeyboardDatePicker
                      value={flight.return}
                      labelFunc={muiDateFormatter}
                      className={style.datepicker}
                      //@ts-ignore
                      minDate={addDays(flight.departure.valueOf(), 1)}
                      format="dd MMM., yyyy"
                      onChange={(d) => dispatch(setFlightReturn(d))}
                    />
                  </Grid>
                )}
              </MuiPickersUtilsProvider>

              {/* Passenger quantity selectors */}
              {passengersParams.map((passenger, i) => (
                <Grid item key={i} className={style.passengerParamGrid}>
                  <h5 className={style.reservationParamText}>{passenger.label}</h5>

                  <FormControl style={{ width: "100%" }} className={style.selectControl}>
                    <Select
                      value={state[passenger.variable]}
                      variant="outlined"
                      className={style.select}
                      startAdornment={
                        <FontAwesomeIcon icon={passenger.icon} color={Colors.BLUE} />
                      }
                      onChange={(e) => onPassengerParamsChange(e, passenger.variable)}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <MenuItem key={n} value={n}>
                          {n}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ))}

              {/* Class */}
              <Grid item className={style.classParamGrid}>
                <h5 className={style.reservationParamText}>Class</h5>

                <FormControl style={{ width: "100%" }} className={style.selectControl}>
                  <Select
                    value={state.class}
                    variant="outlined"
                    className={style.select}
                    startAdornment={<FontAwesomeIcon icon={faStar} color={Colors.BLUE} />}
                    onChange={(e) => dispatch(setFlightClass(e.target.value as string))}
                  >
                    {flightClasses.map((n, i) => (
                      <MenuItem key={i} value={n}>
                        {n}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Search button */}
              <Grid item style={{ margin: "auto 0px 0px auto" }}>
                <CustomButton
                  backgroundColor={Colors.GREEN}
                  style={{
                    width: "140px",
                    boxShadow: Shadow.DARK,
                    color: Colors.BLUE,
                  }}
                  onClick={() => onSearchFlightsClick()}
                >
                  Search
                </CustomButton>
              </Grid>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Grid>

      {/* Page content */}
      <div className={style.pageContentContainer}>
        <Grid container className={style.pageContentContainerGrid}>
          {/* Filters */}
          <Grid item className={style.filtersGrid}>
            <div className={style.filtersContainer}>
              <SearchFilters />
            </div>
          </Grid>

          <Grid item className={style.filterButtonGrid}>
            <CustomButton
              icon={faFilter}
              backgroundColor={Colors.PURPLE}
              style={{ paddingLeft: "10px", fontSize: "14px" }}
              onClick={() => setOpenDrawer(true)}
            >
              Filter
            </CustomButton>
          </Grid>

          {isLoadingEnabled() && (
            <Grid item className={style.flightsGrid} style={getLoadingCircleStyle()}>
              <ProgressCircle />
            </Grid>
          )}

          {!loadingOnMount && (
            <Grid
              item
              className={style.flightsGrid}
              style={loading ? { filter: "blur(4px)" } : {}}
            >
              {flights.map((flight, i) => (
                <CardFlight variant="regular" key={i} flight={flight} />
              ))}
            </Grid>
          )}
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
