export interface AirportCity {
  subType: string;
  name: string;
  id: string;
  timeZoneOffset: string;
  iataCode: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
  };
  analytics: {
    travelers: {
      score: number;
    };
  };
}

export interface IATALocation {
  code: string;
  lat: string;
  lon: string;
  name: string;
  city: string;
  state: string | null;
  country: string;
  woeid: string;
  tz: string;
  phone: string;
  type: string;
  email: string;
  url: string;
  runway_length: string | null;
  elev: string | null;
  icao: string;
  direct_flights: string;
  carriers: string;
}
