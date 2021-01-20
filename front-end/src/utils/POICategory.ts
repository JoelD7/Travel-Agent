import { faFortAwesome } from "@fortawesome/free-brands-svg-icons";
import {
  faDumbbell,
  faFutbol,
  faGlassCheers,
  faGlassMartiniAlt,
  faLandmark,
  faMountain,
  faMusic,
  faPaw,
  faShoppingBag,
  faSkiing,
  faTheaterMasks,
  faTicketAlt,
  faTshirt,
  faUmbrellaBeach,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface POICategory {
  name: string;
  parent: string;
  icon: IconDefinition;
  code: string;
  image: string;
  pluralName: string;
}

export enum POICategoryParent {
  ArtsEntertainment = "Arts & entertainment",
  Nightlife = "Nightlife",
  OutdoorsRec = "Outdoors & recreation",
  ShopService = "Shopping & service",
}

export const TOURS = "Tours and activities";
export type TOURS = typeof TOURS;

export const HistoricSite: POICategory = {
  pluralName: "Historic Sites",
  name: "Historic Site",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faLandmark,
  code: "4deefb944765f83613cdba6e",
  image: "",
};

export const MovieTheater: POICategory = {
  pluralName: "Movie Theaters",
  name: "Movie Theater",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faTicketAlt,
  code: "4bf58dd8d48988d17f941735",
  image: "",
};

export const Museum: POICategory = {
  pluralName: "Museums",
  name: "Museum",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faLandmark,
  code: "4bf58dd8d48988d181941735",
  image: "",
};

export const MusicVenue: POICategory = {
  pluralName: "Music Venues",
  name: "Music Venue",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faMusic,
  code: "4bf58dd8d48988d1e5931735",
  image: "",
};

export const Theater: POICategory = {
  pluralName: "Theaters",
  name: "Theater",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faTheaterMasks,
  code: "4bf58dd8d48988d137941735",
  image: "",
};

export const Stadium: POICategory = {
  pluralName: "Stadiums",
  name: "Stadium",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faFutbol,
  code: "4bf58dd8d48988d184941735",
  image: "",
};

export const ThemePark: POICategory = {
  pluralName: "Theme Parks",
  name: "Theme Park",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faFortAwesome,
  code: "4bf58dd8d48988d182941735",
  image: "",
};

export const Zoo: POICategory = {
  pluralName: "Zoos",
  name: "Zoo",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faPaw,
  code: "4bf58dd8d48988d17b941735",
  image: "",
};

export const Bar: POICategory = {
  pluralName: "Bars",
  name: "Bar",
  parent: POICategoryParent.Nightlife,
  icon: faGlassMartiniAlt,
  code: "4bf58dd8d48988d116941735",
  image: "",
};

export const Nightclub: POICategory = {
  pluralName: "Nightclubs",
  name: "Nightclub",
  parent: POICategoryParent.Nightlife,
  icon: faGlassCheers,
  code: "4bf58dd8d48988d11f941735",
  image: "",
};

export const GymFitness: POICategory = {
  pluralName: "Gym / Fitness Centers",
  name: "Gym / Fitness Center",
  parent: POICategoryParent.OutdoorsRec,
  icon: faDumbbell,
  code: "4bf58dd8d48988d175941735",
  image: "",
};

export const Beach: POICategory = {
  pluralName: "Beaches",
  name: "Beach",
  parent: POICategoryParent.OutdoorsRec,
  icon: faUmbrellaBeach,
  code: "4bf58dd8d48988d1e2941735",
  image: "",
};

export const NationalPark: POICategory = {
  pluralName: "National Parks",
  name: "National Park",
  parent: POICategoryParent.OutdoorsRec,
  icon: faMountain,
  code: "52e81612bcbc57f1066b7a21",
  image: "",
};

export const SkiArea: POICategory = {
  pluralName: "Ski Areas",
  name: "Ski Area",
  parent: POICategoryParent.OutdoorsRec,
  icon: faSkiing,
  code: "4bf58dd8d48988d1e9941735",
  image: "",
};

export const ClothingStore: POICategory = {
  pluralName: "Clothing Stores",
  name: "Clothing Store",
  parent: POICategoryParent.ShopService,
  icon: faTshirt,
  code: "4bf58dd8d48988d103951735",
  image: "",
};

export const ShoppingMall: POICategory = {
  pluralName: "Shopping Malls",
  name: "Shopping Mall",
  parent: POICategoryParent.ShopService,
  icon: faShoppingBag,
  code: "4bf58dd8d48988d1fd941735",
  image: "",
};

export const POICategoryMap: { [index: string]: POICategory } = {
  "Historic Site": HistoricSite,
  "Movie Theater": MovieTheater,
  Museum: Museum,
  "Music Venue": MusicVenue,
  Theater: Theater,
  Stadium: Stadium,
  "Theme Park": ThemePark,
  Zoo: Zoo,
  Bar: Bar,
  Nightclub: Nightclub,
  "Gym / Fitness Center": GymFitness,
  Beach: Beach,
  "National Park": NationalPark,
  "Ski Area": SkiArea,
  "Clothing Store": ClothingStore,
  "Shopping Mall": ShoppingMall,
};

export const POICategories: POICategory[] = [
  HistoricSite,
  MovieTheater,
  Museum,
  MusicVenue,
  Theater,
  Stadium,
  ThemePark,
  Zoo,
  Bar,
  Nightclub,
  GymFitness,
  Beach,
  NationalPark,
  SkiArea,
  ClothingStore,
  ShoppingMall,
];
