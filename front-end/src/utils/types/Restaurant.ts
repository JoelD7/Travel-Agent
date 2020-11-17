export interface Restaurant {
  id: string;
  name: string;
  url: string;
  location: ResLocation;
  cuisines: string;
  timings: string;
  avgCostForTwo: number;
  priceRange: number;
  currency: string;
  highlights: string[];
  thumb: string;
  rating: string;
  ratingText: string;
  photosURL: string;
  menuURL: string;
  featuredImage: string;
  phoneNumbers: string;
  establishment: string[];
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
