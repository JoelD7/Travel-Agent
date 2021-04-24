import * as EventType from "./event-types";
import { HotelAvailability } from "./hotel-types";

export interface Trip {
  id: string;
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
  name: string;
  location: string;
  type: EventType.EventType;
  start: Date;
  end: Date;
  time: boolean; //whether the date of the event includes time
  detail: Flight | HotelAvailability | Restaurant | POI;
}

interface TripAlbum {
  name: string;
  cover: string;
  albumRoute: string;
  photos: string[];
}

export interface CalendarItem {
  day: number;
  active: boolean;
  grid: number;
  date: Date;
  tripDay: boolean;
}
