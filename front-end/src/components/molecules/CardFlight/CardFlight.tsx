import { faPlane, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { Grid, Card, CardHeader, CardContent } from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { Font } from "../../../assets";
import { FlightDetails } from "../../../scenes";
import { Colors } from "../../../styles";
import {
  currencyFormatter,
  parseFlightDuration,
  getFlightCitiesLabel,
  formatFlightDateTime,
} from "../../../utils";
import { CustomButton, IconText, Text } from "../../atoms";
import { cardFlightStyles } from "./cardFlightStyles";

interface CardFlight {
  flight: Flight;
  variant?: "deal" | "regular";
}

export function CardFlight({ flight, variant = "deal" }: CardFlight) {
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

  return variant === "deal" ? (
    <Grid item className={style.dealGrid}>
      <Card className={style.card}>
        <CardHeader
          title={
            <Grid container style={{ fontFamily: Font.Family }}>
              <Grid id="text grid" item xs={8}>
                <div style={{ display: "flex" }}>
                  <Text style={{ color: Colors.BLUE }} component="h4" weight="bold">
                    {getFlightCitiesLabel(flight, "departure")}
                  </Text>

                  <IconText
                    text=""
                    icon={faPlane}
                    style={{ margin: "0px 5px" }}
                    size={14}
                  />

                  <Text style={{ color: Colors.BLUE }} component="h4" weight="bold">
                    {getFlightCitiesLabel(flight, "arrival")}
                  </Text>
                </div>

                <div>
                  <p className={style.dealSubtitle}>
                    {`${formatFlightDateTime(
                      flight,
                      "departure"
                    )} - ${formatFlightDateTime(flight, "arrival")}`}
                  </p>
                </div>

                {returnFlight && (
                  <div>
                    <div style={{ marginTop: "10px", display: "flex" }}>
                      <Text style={{ color: Colors.BLUE }} component="h4" weight="bold">
                        {getFlightCitiesLabel(flight, "departure", 1)}
                      </Text>

                      <IconText
                        text=""
                        icon={faPlane}
                        style={{ margin: "0px 5px" }}
                        size={14}
                      />

                      <Text style={{ color: Colors.BLUE }} component="h4" weight="bold">
                        {getFlightCitiesLabel(flight, "arrival", 1)}
                      </Text>
                    </div>
                    <div>
                      <p className={style.dealSubtitle}>
                        {`${formatFlightDateTime(
                          flight,
                          "departure",
                          1
                        )} - ${formatFlightDateTime(flight, "arrival", 1)}`}
                      </p>
                    </div>
                  </div>
                )}
              </Grid>

              <Grid id="price grid" item xs={4}>
                <Grid container alignItems="center">
                  <h5
                    style={{ margin: "auto 0px auto auto" }}
                  >{`${flight.price.currency}$ ${flight.price.total}`}</h5>
                </Grid>
              </Grid>
            </Grid>
          }
        />

        <CardContent>
          <div style={{ display: "flex" }}>
            <IconText
              icon={faPlaneDeparture}
              text={`${flight.itineraries[0].segments[0].carrier}, ${flight.class}`}
            />

            <CustomButton
              style={{ marginLeft: "auto", fontSize: "14px" }}
              onClick={() => {}}
              backgroundColor={Colors.PURPLE}
            >View details</CustomButton>
          </div>
        </CardContent>
      </Card>
    </Grid>
  ) : (
    <Grid container className={style.mainContainer}>
      <Grid key="outgoing flight" item xs={12}>
        <Grid container>
          <Grid item className={style.planeIconGrid}>
            <IconText text="" icon={faPlane} size={22} />
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
                <IconText text="" icon={faPlane} size={22} />
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
              onClick={() => setFlightDetailsModal(true)}
            >View details</CustomButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid key="price & button xs" item xs={12} className={style.priceButtonXS}>
        <Grid container alignItems="center">
          <h2 style={{ marginRight: "auto", marginTop: "12px" }}>{`${currencyFormatter(
            flight.price.total
          )}`}</h2>
          <CustomButton
            style={{ marginLeft: "auto" }}
            onClick={() => setFlightDetailsModal(true)}
          >View details</CustomButton>
        </Grid>
      </Grid>

      <FlightDetails
        onClose={() => setFlightDetailsModal(false)}
        open={flightDetailsModal}
      />
    </Grid>
  );
}
