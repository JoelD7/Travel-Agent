import {
  faBabyCarriage,
  faBan,
  faBed,
  faBeer,
  faChild,
  faCity,
  faComments,
  faDice,
  faDumbbell,
  faEye,
  faGlassMartiniAlt,
  faGolfBall,
  faHandshake,
  faHotTub,
  faIgloo,
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
  faToilet,
  faCar,
  faArrowCircleUp,
  faHandHoldingUsd,
  faSoap,
  faCut,
  faPiggyBank,
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
export const HANDICAP_FAC: Amenity = {
  key: "HANDICAP_FAC",
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

export const CONVENTION_CTR: Amenity = {
  key: "CONVENTION_CTR",
  value: "Convention center",
  checked: false,
  icon: faComments,
};

export const ICE_MACHINES: Amenity = {
  key: "ICE_MACHINES",
  value: "Ice machines",
  checked: false,
  icon: faIgloo,
};

export const ACC_TOILETS: Amenity = {
  key: "ACC_TOILETS",
  value: "Accesible toilets",
  checked: false,
  icon: faToilet,
};

export const DIS_PARKG: Amenity = {
  key: "DIS_PARKG",
  value: "Parking for disabled",
  checked: false,
  icon: faWheelchair,
};

export const BEAUTY_PARLOUR: Amenity = {
  key: "BEAUTY_PARLOUR",
  value: "Beauty parlour",
  checked: false,
  icon: faCut,
};

export const CAR_RENTAL: Amenity = {
  key: "CAR_RENTAL",
  value: "Car rental",
  checked: false,
  icon: faCar,
};

export const ELEVATOR: Amenity = {
  key: "ELEVATOR",
  value: "Elevator",
  checked: false,
  icon: faArrowCircleUp,
};

export const EXCHANGE_FAC: Amenity = {
  key: "EXCHANGE_FAC",
  value: "Exchange facility",
  checked: false,
  icon: faHandHoldingUsd,
};

export const LAUNDRY_SVC: Amenity = {
  key: "LAUNDRY_SVC",
  value: "Laundry service",
  checked: false,
  icon: faSoap,
};

export const HAIRDRESSER: Amenity = {
  key: "HAIRDRESSER",
  value: "Hairdresser",
  checked: false,
  icon: faCut,
};

export const HAIR_DRYER: Amenity = {
  key: "HAIR_DRYER",
  value: "Hair dryer",
  checked: false,
  icon: faCut,
};

export const MOVIE_CHANNELS: Amenity = {
  key: "MOVIE_CHANNELS",
  value: "Movie channels",
  checked: false,
  icon: faTv,
};

export const SAFE_DEP_BOX: Amenity = {
  key: "SAFE_DEP_BOX",
  value: "Safe box",
  checked: false,
  icon: faPiggyBank,
};

export const AmenitiesList: Amenity[] = [
  ACC_TOILETS,
  AIRPORT_SHUTTLE,
  AIR_CONDITIONING,
  ANIMAL_WATCHING,
  BABY_SITTING,
  BAR,
  BEACH,
  BEAUTY_PARLOUR,
  BUSINESS_CENTER,
  CAR_RENTAL,
  CASINO,
  CONVENTION_CTR,
  DISABLED_FACILITIES,
  DIS_PARKG,
  ELEVATOR,
  EXCHANGE_FAC,
  FITNESS_CENTER,
  GOLF,
  GUARDED_PARKG,
  HAIRDRESSER,
  HAIR_DRYER,
  ICE_MACHINES,
  JACUZZI,
  KIDS_WELCOME,
  KITCHEN,
  LAUNDRY_SVC,
  MASSAGE,
  MEETING_ROOMS,
  MINIBAR,
  MOVIE_CHANNELS,
  NO_KID_ALLOWED,
  NO_PORN_FILMS,
  PARKING,
  PETS_ALLOWED,
  RESTAURANT,
  ROOM_SERVICE,
  SAFE_DEP_BOX,
  SAUNA,
  SERV_SPEC_MEN,
  SOLARIUM,
  SPA,
  SWIMMING_POOL,
  TELEVISION,
  TENNIS,
  VALET_PARKING,
  WIFI,
  WI_FI_IN_ROOM,
];

export const amenitiesMap: { [index: string]: Amenity } = {
  ACC_TOILETS: ACC_TOILETS,
  AIRPORT_SHUTTLE: AIRPORT_SHUTTLE,
  AIR_CONDITIONING: AIR_CONDITIONING,
  ANIMAL_WATCHING: ANIMAL_WATCHING,
  BABY_SITTING: BABY_SITTING,
  BAR: BAR,
  BEACH: BEACH,
  BEAUTY_PARLOUR: BEAUTY_PARLOUR,
  BUSINESS_CENTER: BUSINESS_CENTER,
  CAR_RENTAL: CAR_RENTAL,
  CASINO: CASINO,
  CONVENTION_CTR: CONVENTION_CTR,
  DISABLED_FACILITIES: DISABLED_FACILITIES,
  DIS_PARKG: DIS_PARKG,
  ELEVATOR: ELEVATOR,
  EXCHANGE_FAC: EXCHANGE_FAC,
  FITNESS_CENTER: FITNESS_CENTER,
  GOLF: GOLF,
  GUARDED_PARKG: GUARDED_PARKG,
  HAIRDRESSER: HAIRDRESSER,
  HAIR_DRYER: HAIR_DRYER,
  ICE_MACHINES: ICE_MACHINES,
  JACUZZI: JACUZZI,
  KIDS_WELCOME: KIDS_WELCOME,
  KITCHEN: KITCHEN,
  LAUNDRY_SVC: LAUNDRY_SVC,
  MASSAGE: MASSAGE,
  MEETING_ROOMS: MEETING_ROOMS,
  MINIBAR: MINIBAR,
  MOVIE_CHANNELS: MOVIE_CHANNELS,
  NO_KID_ALLOWED: NO_KID_ALLOWED,
  NO_PORN_FILMS: NO_PORN_FILMS,
  PARKING: PARKING,
  PETS_ALLOWED: PETS_ALLOWED,
  RESTAURANT: RESTAURANT,
  ROOM_SERVICE: ROOM_SERVICE,
  SAFE_DEP_BOX: SAFE_DEP_BOX,
  SAUNA: SAUNA,
  SERV_SPEC_MEN: SERV_SPEC_MEN,
  SOLARIUM: SOLARIUM,
  SPA: SPA,
  SWIMMING_POOL: SWIMMING_POOL,
  TELEVISION: TELEVISION,
  TENNIS: TENNIS,
  VALET_PARKING: VALET_PARKING,
  WIFI: WIFI,
  WI_FI_IN_ROOM: WI_FI_IN_ROOM,
};
