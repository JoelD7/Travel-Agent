import { format, parseISO } from "date-fns";
import { capitalizeString, getIataLocation } from "./functions";

/**
 * Returns the city name of the place on which the flight takes off or lands.
 * @param flight
 * @param placeRel Place relation of the flight(departure or arrival)
 * @param itinerary "0" means outbound flight; "1" means return flight.
 * @param segment
 */
export function getFlightCitiesLabel(
  flight: Flight,
  placeRel: "departure" | "arrival",
  itinerary: number = 0,
  segment: number = 0
) {
  let city = "";

  if (placeRel === "departure") {
    let location = getIataLocation(
      `${flight.itineraries[itinerary].segments[segment].departure.iataCode}`
    );

    if (location) {
      city = location.city;
    } else {
      city = "Not available";
    }
    return `${city} (${flight.itineraries[itinerary].segments[segment].departure.iataCode})`;
  } else {
    let location = getIataLocation(
      `${getLastSegment(flight.itineraries[itinerary]).arrival.iataCode}`
    );

    if (location) {
      city = location.city;
    } else {
      city = "Not available";
    }
    return `${city} (${getLastSegment(flight.itineraries[itinerary]).arrival.iataCode})`;
  }
}

/**
 * Returns a flight's formated departure/arrival datetime
 * @param flight
 * @param point
 */
export function formatFlightDateTime(
  flight: Flight,
  point: "departure" | "arrival",
  itinerary: number = 0
) {
  let departureTime = flight.itineraries[itinerary].segments[0].departure.at;
  let arrivalTime = flight.itineraries[itinerary].segments[0].arrival.at;

  return point === "departure"
    ? `${format(parseISO(departureTime), "d/MMM, hh:mm aaa")}`
    : `${format(parseISO(arrivalTime), "d/MMM,  hh:mm aaa")}`;
}

/**
 * Returns a flight's formated departure/arrival date
 * @param flight
 * @param point
 */
export function formatFlightDate(
  flight: Flight,
  point: "departure" | "arrival",
  itinerary: number = 0,
  segment: number = 0
) {
  let departureTime = flight.itineraries[itinerary].segments[segment].departure.at;
  let arrivalTime = flight.itineraries[itinerary].segments[segment].arrival.at;

  return point === "departure"
    ? `${format(new Date(departureTime), "EEE, d/MMM")}`
    : `${format(new Date(arrivalTime), "EEE, d/MMM")}`;
}

export function formatFlightTime(
  flight: Flight,
  point: "departure" | "arrival",
  itinerary: number = 0,
  segment: number = 0
) {
  let departureTime = flight.itineraries[itinerary].segments[segment].departure.at;
  let arrivalTime = flight.itineraries[itinerary].segments[segment].arrival.at;

  return point === "departure"
    ? `${format(new Date(departureTime), "hh:mm aa")}`
    : `${format(new Date(arrivalTime), "hh:mm aa")}`;
}

export function formatFlightSegmentTime(
  segment: FlightSegment,
  point: "departure" | "arrival"
) {
  let departureTime = segment.departure.at;
  let arrivalTime = segment.arrival.at;

  return point === "departure"
    ? `${format(new Date(departureTime), "hh:mm aa")}`
    : `${format(new Date(arrivalTime), "hh:mm aa")}`;
}

/**
 * Return a flight's duration on a more readable format.
 * @param duration
 */
export function parseFlightDuration(duration: string) {
  let hours = "";
  let minutes = "";

  duration
    .substring(2)
    .split("H")
    .forEach((value, i) => {
      if (i === 0) {
        hours = value;
      } else {
        minutes = value.substring(0, value.length - 1);
      }
    });

  return `${hours}h ${minutes}m`;
}

/**
 * Returns the last segment of a flight.
 * The last segment is the part of the flight
 * that takes the passenger to the ultimate destination.
 * @param flight
 */
export function getLastSegment(flight: FlightItinerary) {
  return flight.segments[flight.segments.length - 1];
}

export function getFlightSegmentCarrier(
  segment: FlightSegment,
  dictionaries: FlightDictionary
) {
  if (dictionaries.carriers[segment.carrierCode]) {
    return capitalizeString(dictionaries.carriers[segment.carrierCode], "each word");
  }
  return "Not available";
}
