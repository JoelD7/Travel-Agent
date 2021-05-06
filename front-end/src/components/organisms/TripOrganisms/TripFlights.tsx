import { makeStyles, Grid, Theme } from "@material-ui/core";
import React from "react";
import { flightsPlaceholder } from "../../../utils";
import { CardFlight } from "../CardFlight/CardFlight";

interface TripFlights {
  showAll?: boolean;
}

export function TripFlights({ showAll = true }: TripFlights) {
  const tripFlightStyles = makeStyles((theme: Theme) => ({
    flightCard: {
      width: "48%",
      margin: "8px",
      [theme.breakpoints.down(1325)]: {
        width: "595px",
      },
    },
  }));

  const style = tripFlightStyles();

  const flights: Flight[] = flightsPlaceholder.concat(flightsPlaceholder);

  function getFlightsToShow(): Flight[] {
    return showAll ? flights : flights.slice(0, 2);
  }

  return (
    <Grid container>
      {getFlightsToShow().map((flight, i) => (
        <CardFlight className={style.flightCard} key={i} flight={flight} variant="deal" />
      ))}
    </Grid>
  );
}
