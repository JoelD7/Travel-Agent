/**
 * Restaurant that has been added to
 * a trip. This is the model that will
 * be used by the database.
 */
interface RsvRestaurant {
  idRestaurant: number | null;
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  displayAddress: string;
  cuisines: string;
  visitDate: string;
}

interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  url: string;
  favorite: boolean;
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

interface RestaurantCuisine {
  title: string;
  alias: string;
  checked: boolean;
}

interface RestaurantFilterParams {
  cuisines: RestaurantCuisine[];
}
