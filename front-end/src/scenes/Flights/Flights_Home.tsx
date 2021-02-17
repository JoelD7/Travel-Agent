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
import React, { ChangeEvent, useEffect, useState } from "react";
import { Family } from "../../assets/fonts";
import {
  CardFlight,
  CardDealFlight,
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
  airportCityPlaceholder,
  capitalizeString,
  formatFlightDateTime,
  getFlightCitiesLabel,
  muiDateFormatter,
  Routes,
  selectAirportPredictions,
  selectCurrentCity,
  selectFlightFromAutocomplete,
  selectFlightParams,
  selectFlightToAutocomplete,
  getSavedAccessToken,
  updateAirportPredictions,
  iataCodes,
  selectFlightDictionaries,
} from "../../utils";
import { FlightTypes } from "../../utils/types";
import { FlightSearchParams } from "../../utils/types/FlightSearchParams";
import { flightStyles } from "./flights-styles";
import axios, { AxiosRequestConfig } from "axios";
import Helmet from "react-helmet";
import { useHistory } from "react-router-dom";
import {
  fetchAirportCitiesByInput,
  fetchGreatFlightDeals,
  fetchNewAccessToken,
  isAccessTokenUpdatable,
  startAirportCityPrediction,
  updateAccessToken,
} from "../../utils/external-apis/amadeus-apis";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { AirportCity } from "../../utils/types/location-types";
import {
  FlightSearch,
  setFlightFromAutocomplete,
  setFlightToAutocomplete,
  setFlightDictionaries,
} from "../../utils/store/flight-slice";
import {
  setFlightDeparture,
  setFlightReturn,
  setFlightFrom,
  setFlightTo,
  setFlightAdults,
  setFlightClass,
  setFlightChildren,
  setFlightInfants,
} from "../../utils/store/flight-slice";
import Axios from "axios";

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
  const maxDealsCount = 4;

  const [flights, setFlights] = useState<Flight[]>([
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
                iataCode: "SIN",
                city: "Singapore",
                at: "2021-02-02T07:15:00",
                terminal: "2",
              },
              arrival: {
                iataCode: "DXB",
                city: "Dubai",
                at: "2021-02-02T13:39:00",
                terminal: "31",
              },
              carrierCode: "Egyptair",
              duration: "PT6H15M",
            },
          ],
        },
        {
          duration: "PT8H25M",
          segments: [
            {
              departure: {
                iataCode: "DXB",
                city: "Dubai",
                at: "2021-02-12T09:15:00",
                terminal: "2",
              },
              arrival: {
                iataCode: "SIN",
                city: "Singapore",
                at: "2021-02-12T16:55:00",
                terminal: "31",
              },
              carrierCode: "Emirates",
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
                iataCode: "SIN",
                city: "Singapore",
                at: "2021-02-02T07:15:00",
                terminal: "2",
              },
              arrival: {
                iataCode: "DXB",
                city: "Dubai",
                at: "2021-02-02T13:39:00",
                terminal: "31",
              },
              carrierCode: "Egyptair",
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
                iataCode: "SIN",
                city: "Singapore",
                at: "2021-02-02T07:15:00",
                terminal: "2",
              },
              arrival: {
                iataCode: "DXB",
                city: "Dubai",
                at: "2021-02-02T13:39:00",
                terminal: "31",
              },
              carrierCode: "Egyptair",
              duration: "PT6H15M",
            },
          ],
        },
        {
          duration: "PT8H25M",
          segments: [
            {
              departure: {
                iataCode: "DXB",
                city: "Dubai",
                at: "2021-02-12T09:15:00",
                terminal: "2",
              },
              arrival: {
                iataCode: "SIN",
                city: "Singapore",
                at: "2021-02-12T16:55:00",
                terminal: "31",
              },
              carrierCode: "Emirates",
              duration: "PT8H25M",
            },
          ],
        },
      ],
    },
  ]);

  const [deals, setDeals] = useState<FlightDeal[]>([]);

  const dictionaries: FlightDictionary = useSelector(selectFlightDictionaries);
  const [currency, setCurrency] = useState<string>("");

  const currentCity: AirportCity = useSelector(selectCurrentCity);

  const airportPredictions: AirportCity[] = useSelector(selectAirportPredictions);

  const amadeusAccessToken = getSavedAccessToken();

  const [focusedAutocomplete, setFocusedAutocomplete] = useState<string>("");

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);

  useEffect(() => {
    if (focusedAutocomplete === "From") {
      startAirportCityPrediction(flight.from, getAirportPredictions);
    } else {
      startAirportCityPrediction(flight.to, getAirportPredictions);
    }
  }, [flight.from, flight.to]);

  useEffect(() => {
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

  return (
    <div className={style.mainContainer}>
      <Helmet>
        <title>Flights</title>
      </Helmet>

      <Navbar />

      {/* Top image container */}
      <Grid
        container
        className={style.topContainer}
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <Grid item xs={12}>
          <ServicesToolbar />
        </Grid>

        {/* Reservation Container */}
        <Grid container spacing={2} className={style.reservationContainer}>
          <Grid item xs={12}>
            <h2>{`Find the best flight to ${destination.name}`}</h2>
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

            <Autocomplete
              value={flightFromAutocomplete}
              onChange={(e, value) => dispatch(setFlightFromAutocomplete(value))}
              options={airportPredictions}
              loading={airportPredictions.length !== 0}
              getOptionLabel={(option) =>
                `${capitalizeString(`${option.name}`, "each word")}, ${option.iataCode}`
              }
              classes={{
                input: style.searchBarInput,
                listbox: style.autocompelteListbox,
                option: style.autocompleteOption,
              }}
              renderInput={(params) => (
                <CustomTF
                  className={style.searchBarInput}
                  onFocus={() => setFocusedAutocomplete("From")}
                  params={params}
                  value={flight.from}
                  outlineColor={Colors.BLUE}
                  onChange={(e) => dispatch(setFlightFrom(e.target.value))}
                  placeholder="City or airport"
                  startAdornment={
                    <FontAwesomeIcon icon={faMapMarkerAlt} color={Colors.BLUE} />
                  }
                />
              )}
            />
          </Grid>

          {/* To Grid */}
          {state.flightType === FlightTypes.ROUND && (
            <Grid item xs={12} key="destinationTF">
              <h5 className={style.reservationParamText}>To</h5>
              <Autocomplete
                value={flightToAutocomplete}
                onChange={(e, value) => dispatch(setFlightToAutocomplete(value))}
                options={airportPredictions}
                loading={airportPredictions.length !== 0}
                getOptionLabel={(option) =>
                  `${capitalizeString(`${option.name}`, "each word")}, ${option.iataCode}`
                }
                classes={{
                  input: style.searchBarInput,
                  listbox: style.autocompelteListbox,
                  option: style.autocompleteOption,
                }}
                renderInput={(params) => (
                  <CustomTF
                    className={style.searchBarInput}
                    params={params}
                    onFocus={() => setFocusedAutocomplete("To")}
                    value={flight.to}
                    outlineColor={Colors.BLUE}
                    onChange={(e) => dispatch(setFlightTo(e.target.value))}
                    placeholder="City or airport"
                    startAdornment={
                      <FontAwesomeIcon icon={faMapMarkerAlt} color={Colors.BLUE} />
                    }
                  />
                )}
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
              onClick={() => history.push(Routes.FLIGHT_LIST)}
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
