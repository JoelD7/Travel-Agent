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

interface POI {
  id: string;
  name: string;
  contact: POIContact;
  location: POILocation;
  categories: POICategory[];
  url: string;
  rating: number; //1-10
  photos: POIPhotos;
  hours: POIHours;
  bestPhoto: POIPhotoItems;
  attributes: POIAttributes;
}

interface POIAttributes{
  groups: POIAttributesGroup[]
}

interface POIAttributesGroup{
  name: string;
}

interface POIHours{
  timeframes: POITimeFrames[];
}

interface POITimeFrames{
  days: string;
  open: POIOpenTimes[]
}

interface POIOpenTimes{
  renderedTime: string;
}

interface POIPhotos {
  groups: POIPhotoGroup[];
}

interface POIPhotoGroup {
  items: POIPhotoItems[];
}

interface POIPhotoItems {
  prefix: string;
  suffix: string;
  width: number;
  height: number;
}

interface POISearch {
  id: string;
  name: string;
  contact: POIContact;
  location: POILocation;
  categories: POICategory[];
}

interface POIContact {
  phone?: string;
  formattedPhone?: string;
  twitter?: string;
  facebookName?: string;
}

interface POILocation {
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

interface POICategory {
  id: string;
  name: string;
  pluralName: string;
  shortName: string;
}
