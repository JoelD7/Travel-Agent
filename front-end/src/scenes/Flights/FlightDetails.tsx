import {
  faChevronCircleRight,
  faCircle,
  faPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, Dialog, Divider, Grid, IconButton } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { CustomButton } from "../../components";
import { Colors } from "../../styles";
import {
  capitalizeString,
  FlightSearch,
  formatAsCurrency,
  formatFlightDate,
  formatFlightSegmentTime,
  getFlightCitiesLabel,
  getFlightSegmentCarrier,
  getIataLocation,
  getLastSegment,
  parseFlightDuration,
  selectFlightDictionaries,
  selectFlightSearchParams,
  selectBaseCurrency,
  ExchangeRate,
  selectExchangeRate,
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

  const baseCurrency: string = useSelector(selectBaseCurrency);
  const exchangeRate: ExchangeRate = useSelector(selectExchangeRate);

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

    return (
      <Grid key="flight card" item xs={12} className={style.flightCard}>
        {/* Card title */}
        <Grid key="title" container alignItems="center">
          <h2 style={{ fontSize: "20px", color: Colors.BLUE }}>
            {itinerary === 0 ? "Depart" : "Return"}
          </h2>

          <p className={style.flightCardDate}>
            {formatFlightDate(flight, "departure", itinerary)}
          </p>
          <p className={style.flightCardCities}>
            {`${getCityFromIata(flightItinerary.segments[0].departure.iataCode)} -` +
              ` ${getCityFromIata(getLastSegment(flightItinerary).arrival.iataCode)}`}
          </p>
          <Grid key="second line" item xs={12}></Grid>
        </Grid>

        <Divider />
        {flightItinerary.segments.map((segment, i) => (
          <Grid key={i} container style={{ paddingTop: "20px" }}>
            <Grid key="airline" item xs={2}>
              <Grid container alignItems="center">
                <Grid item xs={12} style={{ display: "flex" }}>
                  <FontAwesomeIcon
                    size="2x"
                    style={{ margin: "auto" }}
                    color={Colors.PURPLE}
                    icon={faPlane}
                  />
                </Grid>

                <Grid item xs={12}>
                  {dictionaries && (
                    <p style={{ textAlign: "center" }}>
                      {getFlightSegmentCarrier(segment, dictionaries)}
                    </p>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid key="first time" item xs={2}>
              <p className={style.firstTime}>
                {formatFlightSegmentTime(segment, "departure")}
              </p>
              <p className={style.firstIata}>{segment.departure.iataCode}</p>
            </Grid>

            <Grid key="line" item xs={2} style={{ padding: "5px 10px" }}>
              <Divider className={style.timeDivider} />
            </Grid>

            <Grid key="second time" item xs={2}>
              <p className={style.secondTime}>
                {formatFlightSegmentTime(segment, "arrival")}
              </p>
              <p className={style.secondIata}>{segment.arrival.iataCode}</p>
            </Grid>

            <Grid item xs={4}>
              <p style={{ fontSize: "14px", textAlign: "end" }}>
                <b>Duration</b>
                {`: ${parseFlightDuration(segment.duration)}`}
              </p>
            </Grid>
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
      }}
      onClose={onClose}
    >
      <Grid container className={style.mainContainer}>
        {/* Top title */}
        <Grid key="topTitle" item xs={12}>
          <Grid container alignItems="center">
            <h2 style={{ fontSize: "28px" }}>
              {getFlightCitiesLabel(flight, "departure")}
            </h2>

            <FontAwesomeIcon
              size="2x"
              style={{ margin: "auto 10px" }}
              color={Colors.PURPLE}
              icon={faChevronCircleRight}
            />
            <h2 style={{ fontSize: "28px" }}>
              {getFlightCitiesLabel(flight, "arrival")}
            </h2>

            <IconButton
              style={{ width: "45px", height: "45px" }}
              onClick={() => onClose()}
              className={style.closeButton}
            >
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

        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Grid container justify="flex-end">
            <h2 style={{ fontSize: "20px", marginRight: "10px" }}>{`US${formatAsCurrency(
              flight.price.total,
              baseCurrency,
              exchangeRate
            )}`}</h2>
            <CustomButton onClick={() => {}}>Purchase flight</CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
