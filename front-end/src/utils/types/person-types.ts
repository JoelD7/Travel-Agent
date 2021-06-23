import { CarRsv } from "./car-types";
import { Favorite } from "./favorite-types";
import { HotelReservation } from "./hotel-types";
import { Trip } from "./trip-types";

export interface Person {
  carRentals: CarRsv[];
  email: string;
  favoritePlaces: Favorite[];
  firstName: string;
  flights: Flight[];
  hotelReservations: HotelReservation[];
  idPerson: number;
  uuid: string;
  lastName: string;
  profilePic: string;
  trips: Trip[];
}

export interface ProfileCredentials {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  origin: string;
  profilePic: string | null;
  curPassword: string | null;
  newPassword: string | null;
  newPasswordConfirmation: string;
}
