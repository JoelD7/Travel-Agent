import * as Routes from "./Routes";
import * as HotelAmenity from "./HotelAmenities";
import * as POICategory from "./POICategory";
import { CSSProperties } from "@material-ui/styles";
import * as GoogleAPI from "./external-apis/google-places-apis";
export * from "./external-apis";
export * from "./placeholders";
export * from "./store";
export * from "./types";
export * from "./functions/functions";
export { iataCodes } from "./constants/iataCodes";
export {
  getFindPlaceFromTextURL,
  getPhotoURLFromReference as getPhotoFromReferenceURL,
} from "./external-apis";
export { HotelAmenity, Routes, POICategory, GoogleAPI };

export const dashDrawerSeparation: CSSProperties = {
  marginLeft: "265px",
  width: "81%",
};
