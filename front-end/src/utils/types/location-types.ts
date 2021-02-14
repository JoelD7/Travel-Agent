export interface AirportCitySearch {
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
