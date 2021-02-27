import DateFnsUtils from "@date-io/date-fns";
import {
  faBaby,
  faChild,
  faFilter,
  faStar,
  faUsers,
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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Axios from "axios";
import { addDays, compareDesc, format } from "date-fns";
import { compareAsc } from "date-fns/esm";
import React, { ChangeEvent, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Family } from "../../assets/fonts";
import {
  CardFlight,
  CustomButton,
  FlightTimesRange,
  IataAutocomplete,
  Navbar,
  Pagination,
  PriceRange,
  ProgressCircle,
  ServicesToolbar,
  SortPageSize,
  Text,
} from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  addFlightDuration,
  flightsPlaceholder,
  getAccessToken,
  getMaxDate,
  getMinDate,
  getSavedAccessToken,
  isDateBetweenRange,
  muiDateFormatter,
  selectFlightFromAutocomplete,
  selectFlightListURL,
  selectFlightParams,
  selectFlightToAutocomplete,
  startFlightFetching,
} from "../../utils";
import {
  FlightSearch,
  setFlightAdults,
  setFlightChildren,
  setFlightClass,
  setFlightDeparture,
  setFlightDictionaries,
  setFlightInfants,
  setFlightReturn,
} from "../../utils/store/flight-slice";
import { FlightTypes } from "../../utils/types";
import { FlightSearchParams } from "../../utils/types/FlightSearchParams";
import { flightListStyles } from "./flight-list-styles";

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
    flightType: "Round trip",
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

  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [maxPrice, setMaxPrice] = useState<number>(500);

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
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const flightListURL: string = useSelector(selectFlightListURL);

  const flightFromAutocomplete = useSelector(selectFlightFromAutocomplete);
  const flightToAutocomplete = useSelector(selectFlightToAutocomplete);

  const sortOptions: string[] = [
    "Price | desc",
    "Price | asc",
    "Duration | desc",
    "Duration | asc",
    "Earliest outbound departure",
    "Earliest outbound arrival",
    "Earliest return departure",
    "Earliest return arrival",
    "Latest outbound departure",
    "Latest outbound arrival",
    "Latest return departure",
    "Latest return arrival",
  ];
  const [sortOption, setSortOption] = useState<string>("Price");

  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const pageSizeOptions = [20, 30, 40];

  const flightClasses: FlightClassType[] = [
    "Business",
    "Economy",
    "First",
    "Premium Economy",
  ];

  useEffect(() => {
    startFlightFetching(flightListURL, fetchFlights);
  }, []);

  useEffect(() => {
    filterByDates(allFlights);
    setLoading(false);
  }, [
    allFlights,
    state.exitFlightDates?.departureDatetimeRange,
    state.exitFlightDates?.arrivalDatetimeRange,
    state.returnFlightDates?.departureDatetimeRange,
    state.returnFlightDates?.arrivalDatetimeRange,
  ]);

  function getPageCount() {
    return Math.ceil(flights.length / pageSize);
  }

  function sortFlightsBy(value: string) {
    let sortedFlights: Flight[] = [];
    let unsortedFlights: Flight[] = isAnyFilterApplied() ? flights : allFlights;
    console.log(`isAnyFilterApplied(): ${isAnyFilterApplied()}`);

    switch (value) {
      case "Price | desc":
        sortedFlights = unsortedFlights.sort((a, b) => b.price.total - a.price.total);
        break;
      case "Price | asc":
        sortedFlights = unsortedFlights.sort((a, b) => a.price.total - b.price.total);
        break;
      case "Duration | desc":
        sortedFlights = unsortedFlights.sort((a, b) => {
          return addFlightDuration(b) - addFlightDuration(a);
        });
        break;
      case "Duration | asc":
        sortedFlights = unsortedFlights.sort((a, b) => {
          return addFlightDuration(a) - addFlightDuration(b);
        });
        break;
      case "Earliest outbound departure":
        sortedFlights = unsortedFlights.sort((a, b) => {
          let one = new Date(a.itineraries[0].segments[0].departure.at);
          let two = new Date(b.itineraries[0].segments[0].departure.at);

          return compareAsc(one, two);
        });
        break;

      case "Earliest outbound arrival":
        sortedFlights = unsortedFlights.sort((a, b) => {
          let lastSegmentA = a.itineraries[0].segments.length - 1;
          let lastSegmentB = b.itineraries[0].segments.length - 1;

          let one = new Date(a.itineraries[0].segments[lastSegmentA].arrival.at);
          let two = new Date(b.itineraries[0].segments[lastSegmentB].arrival.at);

          return compareAsc(one, two);
        });
        break;
      case "Earliest return departure":
        sortedFlights = unsortedFlights.sort((a, b) => {
          let one = new Date(a.itineraries[1].segments[0].departure.at);
          let two = new Date(b.itineraries[1].segments[0].departure.at);

          return compareAsc(one, two);
        });
        break;
      case "Earliest return arrival":
        sortedFlights = unsortedFlights.sort((a, b) => {
          let lastSegmentA = a.itineraries[1].segments.length - 1;
          let lastSegmentB = b.itineraries[1].segments.length - 1;

          let one = new Date(a.itineraries[1].segments[lastSegmentA].arrival.at);
          let two = new Date(b.itineraries[1].segments[lastSegmentB].arrival.at);

          return compareAsc(one, two);
        });
        break;
      //========================================
      case "Latest outbound departure":
        sortedFlights = unsortedFlights.sort((a, b) => {
          let one = new Date(a.itineraries[0].segments[0].departure.at);
          let two = new Date(b.itineraries[0].segments[0].departure.at);

          return compareDesc(one, two);
        });
        break;

      case "Latest outbound arrival":
        sortedFlights = unsortedFlights.sort((a, b) => {
          let lastSegmentA = a.itineraries[0].segments.length - 1;
          let lastSegmentB = b.itineraries[0].segments.length - 1;

          let one = new Date(a.itineraries[0].segments[lastSegmentA].arrival.at);
          let two = new Date(b.itineraries[0].segments[lastSegmentB].arrival.at);

          return compareDesc(one, two);
        });
        break;
      case "Latest return departure":
        sortedFlights = unsortedFlights.sort((a, b) => {
          let one = new Date(a.itineraries[1].segments[0].departure.at);
          let two = new Date(b.itineraries[1].segments[0].departure.at);

          return compareDesc(one, two);
        });
        break;
      case "Latest return arrival":
        sortedFlights = unsortedFlights.sort((a, b) => {
          let lastSegmentA = a.itineraries[1].segments.length - 1;
          let lastSegmentB = b.itineraries[1].segments.length - 1;

          let one = new Date(a.itineraries[1].segments[lastSegmentA].arrival.at);
          let two = new Date(b.itineraries[1].segments[lastSegmentB].arrival.at);

          return compareDesc(one, two);
        });
        break;
    }

    setFlights(sortedFlights);
  }

  function isAnyFilterApplied() {
    return (
      priceRange[0] > 0 ||
      state.exitFlightDates.departureDatetimeRange[0] !=
        state.exitFlightDates.minDeparture ||
      state.exitFlightDates.departureDatetimeRange[1] !=
        state.exitFlightDates.maxDeparture ||
      state.exitFlightDates.arrivalDatetimeRange[0] != state.exitFlightDates.minArrival ||
      state.exitFlightDates.arrivalDatetimeRange[1] != state.exitFlightDates.maxArrival ||
      state.returnFlightDates.departureDatetimeRange[0] !=
        state.returnFlightDates.minDeparture ||
      state.returnFlightDates.departureDatetimeRange[1] !=
        state.returnFlightDates.maxDeparture ||
      state.returnFlightDates.arrivalDatetimeRange[0] !=
        state.returnFlightDates.minArrival ||
      state.returnFlightDates.arrivalDatetimeRange[1] !=
        state.returnFlightDates.maxArrival
    );
  }

  function filterByDates(flights: Flight[]) {
    let filteredFlights: Flight[] = flights.filter((flight) => {
      let lastSegmentIndexOut: number = flight.itineraries[0].segments.length - 1;
      let lastSegmentIndexReturn: number = flight.itineraries[1].segments.length - 1;

      let outDeparture: Date = new Date(flight.itineraries[0].segments[0].departure.at);
      let outArrival: Date = new Date(
        flight.itineraries[0].segments[lastSegmentIndexOut].arrival.at
      );

      let returnDeparture: Date = new Date(
        flight.itineraries[1].segments[0].departure.at
      );
      let returnArrival: Date = new Date(
        flight.itineraries[1].segments[lastSegmentIndexReturn].arrival.at
      );

      return (
        isDateBetweenRange(outDeparture, state.exitFlightDates.departureDatetimeRange) &&
        isDateBetweenRange(outArrival, state.exitFlightDates.arrivalDatetimeRange) &&
        isDateBetweenRange(
          returnDeparture,
          state.returnFlightDates.departureDatetimeRange
        ) &&
        isDateBetweenRange(returnArrival, state.returnFlightDates.arrivalDatetimeRange)
      );
    });

    setFlights(filteredFlights);
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
  function filterSimilarFlights(flights: Flight[]) {
    let buffer: Flight[] = [];
    let count = 0;
    let curPrice = "0";
    let prices: number[] = [];

    flights.forEach((flight) => {
      prices.push(flight.price.total);

      let flightPrice = String(flight.price.total);

      if (count === 2 && flightPrice !== curPrice) {
        curPrice = flightPrice;
        buffer.push(flight);
        count = 0;
        count++;
      } else if (flightPrice === curPrice && count < 2) {
        buffer.push(flight);
        count++;
      } else if (count < 2) {
        curPrice = flightPrice;
        buffer.push(flight);
        count++;
      }
    });

    prices.sort((a, b) => a - b);
    setPriceRange([0, Math.floor(prices[prices.length - 1])]);
    setMaxPrice(Math.floor(prices[prices.length - 1]));

    getDatimeSliderValues(buffer);
    setFlights(buffer);
    setAllFlights(buffer);
  }

  function getDatimeSliderValues(flights: Flight[]) {
    let outDepartureDatetimes: Date[] = [];
    let minOutDepartureDatetime: Date;
    let maxOutDepartureDatetime: Date;

    let outArrivalDatetimes: Date[] = [];
    let minOutArrivalDatetime: Date;
    let maxOutArrivalDatetime: Date;

    let returnDepartureDatetimes: Date[] = [];
    let minReturnDepartureDatetime: Date;
    let maxReturnDepartureDatetime: Date;

    let returnArrivalDatetimes: Date[] = [];
    let minReturnArrivalDatetime: Date;
    let maxReturnArrivalDatetime: Date;

    flights.forEach((flight) => {
      //#region Outgoing flight
      let lastSegmentIndex: number = flight.itineraries[0].segments.length - 1;

      outDepartureDatetimes.push(
        new Date(flight.itineraries[0].segments[0].departure.at)
      );
      outArrivalDatetimes.push(
        new Date(flight.itineraries[0].segments[lastSegmentIndex].arrival.at)
      );
      //#endregion
      let lastSegmentIndexReturn: number = flight.itineraries[1].segments.length - 1;
      returnDepartureDatetimes.push(
        new Date(flight.itineraries[1].segments[0].departure.at)
      );
      returnArrivalDatetimes.push(
        new Date(flight.itineraries[1].segments[lastSegmentIndexReturn].arrival.at)
      );
    });

    //Outgoing
    minOutDepartureDatetime = outDepartureDatetimes.reduce((prev, cur) =>
      getMinDate(prev, cur)
    );
    maxOutDepartureDatetime = outDepartureDatetimes.reduce((prev, cur) =>
      getMaxDate(prev, cur)
    );

    minOutArrivalDatetime = outArrivalDatetimes.reduce((prev, cur) =>
      getMinDate(prev, cur)
    );
    maxOutArrivalDatetime = outArrivalDatetimes.reduce((prev, cur) =>
      getMaxDate(prev, cur)
    );

    //Return
    minReturnDepartureDatetime = returnDepartureDatetimes.reduce((prev, cur) =>
      getMinDate(prev, cur)
    );
    maxReturnDepartureDatetime = returnDepartureDatetimes.reduce((prev, cur) =>
      getMaxDate(prev, cur)
    );

    minReturnArrivalDatetime = returnArrivalDatetimes.reduce((prev, cur) =>
      getMinDate(prev, cur)
    );
    maxReturnArrivalDatetime = returnArrivalDatetimes.reduce((prev, cur) =>
      getMaxDate(prev, cur)
    );

    setState({
      ...state,
      exitFlightDates: {
        minDeparture: minOutDepartureDatetime,
        maxDeparture: maxOutDepartureDatetime,
        departureDatetimeRange: [minOutDepartureDatetime, maxOutDepartureDatetime],

        minArrival: minOutArrivalDatetime,
        maxArrival: maxOutArrivalDatetime,
        arrivalDatetimeRange: [minOutArrivalDatetime, maxOutArrivalDatetime],
      },
      returnFlightDates: {
        minDeparture: minReturnDepartureDatetime,
        maxDeparture: maxReturnDepartureDatetime,
        departureDatetimeRange: [minReturnDepartureDatetime, maxReturnDepartureDatetime],

        minArrival: minReturnArrivalDatetime,
        maxArrival: maxReturnArrivalDatetime,
        arrivalDatetimeRange: [minReturnArrivalDatetime, maxReturnArrivalDatetime],
      },
    });
  }

  function onDateRangeChanged(
    arr: number[],
    flightDateRangeField: "exitFlightDates" | "returnFlightDates",
    destinationDateRangeField: "departureDatetimeRange" | "arrivalDatetimeRange"
  ) {
    let curFlightTypeRange: DatetimeRange | undefined = state[flightDateRangeField];

    if (curFlightTypeRange) {
      setPage(0);

      setState({
        ...state,
        [flightDateRangeField]: {
          ...curFlightTypeRange,
          [destinationDateRangeField]: [new Date(arr[0]), new Date(arr[1])],
        },
      });
    }
  }

  function onPriceSliderChange(slider: number[]) {
    setPriceRange(slider);
    let filteredFlights: Flight[] = allFlights.filter((flight) =>
      isNumberInRange(flight.price.total, slider)
    );
    setPage(0);
    setFlights(filteredFlights);
  }

  function isNumberInRange(value: number, range: number[]) {
    return value >= range[0] && value <= range[1];
  }

  function SearchFilters() {
    return (
      <>
        <Text
          style={{ color: openDrawer ? "white" : Colors.BLUE }}
          weight="bold"
          component="h3"
        >
          Search filters
        </Text>
        <Text
          style={{ color: openDrawer ? "white" : Colors.BLUE }}
          weight="bold"
          component="h4"
        >
          Price range
        </Text>
        <PriceRange
          value={priceRange}
          max={maxPrice}
          updateState={(slider) => onPriceSliderChange(slider)}
        />

        <Divider style={{ margin: "10px auto" }} />

        <div key="flight times">
          <Text style={{ color: Colors.BLUE }} weight="bold" component="h4">
            Outgoing flight
          </Text>

          <FlightTimesRange
            city={flightFromAutocomplete ? flightFromAutocomplete?.code : ""}
            label="Take-off"
            max={state.exitFlightDates?.maxDeparture}
            min={state.exitFlightDates?.minDeparture}
            destinationDateRangeField="departureDatetimeRange"
            flightDateRangeField="exitFlightDates"
            destinationDateRangeValue={state.exitFlightDates?.departureDatetimeRange}
            onDateRangeChanged={onDateRangeChanged}
          />

          {flightToAutocomplete && (
            <FlightTimesRange
              city={flightToAutocomplete.code}
              label="Landing"
              max={state.exitFlightDates?.maxArrival}
              min={state.exitFlightDates?.minArrival}
              destinationDateRangeField="arrivalDatetimeRange"
              flightDateRangeField="exitFlightDates"
              destinationDateRangeValue={state.exitFlightDates?.arrivalDatetimeRange}
              onDateRangeChanged={onDateRangeChanged}
            />
          )}

          <Text
            style={{ color: Colors.BLUE, marginTop: "20px" }}
            weight="bold"
            component="h4"
          >
            Return flight
          </Text>
          {flightToAutocomplete && (
            <FlightTimesRange
              city={flightToAutocomplete.code}
              label="Take-off"
              max={state.returnFlightDates?.maxDeparture}
              min={state.returnFlightDates?.minDeparture}
              destinationDateRangeField="departureDatetimeRange"
              flightDateRangeField="returnFlightDates"
              destinationDateRangeValue={state.returnFlightDates?.departureDatetimeRange}
              onDateRangeChanged={onDateRangeChanged}
            />
          )}

          <FlightTimesRange
            city={flightFromAutocomplete ? flightFromAutocomplete?.code : ""}
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

  function onSortOptionChange(option: string) {
    setSortOption(option);
    sortFlightsBy(option);
    setPage(0);
  }

  function onPageSizeChange(value: number) {
    setPageSize(value);
    setPage(0);
  }

  function onPageChange(newPage: number) {
    window.scrollTo(0, 0);
    setTimeout(() => setPage(newPage - 1), 250);
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
                      value={flight[passenger.variable]}
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
                    value={flight.class}
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

          <Grid item className={style.flightsGrid}>
            <Grid container>
              <Grid item xs={12} style={{ marginBottom: "30px" }}>
                <SortPageSize
                  pageSize={pageSize}
                  pageSizeOptions={pageSizeOptions}
                  sortOption={sortOption}
                  sortOptions={sortOptions}
                  onPageSizeChange={(value) => onPageSizeChange(value)}
                  onSortOptionChange={(e) => onSortOptionChange(e.target.value as string)}
                />
              </Grid>

              {isLoadingEnabled() && (
                <Grid
                  item
                  style={{ width: "100%" }}
                  className={` ${
                    loading ? style.progressCircleGridLoading : style.progressCircleGrid
                  }`}
                >
                  <ProgressCircle />
                </Grid>
              )}

              {!loadingOnMount && (
                <Grid item xs={12} style={loading ? { filter: "blur(4px)" } : {}}>
                  {flights
                    .slice(page * pageSize, page * pageSize + pageSize)
                    .map((flight, i) => (
                      <CardFlight variant="regular" key={i} flight={flight} />
                    ))}
                </Grid>
              )}

              <Grid item xs={12}>
                <Pagination
                  page={page}
                  className={style.pagination}
                  pageCount={getPageCount()}
                  onChange={(e, pageNo) => onPageChange(pageNo)}
                />
              </Grid>
            </Grid>
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
