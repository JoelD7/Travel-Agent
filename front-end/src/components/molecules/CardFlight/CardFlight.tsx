import { faClock, faPlane, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import { format } from "date-fns";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Font } from "../../../assets";
import { FlightDetails } from "../../../scenes";
import { Colors } from "../../../styles";
import {
  ExchangeRate,
  formatAsCurrency,
  formatFlightDate,
  getFlightCitiesLabel,
  getFlightSegmentCarrier,
  getLastSegment,
  parseFlightDuration,
  selectEndCurrency,
  selectExchangeRate,
  selectFlightDictionaries,
} from "../../../utils";
import { CustomButton, IconText, IconTP, Text } from "../../atoms";
import { cardFlightStyles } from "./cardFlightStyles";

interface CardFlight {
  flight: Flight;
  className?: string;
  variant?: "deal" | "regular";
  animate?: boolean;
}

export function CardFlight({ flight, variant = "deal", className, animate }: CardFlight) {
  const style = cardFlightStyles();
  const exitFlight: FlightItinerary = flight.itineraries[0];
  const returnFlight: FlightItinerary | undefined =
    flight.itineraries.length > 1 ? flight.itineraries[1] : undefined;

  const baseCurrency: string = useSelector(selectEndCurrency);
  const exchangeRate: ExchangeRate = useSelector(selectExchangeRate);

  const dictionaries: FlightDictionary | undefined = useSelector(
    selectFlightDictionaries
  );

  const [flightDetailsModal, setFlightDetailsModal] = useState(false);

  const is350OrLess = useMediaQuery("(max-width:350px)");

  function parseStops(segments: FlightSegment[]) {
    let stopsSegments: FlightSegment[] = segments.slice(0, segments.length - 1);
    let stops = "";
    let quant = 0;

    stopsSegments.forEach((value, i) => {
      quant++;

      if (i > 0) {
        stops += `\\${value.departure.iataCode}`;
      } else {
        stops += value.departure.iataCode;
      }
    });

    return segments.length > 1 ? `${quant} stops, ${stops}` : `1 stop, ${stops}`;
  }

  return variant === "deal" ? (
    <Grid item className={`${style.dealGrid} ${className}`}>
      <CardActionArea className={animate ? style.cardAnimated : style.card}>
        <Card>
          <CardHeader
            title={
              <Grid container style={{ fontFamily: Font.Family }}>
                <Grid id="text grid" item className={style.flightsDataGrid}>
                  {/* Outgoing flight */}
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
                      {`${formatFlightDate(flight, "departure")} - ${formatFlightDate(
                        flight,
                        "arrival"
                      )}`}
                    </p>
                  </div>

                  {/* Return flight */}
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
                          {`${formatFlightDate(
                            flight,
                            "departure",
                            1
                          )} - ${formatFlightDate(flight, "arrival", 1)}`}
                        </p>
                      </div>
                    </div>
                  )}
                </Grid>

                {/* Price */}
                <Grid id="price grid" item className={style.priceGrid}>
                  <Grid container alignItems="center" justify="flex-end">
                    <Text bold component="h4">{`${formatAsCurrency(
                      Number(flight.price.total),
                      flight.price.currency,
                      baseCurrency,
                      exchangeRate
                    )}`}</Text>
                  </Grid>
                </Grid>
              </Grid>
            }
          />

          <CardContent>
            {/* Airline and class */}
            <Grid container>
              <Grid item className={style.airlineClassGrid}>
                <IconText
                  icon={faPlaneDeparture}
                  text={`${flight.itineraries[0].segments[0].carrierCode}, ${flight.class}`}
                />
              </Grid>

              <Grid item className={style.detailButtonGrid}>
                <Grid container justify="flex-end">
                  {/* Price responsive */}
                  <Grid id="price grid" item className={style.priceGridRes}>
                    <Text bold component="h4">{`${formatAsCurrency(
                      Number(flight.price.total),
                      flight.price.currency,
                      baseCurrency,
                      exchangeRate
                    )}`}</Text>
                  </Grid>

                  <CustomButton
                    style={{ fontSize: "14px" }}
                    onClick={() => {}}
                    backgroundColor={Colors.PURPLE}
                  >
                    View details
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  ) : (
    <Grid container className={style.mainContainer}>
      {/* Outgoing flight */}
      <Grid key="outgoing flight" item xs={12}>
        <Grid container>
          {/* Plane icon */}
          <Grid item className={style.planeIconGrid}>
            <IconTP size={22} style={{ marginRight: "7px" }} icon={faPlane} />
          </Grid>

          {/* Departure-arrival times and airports */}
          <Grid item className={style.timesIataGrid}>
            <p className={style.timesText}>{`${format(
              new Date(exitFlight.segments[0].departure.at),
              "h:mm aa"
            )} - ${format(
              new Date(getLastSegment(exitFlight).arrival.at),
              "h:mm aa"
            )}`}</p>

            {dictionaries && (
              <p className={style.airportsText}>{`${
                exitFlight.segments[0].departure.iataCode
              } - 
          ${getLastSegment(exitFlight).arrival.iataCode}, ${getFlightSegmentCarrier(
                exitFlight.segments[0],
                dictionaries
              )}`}</p>
            )}
          </Grid>

          {/* Flight duration and stops */}
          <Grid item className={style.timeStopsGrid}>
            <Grid
              container
              alignItems="center"
              style={is350OrLess ? { marginBottom: "20px" } : {}}
              justify={is350OrLess ? "flex-start" : "flex-end"}
            >
              {is350OrLess && (
                <IconTP size={22} style={{ marginRight: "7px" }} icon={faClock} />
              )}

              <div>
                <p className={style.durationText}>{`${parseFlightDuration(
                  exitFlight.duration
                )}`}</p>
                <p className={style.durationSubText}>
                  {exitFlight.segments.length > 1
                    ? `${parseStops(exitFlight.segments)}`
                    : "Nonstop"}
                </p>
              </div>
            </Grid>
          </Grid>

          {/* Flight price */}
          <Grid item className={style.priceButtonGrid}>
            <h2 style={{ marginTop: "12px" }}>{`${formatAsCurrency(
              flight.price.total,
              flight.price.currency,
              baseCurrency,
              exchangeRate
            )}`}</h2>
          </Grid>
        </Grid>
      </Grid>

      {/* Return flight */}
      <Grid key="return flight" item xs={12}>
        <Grid container>
          {returnFlight && (
            <>
              {/* Plane icon */}
              <Grid item className={style.planeIconGrid}>
                <IconTP size={22} style={{ marginRight: "7px" }} icon={faPlane} />
              </Grid>

              {/* Departure-arrival times and airports */}
              <Grid item className={style.timesIataGrid}>
                <p className={style.timesText}>{`${format(
                  new Date(getLastSegment(returnFlight).departure.at),
                  "h:mm aa"
                )} - ${format(
                  new Date(getLastSegment(returnFlight).arrival.at),
                  "h:mm aa"
                )}`}</p>

                {dictionaries && (
                  <p className={style.airportsText}>{`${
                    getLastSegment(returnFlight).departure.iataCode
                  } - 
            ${getLastSegment(returnFlight).arrival.iataCode}, ${getFlightSegmentCarrier(
                    getLastSegment(returnFlight),
                    dictionaries
                  )}`}</p>
                )}
              </Grid>

              {/* Flight duration and stops */}
              <Grid item className={style.timeStopsGrid}>
                <Grid
                  container
                  style={is350OrLess ? { marginBottom: "20px" } : {}}
                  justify={is350OrLess ? "flex-start" : "flex-end"}
                >
                  {is350OrLess && (
                    <IconTP size={22} style={{ marginRight: "7px" }} icon={faClock} />
                  )}

                  <div>
                    <p className={style.durationText}>{`${parseFlightDuration(
                      returnFlight.duration
                    )}`}</p>
                    <p className={style.durationSubText}>
                      {returnFlight.segments.length > 1
                        ? `${parseStops(returnFlight.segments)}`
                        : "Nonstop"}
                    </p>
                  </div>
                </Grid>
              </Grid>
            </>
          )}

          <Grid
            item
            className={returnFlight ? style.priceButtonGrid : style.priceButtonGridFull}
          >
            <CustomButton
              backgroundColor={Colors.GREEN}
              onClick={() => setFlightDetailsModal(true)}
            >
              View details
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid key="price & button xs" item xs={12} className={style.priceButtonXS}>
        <Grid container alignItems="center">
          <h2 style={{ marginRight: "auto", marginTop: "12px" }}>{`${formatAsCurrency(
            flight.price.total,
            flight.price.currency,
            baseCurrency,
            exchangeRate
          )}`}</h2>
          <CustomButton
            style={{ marginLeft: "auto" }}
            onClick={() => setFlightDetailsModal(true)}
            backgroundColor={Colors.GREEN}
          >
            View details
          </CustomButton>
        </Grid>
      </Grid>

      <FlightDetails
        flight={flight}
        onClose={() => setFlightDetailsModal(false)}
        open={flightDetailsModal}
      />
    </Grid>
  );
}
