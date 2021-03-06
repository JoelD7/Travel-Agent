import DateFnsUtils from "@date-io/date-fns";
import { faBaby, faChild, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  FormControl,
  Grid,
  Grow,
  MenuItem,
  Select,
  Snackbar,
  ThemeProvider,
  Toolbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addDays, parseISO } from "date-fns";
import React, { ChangeEvent, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { batchActions } from "redux-batched-actions";
import { Font } from "../../assets";
import { Family } from "../../assets/fonts";
import {
  CardDealFlight,
  CustomButton,
  Footer,
  IataAutocomplete,
  Navbar,
  NotAvailableCard,
  PageSubtitle,
  ProgressCircle,
  ServicesToolbar,
  Text,
} from "../../components";
import { Colors } from "../../styles";
import {
  fetchCityImage,
  getFlightSearchURL,
  getFlightClassForAPI,
  isCityImageUpdated,
  isDateAfterOrEqual,
  muiDateFormatter,
  selectCityImage,
  FlightClass,
  selectDestinationCity,
  selectFlightFromAutocomplete,
  selectFlightSearchParams,
  selectFlightToAutocomplete,
  getFlightClassLabel,
  selectFlightType,
  AutocompleteType,
  setCityImage,
  setFlightType,
  FlightSearch,
  setFlightAdults,
  setFlightChildren,
  setFlightClass,
  setFlightDeparture,
  setFlightInfants,
  setFlightReturn,
  CityImage,
  FlightTypes,
  fetchGreatFlightDeals,
  FlightSearchParams,
  IATALocation,
} from "../../utils";
import { flightStyles } from "./flights-styles";

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

  const history = useHistory();
  const dispatch = useDispatch();

  const [state, setState] = useState<FlightSearchParams>({
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
    flightType: useSelector(selectFlightType),
  });

  const flightSearch: FlightSearch = useSelector(selectFlightSearchParams);

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

  const classes: FlightClassType[] = ["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"];

  const [deals, setDeals] = useState<FlightDeal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const destinationCity: IATALocation = useSelector(selectDestinationCity);
  const cityImage: CityImage = useSelector(selectCityImage);

  const [openRequiredFieldSnack, setOpenRequiredFieldSnack] = useState(false);

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);

  useEffect(() => {
    if (!isCityImageUpdated(destinationCity, cityImage)) {
      getCityImage();
    }

    fetchGreatFlightDeals(destinationCity, flightSearch.departure)
      .then((res) => {
        let deals = res.data.data;
        setDeals(deals);
        setLoading(false);
      })
      .catch((error) => {
        if (invalidDestinationsError(error)) {
          setLoading(false);
        }
      });
  }, []);

  function getCityImage() {
    fetchCityImage(destinationCity.city).then((res) => {
      dispatch(setCityImage({ city: destinationCity.city, image: String(res) }));
    });
  }

  function invalidDestinationsError(error: any) {
    return error.response && error.response.status === 500;
  }

  function onPassengerParamsChange(
    e: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    param: string
  ) {
    if (param === "adults") {
      dispatch(setFlightAdults(e.target.value as number));
    } else if (param === "children") {
      dispatch(setFlightChildren(e.target.value as number));
    } else {
      dispatch(setFlightInfants(e.target.value as number));
    }
  }

  function onFindFlightsClicked() {
    if (flightFromAutocomplete === null || flightToAutocomplete === null) {
      setOpenRequiredFieldSnack(true);
      return;
    }
    history.push(getFlightSearchURL(flightSearch));
  }

  function onFlightTypeChange(flightType: string) {
    if (flightType === FlightTypes.ONE_WAY) {
      setState({ ...state, flightType: FlightTypes.ONE_WAY });
      dispatch(
        batchActions([setFlightType(FlightTypes.ONE_WAY), setFlightReturn(undefined)])
      );
    } else {
      dispatch(
        batchActions([
          setFlightType(FlightTypes.ROUND),
          setFlightReturn(addDays(flightSearch.departure, 1)),
        ])
      );
      setState({ ...state, flightType: FlightTypes.ROUND });
    }
  }

  function onDateChange(date: MaterialUiPickersDate, field: "departure" | "return") {
    switch (field) {
      case "departure":
        let newDate: Date = date === null ? new Date() : parseISO(date.toISOString());

        if (flightSearch.return && isDateAfterOrEqual(newDate, flightSearch.return)) {
          dispatch(setFlightReturn(addDays(newDate, 1)));
        }

        dispatch(setFlightDeparture(date));
        break;
      case "return":
        dispatch(setFlightReturn(date));
        break;
    }
  }

  function areNoDealsReturned(): boolean {
    return !loading && deals.length === 0;
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Flights to ${destinationCity.city}`}</title>
      </Helmet>

      <Navbar />

      {/* Top image container */}
      <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
        <Grid
          container
          className={style.topContainer}
          style={{
            backgroundImage: `url('/Travel-Agent/flights-home.jpg')`,
            backgroundPosition: "50%",
          }}
        >
          <Grid item xs={12}>
            <ServicesToolbar />
          </Grid>

          {/* Reservation Container */}
          <Grid container spacing={2} className={style.reservationContainer}>
            <Grid item xs={12}>
              <Text component="h3">{`Find the best flight to ${destinationCity.city}`}</Text>
            </Grid>

            {/* Flight type toolbar */}
            <Grid item xs={12} key="toolbar">
              <Toolbar classes={{ root: style.reservationOptionsToolbar }}>
                <MenuItem
                  selected={state.flightType === FlightTypes.ROUND}
                  classes={{ root: style.menuItemRoot }}
                  onClick={() => onFlightTypeChange(FlightTypes.ROUND)}
                >
                  Round-trip
                </MenuItem>

                <MenuItem
                  selected={state.flightType === FlightTypes.ONE_WAY}
                  classes={{ root: style.menuItemRoot }}
                  onClick={() => onFlightTypeChange(FlightTypes.ONE_WAY)}
                >
                  One way
                </MenuItem>
              </Toolbar>
            </Grid>

            {/* From grid */}
            <Grid item key="destinationTF" xs={12}>
              <h5 className={style.reservationParamText}>From</h5>

              <IataAutocomplete type={AutocompleteType.AIRPORT} flightDirection="from" />
            </Grid>

            {/* To Grid */}
            <Grid item xs={12} key="destinationTF">
              <h5 className={style.reservationParamText}>To</h5>
              <IataAutocomplete type={AutocompleteType.AIRPORT} flightDirection="to" />
            </Grid>

            {/* Dates */}
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
                    value={flightSearch.departure}
                    labelFunc={(date, invalidLabel) =>
                      muiDateFormatter(date, invalidLabel, "date")
                    }
                    className={style.datepicker}
                    minDate={new Date()}
                    format="dd MMM., yyyy"
                    onChange={(d) => onDateChange(d, "departure")}
                  />
                </Grid>

                {state.flightType === FlightTypes.ROUND && (
                  <Grid item className={style.largeGrid}>
                    <h5 className={style.reservationParamText}>Return</h5>
                    <KeyboardDatePicker
                      value={flightSearch.return}
                      labelFunc={(date, invalidLabel) =>
                        muiDateFormatter(date, invalidLabel, "date")
                      }
                      className={style.datepicker}
                      minDate={new Date()}
                      format="dd MMM., yyyy"
                      onChange={(d) => onDateChange(d, "return")}
                    />
                  </Grid>
                )}
              </MuiPickersUtilsProvider>
            </ThemeProvider>

            {/* Passengers */}
            <ThemeProvider theme={reservationParamsTheme}>
              {passengersParams.map((passenger, i) => (
                <Grid item key={i} className={style.passengerParamGrid}>
                  <h5 className={style.reservationParamText}>{passenger.label}</h5>

                  <FormControl style={{ width: "100%" }}>
                    <Select
                      value={flightSearch[passenger.variable]}
                      variant="outlined"
                      className={style.select}
                      startAdornment={
                        <FontAwesomeIcon icon={passenger.icon} color={Colors.BLUE} />
                      }
                      onChange={(e) => onPassengerParamsChange(e, passenger.variable)}
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
                    value={flightSearch.class}
                    variant="outlined"
                    className={style.select}
                    startAdornment={<FontAwesomeIcon icon={faStar} color={Colors.BLUE} />}
                    onChange={(e) =>
                      dispatch(setFlightClass(e.target.value as FlightClassType))
                    }
                  >
                    {Object.values(FlightClass).map((value, i) => (
                      <MenuItem key={i} value={value}>
                        {getFlightClassLabel(value)}
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
                style={{ width: "100%", fontSize: 14 }}
                onClick={() => onFindFlightsClicked()}
              >
                Find flights
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </Grow>

      <PageSubtitle label="Great deals" containerStyle={{ margin: "20px auto" }} />

      {/* Loading animation */}
      {loading && (
        <Grid container justify="center">
          <ProgressCircle />
        </Grid>
      )}

      {/* Deals */}
      <Grid container className={style.dealsContainer}>
        {deals.slice(0, 6).map((deal) => (
          <CardDealFlight key={deal.links.flightOffers} deal={deal} animate />
        ))}
      </Grid>

      {areNoDealsReturned() && (
        <Grow in={true} style={{ transformOrigin: "0 0 0" }} timeout={1000}>
          <Grid container className={style.dealsContainer}>
            <NotAvailableCard title="Sorry!">
              There are no deals available for these destinations.
            </NotAvailableCard>
          </Grid>
        </Grow>
      )}

      <Footer />

      <Snackbar
        open={openRequiredFieldSnack}
        autoHideDuration={6000}
        onClose={() => setOpenRequiredFieldSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenRequiredFieldSnack(false)}
          severity="error"
        >
          The required fields must be filled.
        </Alert>
      </Snackbar>
    </div>
  );
}
