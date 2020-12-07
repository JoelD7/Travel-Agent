interface Flight {
  itineraries: FlightItinerary[];
  price: FlightPrice;
  class: FlightClassType;
}

const Economy = "Economy";
type Economy = typeof Economy;

const PremiumEconomy = "Premium Economy";
type PremiumEconomy = typeof PremiumEconomy;

const Business = "Business";
type Business = typeof Business;

const First = "First";
type First = typeof First;

const flightClasses = [Economy, PremiumEconomy, Business, First];

type FlightClassType = Economy | PremiumEconomy | Business | First | "";

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
interface FlightItinerary {
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
interface FlightSegment {
  departure: DepartArrive;
  arrival: DepartArrive;
  carrier: string;
  duration: string;
}

interface DepartArrive {
  iata: string;
  city: string;
  terminal: string;
  at: Date;
}

interface FlightPrice {
  currency: string;
  total: number;
}

interface DatetimeRange {
  maxDeparture: Date;
  minDeparture: Date;
  maxArrival: Date;
  minArrival: Date;
  departureDatetimeRange?: Date[];
  arrivalDatetimeRange?: Date[];
}

const ROUND = "Round trip";
const ONE_WAY = "One way";

type FlightType = typeof ROUND | typeof ONE_WAY;
