import DateFnsUtils from "@date-io/date-fns";
import { faClock, faPlaneDeparture, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createMuiTheme,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Popover,
  Select,
  Snackbar,
  ThemeProvider,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { addHours, compareAsc, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Font } from "../../../assets";
import { Colors } from "../../../styles";
import {
  backend,
  CarSearch,
  CarRsv,
  EventTypes,
  getFlightDTO,
  selectHotelReservationParams,
  getIataLocation,
  getLastSegment,
  HotelReservation,
  IATALocation,
  mapFlightToDomainType,
  muiDateFormatter,
  responseTripToDomainTrip,
  selectCarSearch,
  getHotelReservation,
  selectHotelRsv,
  selectUserTrips,
  setFlightDetail,
  Trip,
  Routes,
  selectCarRsv,
  HotelBookingParams,
} from "../../../utils";
import { setUserTrips } from "../../../utils/store/trip-slice";
import { IconText, Text } from "../../atoms";
import { includeInTripStyles } from "./includeInTripStyles";

interface IncludeInTripPopover {
  place: Restaurant | POI | Flight | CarRsv | HotelReservation;
  eventType: EventTypes.EventType;
  tripAnchor: HTMLButtonElement | null;
  openPopover: boolean;
  setOpenPopover: (value: React.SetStateAction<boolean>) => void;
  setTripAnchor: (value: React.SetStateAction<HTMLButtonElement | null>) => void;
}

export function IncludeInTripPopover({
  place,
  eventType,
  tripAnchor,
  openPopover,
  setOpenPopover,
  setTripAnchor,
}: IncludeInTripPopover) {
  const theme = createMuiTheme({
    overrides: {
      MuiMenuItem: {
        root: {
          fontFamily: Font.Family,
          border: "2px solid rgba(0,0,0,0)",

          "&:hover": {
            border: "2px solid rgba(0,0,0,0)",
          },
        },
      },
      MuiButton: {
        root: {
          fontFamily: Font.Family,
          textTransform: "capitalize",
        },
        textPrimary: {
          color: Colors.BLUE,
        },
      },
      MuiInputBase: {
        root: {
          fontFamily: Font.Family,
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
        h3: {
          fontFamily: Font.Family,
        },
        h4: {
          fontFamily: Font.Family,
        },
        subtitle1: {
          fontFamily: Font.Family,
        },
        body1: {
          fontFamily: Font.Family,
        },
        body2: {
          fontFamily: Font.Family,
        },
        caption: {
          fontFamily: Font.Family,
        },
      },
      MuiOutlinedInput: {
        root: {
          backgroundColor: "white",
          "&:hover": {
            borderColor: "#cecece",
          },
        },
      },
      MuiPickerDTTabs: {
        tabs: {
          backgroundColor: Colors.GREEN,
        },
      },
      PrivateTabIndicator: {
        colorSecondary: {
          backgroundColor: "white",
        },
      },
      MuiPickersClock: {
        pin: {
          backgroundColor: Colors.BLUE,
        },
      },
      MuiPickersClockPointer: {
        pointer: {
          backgroundColor: Colors.BLUE,
        },
        thumb: {
          border: `14px solid ${Colors.BLUE}`,
        },
        noPoint: {
          backgroundColor: Colors.BLUE,
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
      MuiInput: {
        underline: {
          "&:hover": {
            "&:not(.Mui-disabled)": {
              "&::before": {
                borderBottom: `2px solid ${Colors.GREEN}`,
              },
            },
          },
          "&::after": {
            borderBottom: `2px solid ${Colors.PURPLE}`,
          },
        },
      },
    },
  });

  const style = includeInTripStyles();

  const datetimePopoverParams = [
    {
      label: "Start",
      variable: "start",
    },
    {
      label: "End",
      variable: "end",
    },
  ];

  const [openErrorSnack, setOpenErrorSnack] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);

  const userTrips: Trip[] = useSelector(selectUserTrips);
  const hotelRsv: HotelReservation = useSelector(selectHotelRsv);
  const carRsv: CarRsv = useSelector(selectCarRsv);
  const carSearch: CarSearch = useSelector(selectCarSearch);
  const hotelReservationParams: HotelBookingParams = useSelector(
    selectHotelReservationParams
  );

  const tripOptions: string[] = userTrips.map((trip) => trip.name);
  const [tripOption, setTripOption] = useState<string>(tripOptions[0]);
  const [datetimePopover, setDatetimePopover] = useState<{ [index: string]: Date }>(
    getDates()
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userTrips.length === 0) {
      backend
        .get("/trip/all")
        .then((res: any) => {
          let tripsInResponse = res.data._embedded.tripList;
          let tripsBuffer = tripsInResponse.map((resTrip: any) =>
            responseTripToDomainTrip(resTrip)
          );

          dispatch(setUserTrips(tripsBuffer));
        })
        .catch((err: any) => console.log(err));
    }
  }, []);

  function getDates() {
    let start: Date = new Date();
    let end: Date = addHours(new Date(), 1);

    switch (eventType) {
      case EventTypes.FLIGHT:
        let flight: Flight = place as Flight;

        start = parseISO(flight.itineraries[0].segments[0].departure.at);
        end = parseISO(
          getLastSegment(flight.itineraries[flight.itineraries.length - 1]).arrival.at
        );
        break;

      case EventTypes.HOTEL:
        start = hotelReservationParams.stay.checkIn;
        end = hotelReservationParams.stay.checkOut;
        break;

      case EventTypes.CAR_RENTAL:
        start = parseISO(carRsv.pickupDate);
        end = parseISO(carRsv.dropoffDate);
        break;
    }

    return {
      start,
      end,
    };
  }

  function onPopoverClose() {
    setTripAnchor(null);
    setOpenPopover(false);
  }

  function onPopoverDateChange(date: MaterialUiPickersDate, variable: string) {
    if (date === null) {
      setDatetimePopover({
        ...datetimePopover,
        [variable]: new Date(),
      });
      return;
    }

    if (variable === "start" && isStartDateAfterEndDate(date)) {
      setOpenErrorSnack(true);
      setDatetimePopover({
        start: new Date(),
        end: addHours(new Date(), 1),
      });
      return;
    }

    setDatetimePopover({
      ...datetimePopover,
      [variable]: parseISO(date.toISOString()),
    });
  }

  function isStartDateAfterEndDate(start: MaterialUiPickersDate): boolean {
    let parsedDate: Date = start === null ? new Date() : parseISO(start.toISOString());
    return compareAsc(parsedDate, datetimePopover.end) !== -1;
  }

  function addToTrip() {
    let tripEventDTO = getTripEventDTO();
    let selectedTrip: Trip = userTrips.filter((trip) => trip.name === tripOption)[0];

    backend
      .post(`/trip-event/add-new?idTrip=${selectedTrip.idTrip}`, tripEventDTO)
      .then((res) => {
        let newEvent = res.data;
        updateUserTripsEvents(newEvent, selectedTrip);

        onPopoverClose();
        setOpenSuccessSnack(true);

        if (
          newEvent.type === EventTypes.HOTEL ||
          newEvent.type === EventTypes.CAR_RENTAL
        ) {
          setTimeout(() => {
            redirectToTripDetail(selectedTrip);
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  }

  function redirectToTripDetail(trip: Trip) {
    history.push(`${Routes.TRIPS}/${trip.idTrip}`);
  }

  /**
   * Adds the newly created event to the itinerary of the
   * trip selected by the user.
   * @param newEvent
   * @param selectedTrip
   */
  function updateUserTripsEvents(newEvent: any, selectedTrip: Trip) {
    let updatedUserTrips = userTrips.map((trip) => {
      if (trip.name === tripOption) {
        return {
          ...selectedTrip,
          itinerary: selectedTrip.itinerary ? [...selectedTrip.itinerary, newEvent] : [],
        };
      } else {
        return trip;
      }
    });

    if (newEvent.type === EventTypes.FLIGHT) {
      dispatch(setFlightDetail(mapFlightToDomainType(newEvent.flight)));
    }

    dispatch(setUserTrips(updatedUserTrips));
  }

  /**
   *
   * @returns A trip event DTO of the indicated event type.
   */
  function getTripEventDTO() {
    let tripEventDTO = {};

    switch (eventType) {
      case EventTypes.CAR_RENTAL:
        tripEventDTO = getCarRentalTripEventDTO();
        break;

      case EventTypes.FLIGHT:
        tripEventDTO = getFlightTripEventDTO();
        break;

      case EventTypes.HOTEL:
        tripEventDTO = getHotelTripEventDTO();
        break;

      case EventTypes.POI:
        break;

      case EventTypes.RESTAURANT:
        break;

      default:
        break;
    }

    return tripEventDTO;
  }

  /**
   *
   * @returns A trip event DTO of type Flight.
   */
  function getFlightTripEventDTO() {
    let flight: Flight = place as Flight;
    let destination: IATALocation | undefined = getIataLocation(
      getLastSegment(flight.itineraries[0]).arrival.iataCode
    );

    return {
      name: destination ? `Flight to ${destination.city}` : "Flight",
      location: destination ? `${destination.city}` : "",
      type: EventTypes.FLIGHT,
      start: datetimePopover.start.toISOString(),
      end: datetimePopover.end.toISOString(),
      flight: getFlightDTO(flight),
      includesTime: false,
    };
  }

  function getHotelTripEventDTO() {
    return {
      name: `Check in at hotel ${hotelRsv.name}`,
      location: hotelRsv.address,
      type: EventTypes.HOTEL,
      start: datetimePopover.start.toISOString(),
      end: datetimePopover.end.toISOString(),
      hotelReservation: hotelRsv,
      includesTime: false,
    };
  }

  function getCarRentalTripEventDTO() {
    return {
      name: `Car rental | ${carRsv.name}`,
      location: carRsv.location,
      type: EventTypes.CAR_RENTAL,
      start: datetimePopover.start.toISOString(),
      end: datetimePopover.end.toISOString(),
      carRental: carRsv,
      includesTime: true,
    };
  }

  return (
    <>
      <Popover
        open={openPopover}
        anchorEl={tripAnchor}
        onClose={() => onPopoverClose()}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{ paper: style.popoverPaper }}
      >
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              {/* Trip */}
              <Grid item className={style.labelGrid}>
                <Grid container>
                  <IconText icon={faPlaneDeparture}></IconText>
                  <Text component="h4" bold color={Colors.BLUE}>
                    Trip
                  </Text>
                </Grid>
              </Grid>

              <Grid item className={style.selectGrid}>
                <FormControl>
                  <Select
                    value={tripOption}
                    style={{ height: "30px", width: "276px" }}
                    classes={{ icon: style.selectIcon }}
                    variant="outlined"
                    className={style.select}
                    onChange={(e) => setTripOption(e.target.value as string)}
                  >
                    {tripOptions.map((option) => (
                      <MenuItem value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Datetimes */}
              {datetimePopoverParams.map((param) => (
                <Grid container key={param.label} style={{ marginTop: "10px" }}>
                  {/* label and icon */}
                  <Grid item className={style.labelGrid}>
                    <Grid container>
                      <IconText icon={faClock}></IconText>
                      <Text component="h4" bold color={Colors.BLUE}>
                        {param.label}
                      </Text>
                    </Grid>
                  </Grid>

                  {/* Select */}
                  <Grid item className={style.selectGrid}>
                    <KeyboardDateTimePicker
                      disabled
                      value={datetimePopover[param.variable]}
                      labelFunc={(date, invalidLabel) =>
                        muiDateFormatter(date, invalidLabel, "datetime")
                      }
                      className={style.datepicker}
                      minDate={new Date()}
                      format="EEE. d/MMM, yyyy 'at' h:mm"
                      onChange={(date) => onPopoverDateChange(date, param.variable)}
                    />
                  </Grid>
                </Grid>
              ))}

              {/* Add button */}
              <Grid container>
                <IconButton
                  onClick={() => addToTrip()}
                  style={{ margin: "10px 0px 0px auto", backgroundColor: Colors.GREEN }}
                >
                  <FontAwesomeIcon icon={faPlus} color="white" />
                </IconButton>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Popover>

      <Snackbar
        open={openErrorSnack}
        autoHideDuration={6000}
        onClose={() => setOpenErrorSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenErrorSnack(false)}
          severity="error"
        >
          The start date and time cannot be after the end date and time.
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSuccessSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSuccessSnack(false)}
          severity="success"
        >
          Added to trip.
        </Alert>
      </Snackbar>
    </>
  );
}
