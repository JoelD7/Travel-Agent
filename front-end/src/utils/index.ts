import * as Routes from "./Routes";
import * as HotelAmenity from "./HotelAmenities";
import * as POICategory from "./POICategory";
import { CSSProperties } from "@material-ui/styles";
export * from "./placeholders";
export * from "./slices";
export * from "./types";
export * from "./functions/functions";
export { HotelAmenity, Routes, POICategory };

export const dashDrawerSeparation: CSSProperties = {
  marginLeft: "265px",
  width: "81%",
};
