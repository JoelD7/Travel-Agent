import { Hotel } from "./Hotel";
import * as EventType from "./EventType";

export interface Trip {
  id: string;
  name: string;
  countries: string[];
  photos: number;
  places: number;
  days: number;
  startDate: Date;
  endDate: Date;
  coverPhoto: string;
  albums: TripAlbum[];
  itinerary?: TripEvent[];
}

export interface TripEvent {
  type: EventType.EventType;
  start: Date;
  end: Date;
  detail: Flight | Hotel | Restaurant | POI;
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
