import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface DrawerOptions {
  label: string;
  icon: IconDefinition;
  route: string;
  selected: boolean;
  user: boolean;
}

// export interface RestaurantFilter {
//   id: number;
//   name: string;
//   checked: boolean;
// }
