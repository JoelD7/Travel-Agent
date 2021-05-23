import { differenceInCalendarDays, parseISO } from "date-fns";
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
