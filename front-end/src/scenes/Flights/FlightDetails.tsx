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
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { CustomButton, IconTP, Text } from "../../components";
import { Colors, Shadow } from "../../styles";
import {
  capitalizeString,
  convertToUserCurrency,
  FlightSearch,
  formatFlightDate,
  formatFlightSegmentTime,
  getFlightCitiesLabel,
  getFlightSegmentCarrier,
  getIataLocation,
  getLastSegment,
  parseFlightDuration,
  selectFlightDictionaries,
  selectFlightSearchParams,
} from "../../utils";
import { flightDetailsStyles } from "./flightDetails-styles";

interface FlightDetails {
  open: boolean;
  flight: Flight;
  onClose: () => void;
}

interface FlightCard {
  itinerary: number;
}

export function FlightDetails({ flight, open, onClose }: FlightDetails) {
  const style = flightDetailsStyles();

  const flightSearch: FlightSearch = useSelector(selectFlightSearchParams);

  const passengers = getFlightPassengers();

  const dictionaries: FlightDictionary | undefined = useSelector(
    selectFlightDictionaries
  );

  const is730OrLess = useMediaQuery("(max-width:730px)");
  const is660OrLess = useMediaQuery("(max-width:660px)");

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

  function getFlightClass(): string {
    return capitalizeString(
      flight.travelerPricings[0].fareDetailsBySegment[0].cabin,
      "each word"
    );
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
                      {getFlightSegmentCarrier(segment, dictionaries)}
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
                      {getFlightSegmentCarrier(segment, dictionaries)}
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
            {flight.itineraries.length > 1 ? (
              <p className={style.subtitle}>{`${formatFlightDate(
                flight,
                "departure"
              )} - ${formatFlightDate(flight, "departure", 1)}`}</p>
            ) : (
              <p className={style.subtitle}>{`${formatFlightDate(
                flight,
                "departure"
              )}`}</p>
            )}

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

            <p className={style.subtitle}>{getFlightClass()}</p>
          </Grid>
        </Grid>

        <FlightCard itinerary={0} />
        {flight.itineraries.length > 1 && <FlightCard itinerary={1} />}

        {/* Button */}
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Grid container justify="flex-end">
            <h2
              style={{ fontSize: "20px", marginRight: "10px" }}
            >{`${convertToUserCurrency(flight.price.total, flight.price.currency)}`}</h2>
            <CustomButton
              backgroundColor={Colors.GREEN}
              style={{ boxShadow: Shadow.LIGHT3D }}
              onClick={() => {}}
            >
              Purchase flight
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
