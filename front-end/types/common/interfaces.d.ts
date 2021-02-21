interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  url: string;
  categories: {
    alias: string;
    title: string;
  }[];
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  location: {
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: string[];
  };
  phone: string;
  display_phone: string;
  photos: string[];
  transactions: string[];
  hours: {
    open: RestaurantHour[];
  }[];
}

interface RestaurantHour {
  is_overnight: boolean;
  start: string;
  end: string;
  day: number;
}

interface RestaurantSearch {
  id: string;
  name: string;
  image_url: string;
  url: string;
  categories: {
    alias: string;
    title: string;
  }[];
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  location: {
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: string[];
  };
  phone: string;
  transactions: string[];
  display_phone: string;
}

interface RestaurantCategories {
  alias: string;
  title: string;
  parent_aliases: string[];
  country_whitelist: string[];
  country_blacklist: string[];
}

interface ResLocation {
  address: string;
  locality: string;
  city: string;
  cityID: number;
  latitude: string;
  longitude: string;
  zipcode: string;
  countryID: number;
}

interface RestaurantFilter {
  name: string;
  checked: boolean;
}

interface ExchangeRate {
  lastUpdated: number;
  base: string;
  rates: {
    [key: string]: number;
  };
  [key: string]: ExchangeRate[keyof ExchangeRate];
}

interface HotelReservation {
  id: string;
  name: string;
  picture: string;
  stars: number;
  adults: number;
  children: number;
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  cost: number;
}

/**
 * Type of event of the select element.
 */
interface SelectEvent {
  name?: string | undefined;
  value: unknown;
}
