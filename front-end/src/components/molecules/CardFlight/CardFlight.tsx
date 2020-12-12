import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { FlightDetails } from "../../../scenes";
import { Colors } from "../../../styles";
import { currencyFormatter, parseFlightDuration } from "../../../utils";
import { CustomButton, IconText } from "../../atoms";
import { cardFlightStyles } from "./cardFlightStyles";

interface CardFlight {
  flight: Flight;
}

export function CardFlight({ flight }: CardFlight) {
  const style = cardFlightStyles();
  const exitFlight: FlightItinerary = flight.itineraries[0];
  const returnFlight: FlightItinerary | undefined =
    flight.itineraries.length > 1 ? flight.itineraries[1] : undefined;

  const [flightDetailsModal, setFlightDetailsModal] = useState(false);

  function parseStops(segments: FlightSegment[]) {
    let stopsSegments: FlightSegment[] = segments.slice(1, segments.length - 1);
    let stops = "";
    let quant = 0;

    stopsSegments.forEach((value, i) => {
      quant++;

      if (i > 0) {
        stops += `\\${value.departure.iata}`;
      } else {
        stops += value.departure.iata;
      }
    });

    return segments.length > 1 ? `${quant} stops, ${stops}` : `1 stop, ${stops}`;
  }

  return (
    <Grid container className={style.mainContainer}>
      <Grid key="outgoing flight" item xs={12}>
        <Grid container>
          <Grid item className={style.planeIconGrid}>
            <IconText text="" icon={faPlane} size="22px" />
          </Grid>
          <Grid item className={style.timesIataGrid}>
            <p className={style.timesText}>{`${format(
              exitFlight.segments[0].departure.at,
              "h:mm aa"
            )} - ${format(exitFlight.segments[0].arrival.at, "h:mm aa")}`}</p>

            <p
              className={style.airportsText}
            >{`${exitFlight.segments[0].departure.iata} - 
            ${exitFlight.segments[0].arrival.iata}, ${exitFlight.segments[0].carrier}`}</p>
          </Grid>

          <Grid item className={style.timeStopsGrid}>
            <p className={style.durationText}>{`${parseFlightDuration(
              exitFlight.duration
            )}`}</p>
            <p className={style.durationSubText}>
              {exitFlight.segments.length > 1
                ? `${parseStops(exitFlight.segments)}`
                : "Nonstop"}
            </p>
          </Grid>
          
          <Grid item className={style.priceButtonGrid}>
            <h2 style={{ marginTop: "12px" }}>{`${currencyFormatter(
              flight.price.total
            )}`}</h2>
          </Grid>
        </Grid>
      </Grid>

      <Grid key="return flight" item xs={12}>
        <Grid container>
          {returnFlight && (
            <>
              <Grid item className={style.planeIconGrid}>
                <IconText text="" icon={faPlane} size="22px" />
              </Grid>
              <Grid item className={style.timesIataGrid}>
                <p className={style.timesText}>{`${format(
                  returnFlight.segments[0].departure.at,
                  "h:mm aa"
                )} - ${format(returnFlight.segments[0].arrival.at, "h:mm aa")}`}</p>

                <p
                  className={style.airportsText}
                >{`${returnFlight.segments[0].departure.iata} - 
              ${returnFlight.segments[0].arrival.iata}, ${returnFlight.segments[0].carrier}`}</p>
              </Grid>

              <Grid item className={style.timeStopsGrid}>
                <p className={style.durationText}>{`${parseFlightDuration(
                  returnFlight.duration
                )}`}</p>
                <p className={style.durationSubText}>
                  {returnFlight.segments.length > 1
                    ? `${parseStops(returnFlight.segments)}`
                    : "Nonstop"}
                </p>
              </Grid>
            </>
          )}

          <Grid
            item
            className={returnFlight ? style.priceButtonGrid : style.priceButtonGridFull}
          >
            <CustomButton
              label="View details"
              onClick={() => setFlightDetailsModal(true)}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid key="price & button xs" item xs={12} className={style.priceButtonXS}>
        <Grid container alignItems="center">
          <h2 style={{ marginRight: "auto", marginTop: "12px" }}>{`${currencyFormatter(
            flight.price.total
          )}`}</h2>
          <CustomButton
            label="View details"
            style={{ marginLeft: "auto" }}
            onClick={() => setFlightDetailsModal(true)}
          />
        </Grid>
      </Grid>

      <FlightDetails
        onClose={() => setFlightDetailsModal(false)}
        open={flightDetailsModal}
      />
    </Grid>
  );
}
