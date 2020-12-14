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
}

export enum POICategoryParent {
  ArtsEntertainment = "Arts & entertainment",
  Nightlife = "Nightlife",
  OutdoorsRec = "Outdoors & recreation",
  ShopService = "Shopping & service",
}

export const HistoricSite: POICategory = {
  name: "Historic Site",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faLandmark,
  code: "4deefb944765f83613cdba6e",
  image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
};

export const MovieTheater: POICategory = {
  name: "Movie Theater",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faTicketAlt,
  code: "4bf58dd8d48988d17f941735",
  image: "https://images.unsplash.com/photo-1564520018156-5329ee1631c0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1041&q=80",
};

export const Museum: POICategory = {
  name: "Museum",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faLandmark,
  code: "4bf58dd8d48988d181941735",
  image:
    "https://images.unsplash.com/photo-1596388292528-963a324709f0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
};

export const MusicVenue: POICategory = {
  name: "Music Venue",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faMusic,
  code: "4bf58dd8d48988d1e5931735",
  image: "https://images.unsplash.com/photo-1597355405008-e23274ed2805?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
};

export const Theater: POICategory = {
  name: "Theater",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faTheaterMasks,
  code: "4bf58dd8d48988d137941735",
  image: "https://images.unsplash.com/photo-1544891535-11cac565122e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
};

export const Stadium: POICategory = {
  name: "Stadium",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faFutbol,
  code: "4bf58dd8d48988d184941735",
  image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
};

export const ThemePark: POICategory = {
  name: "Theme Park",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faFortAwesome,
  code: "4bf58dd8d48988d182941735",
  image: "https://images.unsplash.com/photo-1578318099746-8701bb066ceb?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1067&q=80",
};

export const Zoo: POICategory = {
  name: "Zoo",
  parent: POICategoryParent.ArtsEntertainment,
  icon: faPaw,
  code: "4bf58dd8d48988d17b941735",
  image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8em9vfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

export const Bar: POICategory = {
  name: "Bar",
  parent: POICategoryParent.Nightlife,
  icon: faGlassMartiniAlt,
  code: "4bf58dd8d48988d116941735",
  image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YmFyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

export const Nightclub: POICategory = {
  name: "Nightclub",
  parent: POICategoryParent.Nightlife,
  icon: faGlassCheers,
  code: "4bf58dd8d48988d11f941735",
  image: "https://images.unsplash.com/photo-1578736641330-3155e606cd40?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NzN8fG5pZ2h0Y2x1YnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

export const GymFitness: POICategory = {
  name: "Gym / Fitness Center",
  parent: POICategoryParent.OutdoorsRec,
  icon: faDumbbell,
  code: "4bf58dd8d48988d175941735",
  image: "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fGd5bXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

export const Beach: POICategory = {
  name: "Beach",
  parent: POICategoryParent.OutdoorsRec,
  icon: faUmbrellaBeach,
  code: "4bf58dd8d48988d1e2941735",
  image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
};

export const NationalPark: POICategory = {
  name: "National Park",
  parent: POICategoryParent.OutdoorsRec,
  icon: faMountain,
  code: "52e81612bcbc57f1066b7a21",
  image: "https://images.unsplash.com/photo-1568226292321-dd67ff8b3b2b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
};

export const SkiArea: POICategory = {
  name: "Ski Area",
  parent: POICategoryParent.OutdoorsRec,
  icon: faSkiing,
  code: "4bf58dd8d48988d1e9941735",
  image: "https://images.unsplash.com/photo-1505873346750-69ce3daeb225?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
};

export const ClothingStore: POICategory = {
  name: "Clothing Store",
  parent: POICategoryParent.ShopService,
  icon: faTshirt,
  code: "4bf58dd8d48988d103951735",
  image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
};

export const ShoppingMall: POICategory = {
  name: "Shopping Mall",
  parent: POICategoryParent.ShopService,
  icon: faShoppingBag,
  code: "4bf58dd8d48988d1fd941735",
  image: "https://images.unsplash.com/photo-1580793241553-e9f1cce181af?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8bWFsbHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
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
