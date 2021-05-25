import { makeStyles, Grid, Theme } from "@material-ui/core";
import React from "react";
import { flightsPlaceholder } from "../../../utils";
import { NotCreatedMessage } from "../../molecules";
import { CardFlight } from "../CardFlight/CardFlight";

interface TripFlights {
  showAll?: boolean;
  flights: Flight[];
}

export const TripFlights = React.memo(function TripFlights({
  showAll = true,
  flights,
}: TripFlights) {
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

  // const flights: Flight[] = flightsPlaceholder.concat(flightsPlaceholder);

  function getFlightsToShow(): Flight[] {
    return showAll ? flights : flights.slice(0, 2);
  }

  return (
    <Grid container>
      {getFlightsToShow().length > 0 ? (
        getFlightsToShow().map((flight, i) => (
          <CardFlight
            className={style.flightCard}
            key={i}
            flight={flight}
            bookedFlight
            isFlightInTrip
            variant="deal"
          />
        ))
      ) : (
        <NotCreatedMessage type="FLIGHT" message="You have no booked flights." />
      )}
    </Grid>
  );
});
