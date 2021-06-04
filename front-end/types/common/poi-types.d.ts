interface RsvPOI {
  id: string;
  name: string;
  rating: number;
  category: string;
  categoryIconUrl: string;
  visitDate: string;
  imageUrl: string;
  formattedAddress: string;
}

interface POIType {
  id: string;
  name: string;
  contact: POIContact;
  favorite: boolean;
  location: POILocation;
  categories: POICategory[];
  description?: string;
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
  contact?: POIContact;
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
  icon: POICategoryIcon;
}

interface POICategoryIcon {
  prefix: string;
  suffix: string;
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
