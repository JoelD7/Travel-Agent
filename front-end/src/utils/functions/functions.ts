import {
  faHotel,
  faLocationArrow,
  faPlaneDeparture,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { CSSProperties } from "@material-ui/styles";
import { format } from "date-fns";
import { EventType } from "../types";

export function muiDateFormatter(date: MaterialUiPickersDate, invalidLabel: string) {
  return date
    ? format(
        new Date(date?.getFullYear(), date?.getMonth(), date?.getDate()),
        "EEE. d/MMM, yyyy"
      )
    : "dd MMM., yyyy";
}

export function getLinkStyle(color: string = "initial"): CSSProperties {
  return {
    color: color,
    textDecoration: "none",
  };
}

export const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
}).format;

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
  return placeRel === "departure"
    ? `${flight.itineraries[itinerary].segments[segment].departure.city} (${flight.itineraries[itinerary].segments[segment].departure.iata})`
    : `${flight.itineraries[itinerary].segments[segment].arrival.city} (${flight.itineraries[segment].segments[segment].arrival.iata})`;
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
    ? `${format(departureTime, "d/MMM, hh:mm aaa")}`
    : `${format(arrivalTime, "d/MMM,  hh:mm aaa")}`;
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
    ? `${format(departureTime, "EEE, d/MMM")}`
    : `${format(arrivalTime, "EEE, d/MMM")}`;
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
    ? `${format(departureTime, "hh:mm aa")}`
    : `${format(arrivalTime, "hh:mm aa")}`;
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
 * Returns an icon related to an event type.
 * @param type type of the event.
 */
export function eventToIcon(type: EventType.EventType) {
  switch (type) {
    case EventType.Flight:
      return faPlaneDeparture;

    case EventType.Hotel:
      return faHotel;

    case EventType.Restaurant:
      return faUtensils;

    case EventType.POI:
      return faLocationArrow;
  }
}

/**
 * Checks if two dates are equal ignoring the time values
 * @param dateOne first date
 * @param dateTwo second date
 */
export function areDatesEqual(dateOne: Date, dateTwo: Date) {
  return (
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth() &&
    dateOne.getDate() === dateTwo.getDate()
  );
}
