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

export interface HotelBooking {
  checkIn?: string;
  checkOut?: string;
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
  city: {
    content: string;
  };
  //stars
  categoryCode: string;
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
  rooms: HotelRooms[];
}

export interface HotelRooms {
  id?: string; //Room reservation identifier.
  code: string; //Internal room code
  name: string;
  rates: HotelRoomRate[];
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

export interface HotelDetails {
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

interface HotelRoom {
  typeEstimated: {
    category: string;
    beds?: number;
    bedType?: string;
  };
  description: {
    text: string;
  };
}

interface HotelImage {
  order: number;
  path: string;
  visualOrder: number;
}
