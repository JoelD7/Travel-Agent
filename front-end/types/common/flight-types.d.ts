interface Flight {
  id: string;
  idFlight: string;
  itineraries: FlightItinerary[];
  price: FlightPrice;
  travelerPricings: FlightTravelerPricing[];
  class: FlightClassType;
}

const Economy = "ECONOMY";
type Economy = typeof Economy;

const PremiumEconomy = "PREMIUM_ECONOMY";
type PremiumEconomy = typeof PremiumEconomy;

const Business = "BUSINESS";
type Business = typeof Business;

const First = "FIRST";
type First = typeof First;

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
  departure: PlaceRelation;
  arrival: PlaceRelation;
  carrierCode: string;
  duration: string;
}

interface PlaceRelation {
  iataCode: string;
  city: string;
  terminal: string;
  at: string;
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
  departureDatetimeRange: Date[];
  arrivalDatetimeRange: Date[];
}

interface FlightDeal {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: {
    currency: string;
    total: string;
  };
  links: {
    flightOffers: string;
  };
}

interface FlightDictionary {
  carriers: { [x: string]: string };
}

interface FlightTravelerPricing {
  fareDetailsBySegment: FlightFareSegment[];
}

interface FlightFareSegment {
  cabin: string;
}

const ROUND = "Round trip";
const ONE_WAY = "One way";

type FlightType = typeof ROUND | typeof ONE_WAY;
