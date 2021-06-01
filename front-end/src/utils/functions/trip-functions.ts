import { differenceInCalendarDays, parseISO } from "date-fns";
import { setUserTrips, store } from "../store";
import { Trip, TripEvent } from "../types";
import { b64toBlob } from "./functions";

/**
 * Converts data returned by the backend to a
 * client-defined Trip type.
 */
export function responseTripToDomainTrip(resTrip: any) {
  const blob = b64toBlob(resTrip.coverPhoto);
  const imageUrl = URL.createObjectURL(blob);

  return {
    idTrip: resTrip.idTrip,
    name: resTrip.name,
    countries: resTrip.countries.split(", "),
    photosQty: 0,
    places: 1,
    budget: resTrip.budget,
    days: differenceInCalendarDays(
      parseISO(resTrip.endDate),
      parseISO(resTrip.startDate)
    ),
    startDate: parseISO(resTrip.startDate),
    endDate: parseISO(resTrip.endDate),
    coverPhoto: imageUrl,
    albums: resTrip.albums,
    itinerary: resTrip.itinerary,
  };
}

export function deleteTripEventFromStore(idEvent: number | undefined) {
  if (idEvent) {
    const userTrips: Trip[] = store.getState().tripSlice.userTrips;

    const newUserTrips: Trip[] = userTrips.map((trip) => {
      if (trip.itinerary) {
        const newItinerary: TripEvent[] = trip.itinerary.filter(
          (event) => event.idEvent !== idEvent
        );
        return { ...trip, itinerary: newItinerary };
      }

      return trip;
    });

    store.dispatch(setUserTrips(newUserTrips));
  }
}
