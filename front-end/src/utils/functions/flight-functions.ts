import { format, parseISO } from "date-fns";
import { URLSearchParams } from "url";
import { Routes } from "..";
import { iataCodes } from "../constants";
import { FlightSearch } from "../store";
import { IATALocation } from "../types/location-types";
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

export function getAutocompleteLabel(
  option: IATALocation | null | undefined,
  type: "city" | "airport"
): string {
  if (option) {
    return type === "city"
      ? `${option.city}, ${option.country}`
      : `${option.name}, ${capitalizeString(`${option.city}`, "each word")}`;
  }
  return "";
}

/**
 * Returns the sum of the duration of flights
 * (outgoing and return) in minutes. This is
 * used to sort flights by duration.
 * @param d1
 * @param d2
 */
export function addFlightDuration(flight: Flight) {
  let d1: string = flight.itineraries[0].duration;
  let d2: string = flight.itineraries[1].duration;

  //PT13H50M
  let hourOne = Number(d1.substring(2).split("H")[0]);
  let minuteOne = Number(d1.substring(2).split("H")[1].split("M")[0]);

  let hourTwo = Number(d2.substring(2).split("H")[0]);
  let minuteTwo = Number(d2.substring(2).split("H")[1].split("M")[0]);

  let hours = hourOne + hourTwo;
  let minutes = minuteOne + minuteTwo;

  if (minutes >= 60) {
    hours += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  return hours * 60 + minutes;
}

export function convertFlightToURLParams(flight: FlightSearch) {
  let params: string[] = [];

  params.push(`departure=${format(flight.departure, "yyyy-MM-dd")}`);
  if (flight.return) {
    params.push(`return=${format(flight.return, "yyyy-MM-dd")}`);
  }
  params.push(`from=${flight.from}`);
  params.push(`to=${flight.to}`);
  params.push(`adults=${flight.adults}`);

  if (flight.infants && flight.infants !== 0) {
    params.push(`infants=${flight.infants}`);
  }

  if (flight.children && flight.children !== 0) {
    params.push(`children=${flight.children}`);
  }

  if (flight.class !== "") {
    params.push(`class=${flight.class}`);
  }

  return `?${params.join("&")}`;
}

export function convertURLParamsToFlight(query: URLSearchParams): FlightSearch {
  let kvp: { [index: string]: string } = {};
  let flight: FlightSearch;
  let buffer: any = {};

  for (const pair of Array.from(query.entries())) {
    let key = pair[0];
    let value = pair[1];

    kvp = { ...kvp, [key]: value };
  }

  buffer = {
    departure: parseISO(kvp.departure),
    from: kvp.from,
    to: kvp.to,
    flightFromAutocomplete: iataCodes.filter((iata) => iata.code === kvp.from)[0],
    flightToAutocomplete: iataCodes.filter((iata) => iata.code === kvp.to)[0],
    adults: Number(kvp.adults),
  };

  if (kvp.hasOwnProperty("return")) {
    buffer = { ...buffer, return: parseISO(kvp.return) };
  }

  if (kvp.hasOwnProperty("children")) {
    buffer = { ...buffer, children: Number(kvp.children) };
  }

  if (kvp.hasOwnProperty("infants")) {
    buffer = { ...buffer, infants: Number(kvp.infants) };
  }

  if (kvp.hasOwnProperty("class")) {
    buffer = { ...buffer, class: kvp.class };
  }

  flight = { ...buffer };

  return flight;
}

/**
 * Returns the flight class in a format understandable for
 * the API.
 */
export function getFlightClassForAPI(value: string): string {
  switch (value) {
    case "Economy":
      return "ECONOMY";
    case "Premium Economy":
      return "PREMIUM_ECONOMY";
    case "Business":
      return "BUSINESS";
    case "First":
      return "FIRST";
    default:
      return "ECONOMY";
  }
}

export function getFlightDefaultRoute(flightSearch: FlightSearch) {
  return `${Routes.FLIGHT_LIST}${convertFlightToURLParams(
    flightSearch
  )}&page=1&pageSize=20&sortBy=Price | asc`;
}