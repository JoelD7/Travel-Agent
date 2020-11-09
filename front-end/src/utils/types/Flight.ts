import { FlightClassType } from "./FlightClassType";

export interface Flight {
  segments: FlightSegment[];
  price: FlightPrice;
  class: FlightClassType;
}

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
