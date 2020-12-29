import {
  faArrowRight,
  faChevronCircleRight,
  faCircle,
  faDotCircle,
  faPlane,
  faPlaneDeparture,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Backdrop, Dialog, Divider, Grid, IconButton, Modal } from "@material-ui/core";
import { parseISO } from "date-fns";
import React from "react";
import { CustomButton } from "../../components";
import { Colors } from "../../styles";
import {
  currencyFormatter,
  formatFlightDate,
  formatFlightTime,
  getFlightCitiesLabel,
  parseFlightDuration,
} from "../../utils";
import { flightDetailsStyles } from "./flightDetails-styles";

interface FlightDetails {
  open: boolean;
  //   flight: Flight;
  onClose: () => void;
  //   passengers: number;
}

interface FlightCard {
  itinerary: number;
}

export function FlightDetails({ open, onClose }: FlightDetails) {
  const style = flightDetailsStyles();
  const passengers = 3;
  const flight: Flight = {
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
              at: parseISO("2021-02-02T19:15:00"),
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
  };

  function FlightCard({ itinerary }: FlightCard) {
    return (
      <Grid key="flight card" item xs={12} className={style.flightCard}>
        <Grid key="title" container alignItems="center">
          <h2 style={{ fontSize: "20px", color: Colors.BLUE }}>
            {itinerary === 0 ? "Depart" : "Return"}
          </h2>
          <p className={style.flightCardDate}>
            {formatFlightDate(flight, "departure", itinerary)}
          </p>
          <p className={style.flightCardCities}>
            {`${flight.itineraries[itinerary].segments[0].departure.city} -` +
              ` ${flight.itineraries[itinerary].segments[0].arrival.city}`}
          </p>
          <Grid key="second line" item xs={12}></Grid>
        </Grid>

        <Divider />

        <Grid key="card content" container style={{ paddingTop: "20px" }}>
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
                <p style={{ textAlign: "center" }}>
                  {flight.itineraries[itinerary].segments[0].carrier}
                </p>
              </Grid>
            </Grid>
          </Grid>

          <Grid key="first time" item xs={2}>
            <p className={style.firstTime}>
              {formatFlightTime(flight, "departure", itinerary)}
            </p>
            <p className={style.firstIata}>
              {flight.itineraries[itinerary].segments[0].departure.iata}
            </p>
          </Grid>

          <Grid key="line" item xs={2} style={{ padding: "5px 10px" }}>
            <Divider className={style.timeDivider} />
          </Grid>

          <Grid key="second time" item xs={2}>
            <p className={style.secondTime}>
              {formatFlightTime(flight, "arrival", itinerary)}
            </p>
            <p className={style.secondIata}>
              {flight.itineraries[itinerary].segments[0].arrival.iata}
            </p>
          </Grid>

          <Grid item xs={4}>
            <p style={{ fontSize: "14px", textAlign: "end" }}>
              <b>Duration</b>
              {`: ${parseFlightDuration(flight.itineraries[itinerary].duration)}`}
            </p>
          </Grid>
        </Grid>
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

            <IconButton onClick={() => onClose()} className={style.closeButton}>
              <FontAwesomeIcon color={Colors.BLUE} icon={faTimes} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid key="subtitle" item xs={12}>
          <Grid container alignItems="center">
            <p className={style.subtitle}>{`${formatFlightDate(
              flight,
              "departure"
            )} - ${formatFlightDate(flight, "departure", 1)}`}</p>

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

            <p className={style.subtitle}>{flight.class}</p>
          </Grid>
        </Grid>
        <FlightCard itinerary={0} />
        <FlightCard itinerary={1} />

        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Grid container justify="flex-end">
            <h2 style={{ fontSize: "20px", marginRight: '10px' }}>{`US${currencyFormatter(
              flight.price.total
            )}`}</h2>
            <CustomButton onClick={() => {}} >Purchase flight</CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
