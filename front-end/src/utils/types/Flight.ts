import { FlightClassType } from "./FlightClassType";

export interface Flight {
  itineraries: FlightItinerary[];
  price: FlightPrice;
  class: FlightClassType;
}

//#region
/**
 * The complete route between the start location
 * and the end destination(which may involve stops).
 * 
 * If a the flight reservation is "round-trip", then 
 * the flight will have two itineraries; if the 
 * reservation is "one-way", then it will have one.  
 *
 */
//#endregion
export interface FlightItinerary {
  segments: FlightSegment[];
  duration: string;
}

/**
 * A route between two places.
 * 
 * If an itinerary has several segments,
 * then it means that the flight has stops. 
 * 
 * Example(one-way flight): 
 *  - Itinerary: Go from A to C
 *  - Segments: A - B and then, B - C
 */
export interface FlightSegment {
  departure: DepartArrive;
  arrival: DepartArrive;
  carrier: string;
  duration: string;
}

export interface DepartArrive {
  iata: string;
  city: string;
  terminal: string;
  at: Date;
}

export interface FlightPrice {
  currency: string;
  total: number;
}
