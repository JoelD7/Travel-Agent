interface POI {
  id: string;
  name: string;
  contact: POIContact;
  location: POILocation;
  categories: POICategory[];
  url: string;
  rating: number; //1-10
  photos?: POIPhotos;
  hours: POIHours;
  bestPhoto: POIPhotoItems;
  attributes: POIAttributes;
}

interface POIAttributes {
  groups: POIAttributesGroup[];
}

interface POIAttributesGroup {
  name: string;
}

interface POIHours {
  timeframes: POITimeFrames[];
}

interface POITimeFrames {
  days: string;
  open: POIOpenTimes[];
}

interface POIOpenTimes {
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
  photo?: string;
  rating?: number;
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

interface Activity {
  name: string;
  shortDescription: string;
  rating: string;
  pictures: string[];
  bookingLink: string;
  price: ActivityPrice;
}

interface ActivityPrice {
  currencyCode: string;
  amount: string;
}
