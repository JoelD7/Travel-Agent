import { Amenity } from "../HotelAmenities";

export interface HotelOffer {
  hotel: Hotel;
  offers: Offer[];
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

export interface Hotel {
  hotelId: string;
  /**
   * Unique Property identifier of the physical hotel.
    One physical hotel can be represented by different 
    Providers, each one having its own hotelID. This 
    attribute allows a client application to group 
    together hotels that are actually the same.
   */
  dupeId: string;
  name: string;
  rating: string;
  cityCode: string;
  latitude: number;
  longitude: number;
  amenities: Amenity[];
  address: {
    lines: string[];
    cityName: string;
    countryCode: string; //ISO 3166-1
    postalCode?: string;
  };
  contact: {
    phone: string;
    fax?: string;
    email?: string;
  };
  media: HotelMedia[];
}

interface HotelMedia {
  uri: string;
  category: string;
}
