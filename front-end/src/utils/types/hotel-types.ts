import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Amenity } from "../HotelAmenities";

export interface HotelBookingRequest {
  stay: {
    checkIn: string;
    checkOut: string;
  };
  filters?: {
    minRate: number;
    maxRate: number;
  };
  occupancies: {
    rooms: number;
    adults: number;
    children: number;
  }[];
}

export interface HotelAvailability {
  checkIn: string;
  checkOut: string;
  hotels: HotelBooking[];
}

//Information about a hotel reservation.
export interface HotelReservation {
  hotelCode: number;
  name: string;
  checkIn: Date;
  checkOut: Date;
  stars: number;
  adults: number;
  children: number;
  address: string;
  phoneNumber: string;
  rooms: HotelRoom[];
}

//Information about a hotel in relation to booking parameters.
export interface HotelBooking {
  checkIn?: string;
  checkOut?: string;
  favorite: boolean;
  code: number;
  name: {
    content: string;
  };
  destinationName: string;
  latitude: string;
  longitude: string;
  minRate: number;
  maxRate: number;
  totalNet?: number;
  currency: string;
  cancellationAmount?: number;
  countryCode: string;
  stateCode?: string;
  S2C: string;
  city: {
    content: string;
  };
  //stars
  categoryCode: string;
  category: {
    code: string;
  };
  categoryName: string;
  description: {
    content: string;
  };
  address: {
    content: string;
  };
  email: string;
  phones: {
    phoneNumber: string;
  }[];
  images: HotelImage[];
  rooms: HotelRoom[];
}

export interface HotelCoordinates {
  longitude: number;
  latitude: number;
}

export interface HotelRoom {
  id?: string; //Room reservation identifier.
  code: string; //Internal room code
  name: string;
  image?: string;
  cost?: number;
  rates: HotelRoomRate[];
}

export interface HotelBookingParams {
  id: string;
  stay: {
    checkIn: Date;
    checkOut: Date;
  };
  occupancies: {
    [rooms: string]: number | HotelPax[];
    adults: number;
    children: number;
    paxes: HotelPax[];
  }[];

  geolocation: {
    longitude: number;
    latitude: number;
    radius: number;
    unit: string;
  };
  filter?: {
    maxHotels: number;
    //stars
    minCategory: number;
    minRate: number;
  };
}

export interface HotelRoomRate {
  net: string;
  boardName: string;
  taxes?: {
    taxes: {
      amount: string;
      currency: string;
      clientAmount: string;
      clientCurrency: string;
    }[];
  };
  rooms: number;
  adults: number;
  children: number;
  offers?: HotelRateOffer[];
}

export interface HotelRateOffer {
  code: string;
  name: string;
  amount: string;
}

export interface HotelPax {
  type: "AD" | "CH";
  age: number;
}

export interface HotelSearch {
  checkIn: MaterialUiPickersDate;
  checkOut: MaterialUiPickersDate;
  adults: number;
  children: number;
  paxes: HotelPax[];
  rooms: number;
  priceRange: number[];
  stars: number;
  occupancyParamsChanged: boolean;
  [key: string]: HotelSearch[keyof HotelSearch];
}

/**
 * Information about a hotel, not including booking
 * parameters.
 */
export interface HotelDetail {
  code: number;
  name: {
    content: string;
  };
  countryCode: string;
  stateCode?: string;
  city: {
    content: string;
  };
  //stars
  categoryCode: string;
  categoryName?: string;
  description: {
    content: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: {
    content: string;
  };
  email: string;
  phones: {
    phoneNumber: string;
  }[];
  images: HotelImage[];
}

export interface Occupancy {
  label: string;
  field: string;
  icon: IconDefinition;
  values: number[];
}

export interface Offer {
  id: string;
  room: HotelRoom;
  guests: {
    adults: number;
    /**
     * Comma separated list of ages of each child
     * at the time of check-out from the hotel. If
     * several children have the same age, the
     * ages will be repeated.
     */
    childAges?: string[];
  };
  price: {
    currency: string;
    total: string;
  };
}

export interface HotelImage {
  order: number;
  path: string;
  visualOrder: number;
  roomCode: string;
}
