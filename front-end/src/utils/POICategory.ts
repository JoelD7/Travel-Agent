import { faFortAwesome } from "@fortawesome/free-brands-svg-icons";
import {
  faDumbbell,
  faFutbol,
  faGlassCheers,
  faGlassMartiniAlt,
  faHiking,
  faLandmark,
  faMagic,
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

export interface POICategorySearch {
  name: string;
  parent?: string;
  icon: IconDefinition;
  id: string;
  image: string;
  pluralName: string;
}

export enum POICategoryParent {
  ArtsEntertainment = "Arts & Entertainment",
  Nightlife = "Nightlife Spot",
  OutdoorsRec = "Outdoors & recreation",
  ShopService = "Shopping & service",
}

export const TOURS = "Tours and activities";
export type TOURS = typeof TOURS;

export const TOUR: POICategorySearch = {
  pluralName: "Tours and activities",
  name: "Tours and activities",
  icon: faMagic,
  id: "4d4b7104d754a06370d81259",
  image: "",
};

export const ArtsEntertainment: POICategorySearch = {
  pluralName: "Arts & Entertainment",
  name: "Arts & Entertainment",
  icon: faMagic,
  id: "4d4b7104d754a06370d81259",
  image: "/Travel-Agent/poi-categories/agra.webp",
};
export const Nightlife: POICategorySearch = {
  pluralName: "Nightlife Spot",
  name: "Nightlife Spot",
  icon: faGlassMartiniAlt,
  id: "4d4b7105d754a06376d81259",
  image: "/Travel-Agent/poi-categories/new-york.webp",
};
export const OutdoorsRec: POICategorySearch = {
  pluralName: "Outdoors & Recreation",
  name: "Outdoors & Recreation",
  icon: faHiking,
  id: "4d4b7105d754a06377d81259",
  image: "/Travel-Agent/poi-categories/paris.webp",
};
export const ShopService: POICategorySearch = {
  pluralName: "Shopping & Services",
  name: "Shopping & Service",
  icon: faShoppingBag,
  id: "4d4b7105d754a06378d81259",
  image: ".webp",
};
export const HistoricSite: POICategorySearch = {
  pluralName: "Historic Sites",
  name: "Historic Site",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faLandmark,
  id: "4deefb944765f83613cdba6e",
  image: "/Travel-Agent/poi-categories/historic.webp",
};

export const MovieTheater: POICategorySearch = {
  pluralName: "Movie Theaters",
  name: "Movie Theater",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faTicketAlt,
  id: "4bf58dd8d48988d17f941735",
  image: "/Travel-Agent/poi-categories/movie.webp",
};

export const Museum: POICategorySearch = {
  pluralName: "Museums",
  name: "Museum",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faLandmark,
  id: "4bf58dd8d48988d181941735",
  image: "/Travel-Agent/poi-categories/museum.webp",
};

export const MusicVenue: POICategorySearch = {
  pluralName: "Music Venues",
  name: "Music Venue",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faMusic,
  id: "4bf58dd8d48988d1e5931735",
  image: "/Travel-Agent/poi-categories/music.webp",
};

export const Theater: POICategorySearch = {
  pluralName: "Theaters",
  name: "Theater",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faTheaterMasks,
  id: "4bf58dd8d48988d137941735",
  image: "/Travel-Agent/poi-categories/theater.webp",
};

export const Stadium: POICategorySearch = {
  pluralName: "Stadiums",
  name: "Stadium",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faFutbol,
  id: "4bf58dd8d48988d184941735",
  image: "/Travel-Agent/poi-categories/stadium.webp",
};

export const ThemePark: POICategorySearch = {
  pluralName: "Theme Parks",
  name: "Theme Park",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faFortAwesome,
  id: "4bf58dd8d48988d182941735",
  image: "/Travel-Agent/poi-categories/theme-park.webp",
};

export const Zoo: POICategorySearch = {
  pluralName: "Zoos",
  name: "Zoo",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faPaw,
  id: "4bf58dd8d48988d17b941735",
  image: "/Travel-Agent/poi-categories/zoo.webp",
};

export const Bar: POICategorySearch = {
  pluralName: "Bars",
  name: "Bar",
  parent: POICategoryParent.Nightlife,
  icon: faGlassMartiniAlt,
  id: "4bf58dd8d48988d116941735",
  image: "/Travel-Agent/poi-categories/bar.webp",
};

export const Nightclub: POICategorySearch = {
  pluralName: "Nightclubs",
  name: "Nightclub",
  parent: POICategoryParent.Nightlife,
  icon: faGlassCheers,
  id: "4bf58dd8d48988d11f941735",
  image: "/Travel-Agent/poi-categories/nightclub.webp",
};

export const GymFitness: POICategorySearch = {
  pluralName: "Gym / Fitness Centers",
  name: "Gym / Fitness Center",
  parent: POICategoryParent.OutdoorsRec,
  icon: faDumbbell,
  id: "4bf58dd8d48988d175941735",
  image: "/Travel-Agent/poi-categories/gym.webp",
};

export const Beach: POICategorySearch = {
  pluralName: "Beaches",
  name: "Beach",
  parent: POICategoryParent.OutdoorsRec,
  icon: faUmbrellaBeach,
  id: "4bf58dd8d48988d1e2941735",
  image: "/Travel-Agent/poi-categories/beach.webp",
};

export const NationalPark: POICategorySearch = {
  pluralName: "National Parks",
  name: "National Park",
  parent: POICategoryParent.OutdoorsRec,
  icon: faMountain,
  id: "52e81612bcbc57f1066b7a21",
  image: "/Travel-Agent/poi-categories/national-park.webp",
};

export const SkiArea: POICategorySearch = {
  pluralName: "Ski Areas",
  name: "Ski Area",
  parent: POICategoryParent.OutdoorsRec,
  icon: faSkiing,
  id: "4bf58dd8d48988d1e9941735",
  image: "/Travel-Agent/poi-categories/ski.webp",
};

export const ClothingStore: POICategorySearch = {
  pluralName: "Clothing Stores",
  name: "Clothing Store",
  parent: POICategoryParent.ShopService,
  icon: faTshirt,
  id: "4bf58dd8d48988d103951735",
  image: "/Travel-Agent/poi-categories/clothing.webp",
};

export const ShoppingMall: POICategorySearch = {
  pluralName: "Shopping Malls",
  name: "Shopping Mall",
  parent: POICategoryParent.ShopService,
  icon: faShoppingBag,
  id: "4bf58dd8d48988d1fd941735",
  image: "/Travel-Agent/poi-categories/shopping.webp",
};

export const POICategoryMap: { [index: string]: POICategorySearch } = {
  "Arts & Entertainment": ArtsEntertainment,
  "Nightlife Spot": Nightlife,
  "Outdoors & Recreation": OutdoorsRec,
  "Shopping & Service": ShopService,

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

export const POICategories: POICategorySearch[] = [
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
