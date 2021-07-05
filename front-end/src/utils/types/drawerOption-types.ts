import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface DrawerOptions {
  label: string;
  icon: IconDefinition;
  route: string;
  selected: boolean;
  loggedUserRoute: boolean;
  visible: boolean;
}
