import {
  faBabyCarriage,
  faBan,
  faBed,
  faBeer,
  faChild,
  faCity,
  faDice,
  faDumbbell,
  faEye,
  faGlassMartiniAlt,
  faGolfBall,
  faHandshake,
  faHotTub,
  faParking,
  faPaw,
  faShieldAlt,
  faShuttleVan,
  faSnowflake,
  faSpa,
  faSun,
  faSwimmer,
  faTableTennis,
  faTv,
  faUmbrellaBeach,
  faUtensils,
  faWheelchair,
  faWifi,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

export interface Amenity {
  key: string;
  value: string;
  checked: boolean;
  icon: IconDefinition;
}
export const SPA: Amenity = {
  //faSpa
  key: "SPA",
  value: "Spa",
  checked: false,
  icon: faSpa,
};
export const SWIMMING_POOL: Amenity = {
  //faSwimmer
  key: "SWIMMING_POOL",
  value: "Swimming pool",
  checked: false,
  icon: faSwimmer,
};
export const FITNESS_CENTER: Amenity = {
  //faDumbbell
  key: "FITNESS_CENTER",
  value: "Fitness enter",
  checked: false,
  icon: faDumbbell,
};
export const AIR_CONDITIONING: Amenity = {
  //faSnowflake
  key: "AIR_CONDITIONING",
  value: "Air conditioning",
  checked: false,
  icon: faSnowflake,
};
export const RESTAURANT: Amenity = {
  //faUtensils
  key: "RESTAURANT",
  value: "Restaurant",
  checked: false,
  icon: faUtensils,
};
export const PARKING: Amenity = {
  //faParking
  key: "PARKING",
  value: "Parking",
  checked: false,
  icon: faParking,
};
export const PETS_ALLOWED: Amenity = {
  //faPaw
  key: "PETS_ALLOWED",
  value: "Pets allowed",
  checked: false,
  icon: faPaw,
};
export const AIRPORT_SHUTTLE: Amenity = {
  //faShuttleVan
  key: "AIRPORT_SHUTTLE",
  value: "Airport shuttle",
  checked: false,
  icon: faShuttleVan,
};
export const BUSINESS_CENTER: Amenity = {
  key: "BUSINESS_CENTER",
  value: "Business Center",
  checked: false,
  icon: faCity,
};
export const DISABLED_FACILITIES: Amenity = {
  key: "DISABLED_FACILITIES",
  value: "Disabled facilities",
  checked: false,
  icon: faWheelchair,
};
export const WIFI: Amenity = {
  key: "WIFI",
  value: "Wi-fi",
  checked: false,
  icon: faWifi,
};
export const MEETING_ROOMS: Amenity = {
  key: "MEETING_ROOMS",
  value: "Meeting rooms",
  checked: false,
  icon: faHandshake,
};
export const NO_KID_ALLOWED: Amenity = {
  key: "NO_KID_ALLOWED",
  value: "No kids allowed",
  checked: false,
  icon: faBan,
};
export const TENNIS: Amenity = {
  key: "TENNIS",
  value: "Tennis",
  checked: false,
  icon: faTableTennis,
};
export const GOLF: Amenity = {
  key: "GOLF",
  value: "Golf",
  checked: false,
  icon: faGolfBall,
};
export const KITCHEN: Amenity = {
  key: "KITCHEN",
  value: "Kitchen",
  checked: false,
  icon: faUtensils,
};
export const ANIMAL_WATCHING: Amenity = {
  key: "ANIMAL_WATCHING",
  value: "Animal watching",
  checked: false,
  icon: faEye,
};
export const BABY_SITTING: Amenity = {
  key: "BABY_SITTING",
  value: "Baby sitting",
  checked: false,
  icon: faBabyCarriage,
};
export const BEACH: Amenity = {
  key: "BEACH",
  value: "Beach",
  checked: false,
  icon: faUmbrellaBeach,
};
export const CASINO: Amenity = {
  key: "CASINO",
  value: "Casino",
  checked: false,
  icon: faDice,
};
export const JACUZZI: Amenity = {
  key: "JACUZZI",
  value: "Jacuzzi",
  checked: false,
  icon: faHotTub,
};
export const SAUNA: Amenity = {
  key: "SAUNA",
  value: "Sauna",
  checked: false,
  icon: faHotTub,
};
export const SOLARIUM: Amenity = {
  key: "SOLARIUM",
  value: "Solarium",
  checked: false,
  icon: faSun,
};
export const MASSAGE: Amenity = {
  key: "MASSAGE",
  value: "Massage",
  checked: false,
  icon: faSpa,
};
export const VALET_PARKING: Amenity = {
  key: "VALET_PARKING",
  value: "Valet parking",
  checked: false,
  icon: faParking,
};
export const BAR: Amenity = {
  key: "BAR",
  value: "Bar",
  checked: false,
  icon: faGlassMartiniAlt,
};
export const KIDS_WELCOME: Amenity = {
  key: "KIDS_WELCOME",
  value: "Kids welcome",
  checked: false,
  icon: faChild,
};
export const NO_PORN_FILMS: Amenity = {
  key: "NO_PORN_FILMS",
  value: "No porn films",
  checked: false,
  icon: faBan,
};
export const MINIBAR: Amenity = {
  key: "MINIBAR",
  value: "Minibar",
  checked: false,
  icon: faBeer,
};
export const TELEVISION: Amenity = {
  key: "TELEVISION",
  value: "Television",
  checked: false,
  icon: faTv,
};
export const WI_FI_IN_ROOM: Amenity = {
  key: "WI_FI_IN_ROOM",
  value: "Wi-fi in room",
  checked: false,
  icon: faWifi,
};
export const ROOM_SERVICE: Amenity = {
  key: "ROOM_SERVICE",
  value: "Room service",
  checked: false,
  icon: faBed,
};
export const GUARDED_PARKG: Amenity = {
  key: "GUARDED_PARKG",
  value: "Guarded parking",
  checked: false,
  icon: faShieldAlt,
};
export const SERV_SPEC_MEN: Amenity = {
  key: "SERV_SPEC_MEN",
  value: "Serve special menu",
  checked: false,
  icon: faUtensils,
};

export const AmenitiesList: Amenity[] = [
  SPA,
  SWIMMING_POOL,
  FITNESS_CENTER,
  AIR_CONDITIONING,
  RESTAURANT,
  PARKING,
  PETS_ALLOWED,
  AIRPORT_SHUTTLE,
  BUSINESS_CENTER,
  DISABLED_FACILITIES,
  WIFI,
  MEETING_ROOMS,
  NO_KID_ALLOWED,
  TENNIS,
  GOLF,
  KITCHEN,
  ANIMAL_WATCHING,
  BABY_SITTING,
  BEACH,
  CASINO,
  JACUZZI,
  SAUNA,
  SOLARIUM,
  MASSAGE,
  VALET_PARKING,
  BAR,
  KIDS_WELCOME,
  NO_PORN_FILMS,
  MINIBAR,
  TELEVISION,
  WI_FI_IN_ROOM,
  ROOM_SERVICE,
  GUARDED_PARKG,
  SERV_SPEC_MEN,
];
