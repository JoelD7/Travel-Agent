import {
  faChevronCircleRight,
  faCircle,
  faClock,
  faPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Backdrop,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  useMediaQuery,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { format } from "date-fns";
import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Font } from "../../assets";
import { CustomButton, IconTP, IncludeInTripPopover, Text } from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  backend,
  convertToUserCurrency,
  EventTypes,
  responseTripToDomainTrip,
  FlightSearch,
  formatAsCurrency,
  formatFlightDate,
  formatFlightSegmentTime,
  getFlightCitiesLabel,
  getFlightClass,
  getFlightDTO,
  setUserTrips,
  getFlightSegmentCarrier,
  getIataLocation,
  getLastSegment,
  parseFlightDuration,
  selectFlightDetail,
  selectFlightDictionaries,
  isFlightInTrip,
  selectFlightSearchParams,
  selectIdPerson,
  selectUserTrips,
  Trip,
  TripEvent,
  tripEventPlaceholder,
} from "../../utils";
import { flightDetailsStyles } from "./flightDetails-styles";

interface FlightDetails {
  open: boolean;
  onClose: () => void;
  bookedFlight?: boolean;
  isFlightInTrip?: boolean;
}

interface FlightCard {
  itinerary: number;
}

export function FlightDetails({
  isFlightInTrip: isFlightInTripProp,
  open,
  bookedFlight: bookedFlightProp,
  onClose,
}: FlightDetails) {
  const style = flightDetailsStyles();

  const flightSearch: FlightSearch = useSelector(selectFlightSearchParams);

  const flight: Flight = useSelector(selectFlightDetail);

  const passengers = getFlightPassengers();

  const dictionaries: FlightDictionary | undefined = useSelector(
    selectFlightDictionaries
  );

  const is730OrLess = useMediaQuery("(max-width:730px)");
  const is660OrLess = useMediaQuery("(max-width:660px)");

  const [openSnack, setOpenSnack] = useState(false);

  const [bookedFlight, setBookedFlight] = useState(bookedFlightProp);

  const idPerson: number = useSelector(selectIdPerson);

  const [tripAnchor, setTripAnchor] = useState<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState(false);

  const dispatch = useDispatch();

  const userTrips: Trip[] = useSelector(selectUserTrips);

  function getFlightPassengers() {
    let total: number = 0;
    total += flightSearch.adults;

    if (flightSearch.children) {
      total += flightSearch.children;
    }

    if (flightSearch.infants) {
      total += flightSearch.infants;
    }

    return total;
  }

  function FlightCard({ itinerary }: FlightCard) {
    function getCityFromIata(iata: string) {
      let iataLocation = getIataLocation(iata);
      return iataLocation ? iataLocation.city : " ";
    }

    const flightItinerary: FlightItinerary = flight.itineraries[itinerary];

    function isFirstSegment(segment: FlightSegment): boolean {
      return segment === flightItinerary.segments[0];
    }

    return (
      <Grid key="flight card" item xs={12} className={style.flightCard}>
        {/* Card title */}
        <Grid key="title" container alignItems="center" style={{ marginBottom: "6px" }}>
          <Grid item className={style.dateGrid}>
            <Grid container alignItems="center">
              <Text component="h3" style={{ marginBottom: "5px" }} color={Colors.BLUE}>
                {itinerary === 0 ? "Depart" : "Return"}
              </Text>

              <Text className={style.flightCardDate} style={{ fontSize: "14px" }}>
                {formatFlightDate(flight, "departure", itinerary)}
              </Text>
            </Grid>
          </Grid>

          <Grid item className={style.citiesGrid}>
            <p className={style.flightCardCities}>
              {`${getCityFromIata(flightItinerary.segments[0].departure.iataCode)} -` +
                ` ${getCityFromIata(getLastSegment(flightItinerary).arrival.iataCode)}`}
            </p>
          </Grid>
        </Grid>

        <Divider />

        {flightItinerary.segments.map((segment, i) => (
          <Grid key={i} container style={{ paddingTop: "20px" }}>
            {/* Airline and logo */}
            <Grid key="airline" item className={style.airlineLogoGrid}>
              <Grid container alignItems="center">
                <Grid item xs={12} style={{ display: "flex" }}>
                  <IconTP style={{ margin: "auto" }} icon={faPlane} size={22} />
                </Grid>

                <Grid item xs={12}>
                  {dictionaries && (
                    <Text style={{ textAlign: "center" }}>
                      {getFlightSegmentCarrier(segment)}
                    </Text>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* Departure time */}
            <Grid key="first time" item className={style.timeGrid}>
              <p className={style.firstTime}>
                {formatFlightSegmentTime(segment, "departure")}
              </p>
              <p className={style.firstIata}>
                {getCityFromIata(segment.departure.iataCode)}
              </p>
              <p className={style.firstIata}>{`(${segment.departure.iataCode})`}</p>
            </Grid>

            <Grid
              key="line"
              item
              className={style.dividerGrid}
              style={{ padding: "5px 10px" }}
            >
              <Divider className={style.timeDivider} />
            </Grid>

            {/* Arrival time */}
            <Grid key="second time" item className={style.timeGrid}>
              <p className={style.secondTime}>
                {formatFlightSegmentTime(segment, "arrival")}
              </p>
              <p className={style.secondIata}>
                {getCityFromIata(segment.arrival.iataCode)}
              </p>
              <p className={style.secondIata}>{`(${segment.arrival.iataCode})`}</p>
            </Grid>

            {/* Duration */}
            <Grid item className={style.durationGrid}>
              <p style={{ fontSize: "14px", textAlign: "end" }}>
                <b>Duration</b>
                {`: ${parseFlightDuration(segment.duration)}`}
              </p>
            </Grid>

            {/* Airline and logo xs */}
            <Grid key="airline" item className={style.airlineLogoGridXs}>
              <Grid container alignItems="center">
                <Grid item xs={12} style={{ display: "flex" }}>
                  <IconTP style={{ margin: "auto" }} icon={faPlane} size={22} />
                </Grid>

                <Grid item xs={12}>
                  {dictionaries && (
                    <Text style={{ textAlign: "center" }}>
                      {getFlightSegmentCarrier(segment)}
                    </Text>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {/* Duration sm*/}
            <Grid item className={style.durationGridSm}>
              <IconTP style={{ margin: "auto" }} icon={faClock} size={22} />
              <Text className={style.durationTextSm}>{`${parseFlightDuration(
                segment.duration
              )}`}</Text>
            </Grid>

            {/* Divider between segments */}
            {is730OrLess && isFirstSegment(segment) && (
              <Divider style={{ marginBottom: "10px", width: "100%" }} />
            )}
          </Grid>
        ))}
      </Grid>
    );
  }

  function bookFlight() {
    let flightDTO = getFlightDTO(flight);

    backend
      .post(`/flight?idPerson=${idPerson}`, flightDTO)
      .then((res) => {
        setOpenSnack(true);
        setBookedFlight(true);
      })
      .catch((err) => console.log(err));
  }

  function onIncludeTripClick(event: MouseEvent<HTMLButtonElement>) {
    setTripAnchor(event.currentTarget);
    setOpenPopover(true);
  }

  function isFlightIncludedInAnyTrip() {
    let included: boolean = false;

    userTrips.forEach((trip) => {
      if (isFlightInTrip(flight, trip)) {
        included = true;
        return;
      }
    });

    return included;
  }

  function deleteFlightFromTrip() {
    let tripEventOfFlight: TripEvent = getTripEventOfFlight();

    if (tripEventOfFlight.uuid) {
      backend
        .delete(`/trip-event/delete/${tripEventOfFlight.uuid}`)
        .then((res) => {
          //Trip without the deleted event in its itinerary.
          let updatedEventsTrip: Trip = responseTripToDomainTrip(res.data);

          let newUserTrips: Trip[] = [];

          userTrips.forEach((trip) => {
            if (trip.idTrip === updatedEventsTrip.idTrip) {
              newUserTrips.push(updatedEventsTrip);
            } else {
              newUserTrips.push(trip);
            }
          });

          dispatch(setUserTrips(newUserTrips));
        })
        .catch((err) => console.log(err));
    }
  }

  function getTripEventOfFlight(): TripEvent {
    let tripEventOfFlight: TripEvent = tripEventPlaceholder;

    userTrips.forEach((trip) => {
      if (trip.itinerary) {
        trip.itinerary
          .filter((event) => event.type === EventTypes.FLIGHT)
          .forEach((event) => {
            if (event.flight && event.flight.idFlight === flight.idFlight) {
              tripEventOfFlight = event;
              return;
            }
          });
      }
    });

    return tripEventOfFlight;
  }

  function getFlightDateRange() {
    let firstDate: Date = new Date(flight.itineraries[0].segments[0].departure.at);

    if (flight.itineraries.length > 1) {
      let lastDate: Date = new Date(getLastSegment(flight.itineraries[1]).arrival.at);

      return `${format(firstDate, "EEE, d/MMM")} - ${format(lastDate, "EEE, d/MMM")}`;
    }

    return format(firstDate, "EEE, d/MMM");
  }

  return (
    <Dialog
      open={open}
      BackdropComponent={Backdrop}
      classes={{ paper: style.paper }}
      BackdropProps={{
        timeout: 500,
        classes: { root: style.backdrop },
      }}
      onClose={onClose}
    >
      <Grid container className={style.mainContainer}>
        {/* Top title */}
        <Grid key="topTitle" item xs={12}>
          <Grid container alignItems="center" style={{ marginTop: "20px" }}>
            <Text component={is660OrLess ? "h3" : "h2"}>
              {getFlightCitiesLabel(flight, "departure")}
            </Text>

            <FontAwesomeIcon
              size="2x"
              style={{ margin: "auto 10px" }}
              color={Colors.PURPLE}
              icon={faChevronCircleRight}
            />
            <Text component={is660OrLess ? "h3" : "h2"}>
              {getFlightCitiesLabel(flight, "arrival")}
            </Text>

            <IconButton onClick={() => onClose()} className={style.closeButton}>
              <FontAwesomeIcon size="sm" color={Colors.BLUE} icon={faTimes} />
            </IconButton>
          </Grid>
        </Grid>

        {/* Dates, flight params */}
        <Grid key="subtitle" item xs={12}>
          <Grid container alignItems="center">
            <p className={style.subtitle}>{getFlightDateRange()}</p>

            <FontAwesomeIcon
              size="xs"
              style={{ margin: "4px 5px auto 5px", width: "6px" }}
              color={Colors.BLUE}
              icon={faCircle}
            />

            <p className={style.subtitle}>{`${
              flight.itineraries.length > 1 ? "Round trip" : "One-way"
            }`}</p>

            <FontAwesomeIcon
              size="xs"
              style={{ margin: "4px 5px auto 5px", width: "6px" }}
              color={Colors.BLUE}
              icon={faCircle}
            />

            <p className={style.subtitle}>{`${
              passengers > 1 ? `${passengers} travelers` : `1 traveler`
            }`}</p>

            <FontAwesomeIcon
              size="xs"
              style={{ margin: "4px 5px auto 5px", width: "6px" }}
              color={Colors.BLUE}
              icon={faCircle}
            />

            <p className={style.subtitle}>{getFlightClass(flight)}</p>
          </Grid>
        </Grid>

        {/* Include in trip */}
        {!isFlightIncludedInAnyTrip() && (
          <CustomButton
            style={{ boxShadow: Shadow.LIGHT, fontSize: 14 }}
            onClick={(e) => onIncludeTripClick(e)}
            backgroundColor={Colors.GREEN}
            rounded
          >
            Include in trip
          </CustomButton>
        )}

        {/* Delete from trip */}
        {isFlightIncludedInAnyTrip() && (
          <CustomButton
            rounded
            backgroundColor={Colors.RED}
            style={{ boxShadow: Shadow.LIGHT3D, fontSize: 14 }}
            onClick={() => deleteFlightFromTrip()}
          >
            Delete from trip
          </CustomButton>
        )}

        <FlightCard itinerary={0} />
        {flight.itineraries.length > 1 && <FlightCard itinerary={1} />}

        {/* Button */}
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Grid container justify="flex-end">
            <h2 style={{ fontSize: "20px", marginRight: "10px" }}>{`${formatAsCurrency(
              convertToUserCurrency(flight.price.total, flight.price.currency)
            )}`}</h2>

            {!bookedFlight && !isFlightIncludedInAnyTrip() && (
              <CustomButton
                backgroundColor={Colors.GREEN}
                style={{ boxShadow: Shadow.LIGHT3D }}
                onClick={() => bookFlight()}
              >
                Purchase flight
              </CustomButton>
            )}
          </Grid>
        </Grid>
      </Grid>

      <IncludeInTripPopover
        place={flight}
        tripAnchor={tripAnchor}
        eventType={EventTypes.FLIGHT}
        setTripAnchor={setTripAnchor}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      />

      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert
          style={{ fontFamily: Font.Family }}
          variant="filled"
          elevation={6}
          onClose={() => setOpenSnack(false)}
          severity="success"
        >
          Flight booked.
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
