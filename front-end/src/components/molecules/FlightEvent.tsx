import {
  faClock,
  faMapMarkerAlt,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { Grid, useMediaQuery } from "@material-ui/core";
import { compareAsc, format, parseISO } from "date-fns";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FlightDetails } from "../../scenes";
import { Colors } from "../../styles";
import {
  getIataLocation,
  getLastSegment,
  IATALocation,
  setFlightDetail,
} from "../../utils";
import { CustomButton, IconText, IconTP, Text } from "../atoms";
import { dayItineraryStyles } from "../organisms/DayItinerary/dayItinerary-styles";

interface FlightEvent {
  eventDate: Date;
  flight: Flight;
}

export function FlightEvent({ flight, eventDate }: FlightEvent) {
  const style = dayItineraryStyles();
  const is430pxOrLess = useMediaQuery("(max-width:430px)");
  const [openFlightDialog, setOpenFlightDialog] = useState(false);

  let departDate = parseISO(flight.itineraries[0].segments[0].departure.at.split("T")[0]);
  const city: string = getFlightCity();
  const dispatch = useDispatch();

  function getFlightCity() {
    let fromCity: IATALocation | undefined = getIataLocation(
      flight.itineraries[0].segments[0].departure.iataCode
    );

    let toCity: IATALocation | undefined = getIataLocation(
      getLastSegment(flight.itineraries[0]).arrival.iataCode
    );

    if (isOutgoingFlight() && toCity) {
      return toCity.city;
    } else if (fromCity) {
      return fromCity.city;
    }

    return "";
  }

  function getFlightName(): string {
    if (isOutgoingFlight()) {
      return `Flight to ${city}`;
    }

    if (isFlightRound(flight)) {
      return `Flight to ${city}`;
    }

    return "";
  }

  function isFlightRound(flight: Flight): boolean {
    return flight.itineraries.length > 1;
  }

  function isOutgoingFlight(): boolean {
    return compareAsc(departDate, eventDate) === 0;
  }

  function seeFlightDetails() {
    setOpenFlightDialog(true);
    dispatch(setFlightDetail(flight));
  }

  function isFlightEventDisplayable(): boolean {
    return isOutgoingFlight() || isFlightRound(flight);
  }

  return (
    <>
      {isFlightEventDisplayable() && (
        <Grid container className={style.cardGrid}>
          {/* Event Icon */}
          <Grid item xs={2}>
            <Grid
              container
              style={{ height: "100%" }}
              justify="center"
              alignContent="center"
            >
              <IconTP
                style={{ padding: 10 }}
                size={is430pxOrLess ? 20 : 25}
                icon={faPlaneDeparture}
              />
            </Grid>
          </Grid>

          {/* Content */}
          <Grid item xs={10}>
            <Grid container>
              <Grid item xs={12}>
                <Text component="h4" bold color={"white"}>
                  {getFlightName()}
                </Text>
              </Grid>

              <Grid item xs={12}>
                <IconText
                  style={{ fontSize: "14px" }}
                  icon={faMapMarkerAlt}
                  iconColor="white"
                  textColor="white"
                  backgroundColor={Colors.BLUE}
                >
                  {city}
                </IconText>
              </Grid>

              {/* Datetime and detail button */}
              <Grid item xs={12}>
                <Grid container>
                  {/* Datetime grid */}
                  <Grid item className={style.datetimeGrid}>
                    <IconText
                      style={{ fontSize: "14px" }}
                      icon={faClock}
                      iconColor="white"
                      textColor="white"
                      backgroundColor={Colors.BLUE}
                    >
                      {format(eventDate, "PP")}
                    </IconText>
                  </Grid>

                  {/* Button grid */}
                  <Grid item className={style.detailButtonGrid}>
                    <Grid container>
                      <CustomButton
                        onClick={() => seeFlightDetails()}
                        backgroundColor={Colors.GREEN}
                        style={{ fontSize: "16px", marginLeft: "auto", color: "white" }}
                      >
                        Flight details
                      </CustomButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <FlightDetails open={openFlightDialog} onClose={() => setOpenFlightDialog(false)} />
    </>
  );
}
