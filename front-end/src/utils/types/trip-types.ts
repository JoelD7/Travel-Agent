import { CarRsv } from "./car-types";
import * as EventType from "./event-types";
import { HotelReservation } from "./hotel-types";

export interface Trip {
  idTrip: string;
  uuid: string;
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
  idEvent?: number;
  uuid: string;
  location: string;
  type: EventType.EventType;
  start: string;
  end: string;
  includesTime: boolean; //whether the date of the event includes time
  flight?: Flight | null;
  hotelReservation?: HotelReservation | null;
  restaurant?: RsvRestaurant | null;
  poi?: RsvPOI | null;
  carRental?: CarRsv | null;
}

export interface TripAlbum {
  idAlbum: string | null;
  uuid: string;
  name: string;
  cover: string;
  pictures: AlbumPicture[];
}

export interface AlbumPicture {
  idPicture: string | null;
  name: string;
  pictureUrl: string;
  date: string;
}

export interface CalendarItem {
  day: number;
  active: boolean;
  grid: number;
  date: Date;
  tripDay: boolean;
}
