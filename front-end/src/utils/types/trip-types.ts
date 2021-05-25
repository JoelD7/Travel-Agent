import { CarRsv } from "./car-types";
import * as EventType from "./event-types";
import { HotelReservation } from "./hotel-types";

export interface Trip {
  idTrip: string;
  name: string;
  countries: string[];
  photosQty: number;
  places: number;
  budget: number;
  days: number;
  startDate: Date;
  endDate: Date;
  coverPhoto: string;
  albums: TripAlbum[];
  itinerary?: TripEvent[];
}

export interface TripEvent {
  idTripEvent?: number;
  name: string;
  location: string;
  type: EventType.EventType;
  start: Date;
  end: Date;
  includesTime: boolean; //whether the date of the event includes time
  flight?: Flight | null;
  hotelReservation?: HotelReservation | null;
  restaurant?: RsvRestaurant | null;
  poi?: RsvPOI | null;
  carRental?: CarRsv | null;
}

export interface TripAlbum {
  id: string;
  name: string;
  cover: string;
  pictures: TripPictures[];
}

export interface TripPictures {
  id: string;
  picture: string;
  date: Date;
}

export interface CalendarItem {
  day: number;
  active: boolean;
  grid: number;
  date: Date;
  tripDay: boolean;
}
