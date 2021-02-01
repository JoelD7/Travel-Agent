import { faCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CreateCSSProperties } from "@material-ui/styles";
import React from "react";
import { capitalizeString } from "../../utils";
import { amenitiesMap } from "../../utils/HotelAmenities";
import { IconText } from "./IconText/IconText";

interface AmenityIcon {
  amenity: string;
  style?: CreateCSSProperties<{}>;
}
export function AmenityIcon({ amenity, style }: AmenityIcon) {
  let text: string = "";
  let icon: IconDefinition;

  if (amenitiesMap[amenity]) {
    text = amenitiesMap[amenity].value;
    icon = amenitiesMap[amenity].icon;
  } else {
    text = capitalizeString(amenity.split("_").join(" "), "full sentence");
    icon = faCircle;
  }

  return <IconText style={style} text={text} icon={icon} />;
}
