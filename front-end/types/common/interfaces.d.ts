interface Queso {
  type: string;
  color: string;
}

interface Restaurant {
  id: string;
  name: string;
  url: string;
  location: ResLocation;
  cuisines: string;
  timings: string;
  avgCostForTwo: number;
  priceRange: number;
  currency: string;
  highlights: string[]; //Amenities
  thumb: string;
  rating: number;
  ratingText: string;
  photosURL: string; //Url to Zomato page with photos
  menuURL: string; //Url to Zomato page with menu
  featuredImage: string; //Main pic
  phoneNumbers: string;
  establishment: string[]; //Establisment types
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
  id: number;
  name: string;
  checked: boolean;
}

interface POISearch{
  id: string;
  name: string;
  contact: POISearchContact;
  location: POISearchLocation;
  categories: POISearchCategory[];
}

interface POISearchContact{
  phone?: string;
  formattedPhone?: string;
  twitter?: string;
  facebookName?:string;
}

interface POISearchLocation{
    address?: string;
    crossStreet?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    lat: number;
    lng: number;
    distance: number;
    formattedAddress?: string[];
}

interface POISearchCategory{
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
}
