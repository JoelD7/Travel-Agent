import DateFnsUtils from "@date-io/date-fns";
import { faBaby, faChild, faStar, faUsers } from "@fortawesome/free-solid-svg-icons";
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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { ChangeEvent, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Family } from "../../assets/fonts";
import {
  CardDealFlight,
  CustomButton,
  IataAutocomplete,
  Navbar,
  PageSubtitle,
  ServicesToolbar,
} from "../../components";
import { Colors } from "../../styles";
import {
  getSavedAccessToken,
  muiDateFormatter,
  Routes,
  selectAirportPredictions,
  selectCurrentCity,
  selectFlightDictionaries,
  selectFlightFromAutocomplete,
  selectFlightParams,
  setFlightListURL,
  selectFlightToAutocomplete,
  getRandomArbitrary,
  updateAirportPredictions,
  iataCodes,
  getCityImage,
  selectFlightListURL,
} from "../../utils";
import {
  fetchAirportCitiesByInput,
  fetchGreatFlightDeals,
} from "../../utils/external-apis/amadeus-apis";
import {
  FlightSearch,
  setFlightAdults,
  setFlightChildren,
  setFlightClass,
  setFlightDeparture,
  setFlightInfants,
  setFlightReturn,
  setFlightToAutocomplete,
} from "../../utils/store/flight-slice";
import { FlightTypes } from "../../utils/types";
import { FlightSearchParams } from "../../utils/types/FlightSearchParams";
import { IATALocation } from "../../utils/types/location-types";
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

  const destination = {
    image: "dubai.jpg",
    name: "Dubai",
  };

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
    flightType: "Round trip",
    priceRange: [0, 500],
  });
  const flight: FlightSearch = useSelector(selectFlightParams);

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
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);
  const flightListURL: string = useSelector(selectFlightListURL);

  const [deals, setDeals] = useState<FlightDeal[]>([]);

  const dictionaies: FlightDictionary = useSelector(selectFlightDictionaries);
  const [currency, setCurrency] = useState<string>("");

  const currentCity: IATALocation = useSelector(selectCurrentCity);

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    getCityImage(currentCity.city).then((res) => {
      setImage(String(res));
    });

    fetchGreatFlightDeals(currentCity, flight.departure)
      .then((res) => {
        setCurrency(res.data.meta.currency);
        let deals = res.data.data;
        setDeals(deals);
      })
      .catch((error) => console.log(error));
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

  function onFindFlightsClicked() {
    history.push(Routes.FLIGHT_LIST);

    // if (!flightToAutocomplete) {
    //   let r = getRandomArbitrary(0, iataCodes.length);

    //   console.log(`r: ${r} | iataCodes length: ${iataCodes.length}`);
    //   let randomCity: IATALocation = iataCodes[r];
    //   dispatch(setFlightToAutocomplete(randomCity));
    //   let newurl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MIA&destinationLocationCode=${randomCity.code}&departureDate=2021-02-25&returnDate=2021-02-27&adults=2`;
    //   dispatch(setFlightListURL(newurl));
    // }
  }

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>{`Flights to ${currentCity.city}`}</title>
      </Helmet>

      <Navbar />

      {/* Top image container */}
      <Grid
        container
        className={style.topContainer}
        style={{ backgroundImage: `url(${image})` }}
      >
        <Grid item xs={12}>
          <ServicesToolbar />
        </Grid>

        {/* Reservation Container */}
        <Grid container spacing={2} className={style.reservationContainer}>
          <Grid item xs={12}>
            <h2>{`Find the best flight to ${currentCity.city}`}</h2>
          </Grid>

          {/* Flight type toolbar */}
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

          {/* From grid */}
          <Grid item key="destinationTF" xs={12}>
            <h5 className={style.reservationParamText}>From</h5>

            <IataAutocomplete type="airport" flightDirection="from" />
          </Grid>

          {/* To Grid */}
          {state.flightType === FlightTypes.ROUND && (
            <Grid item xs={12} key="destinationTF">
              <h5 className={style.reservationParamText}>To</h5>
              <IataAutocomplete type="airport" flightDirection="to" />
            </Grid>
          )}

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
                  value={flight.departure}
                  labelFunc={muiDateFormatter}
                  className={style.datepicker}
                  minDate={new Date()}
                  format="dd MMM., yyyy"
                  onChange={(d) => dispatch(setFlightDeparture(d))}
                />
              </Grid>

              {state.flightType === FlightTypes.ROUND && (
                <Grid item className={style.largeGrid}>
                  <h5 className={style.reservationParamText}>Return</h5>
                  <KeyboardDatePicker
                    value={flight.return}
                    labelFunc={muiDateFormatter}
                    className={style.datepicker}
                    minDate={new Date()}
                    format="dd MMM., yyyy"
                    onChange={(d) => dispatch(setFlightReturn(d))}
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
                    value={flight[passenger.variable]}
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
                  value={flight.class}
                  variant="outlined"
                  className={style.select}
                  startAdornment={<FontAwesomeIcon icon={faStar} color={Colors.BLUE} />}
                  onChange={(e) => dispatch(setFlightClass(e.target.value as string))}
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
              onClick={() => onFindFlightsClicked()}
            >
              Find flights
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>

      <PageSubtitle label="Great deals" containerStyle={{ margin: "20px auto" }} />

      <Grid container spacing={2} className={style.dealsContainer}>
        {deals.slice(0, 6).map((deal) => (
          <CardDealFlight
            key={deal.links.flightOffers}
            currency={currency}
            deal={deal}
            animate
          />
        ))}
      </Grid>
    </div>
  );
}
