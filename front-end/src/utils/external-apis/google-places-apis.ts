/**
 * Available fields to include in the "field" parameter in the
 * "findPlaceFromText" API.
 */
export type GoogleFindPlaceField =
  | "name"
  | "business_status"
  | "formatted_address"
  | "geometry"
  | "icon"
  | "photos"
  | "place_id"
  | "plus_code"
  | "types";

/**
 * To use Google Places API on the client side, a proxy is required to add the
 * "Access-Control-Allow-Origin" header(which is not included in the response
 * of the Google's API, but required from the client).
 */
export const proxyUrl = "https://stormy-gorge-33469.herokuapp.com/";

/**
 * Returns the URL for calling the Google Places' Find Place API
 * @param input Text input that identifies the search target, such as a name, address, or phone number.
 * @param fields fields to return in the response.
 */
export function getFindPlaceFromTextURL(input: string, fields: GoogleFindPlaceField[]) {
  return `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&key=${
    process.env.REACT_APP_PLACES_API_KEY
  }&inputtype=textquery&fields=${fields.join(",")}`;
}

export function getPhotoFromReferenceURL(
  photoReference: string,
  maxWidth: number = 1600,
  maxHeight: number = 1600
) {
  return `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&key=${process.env.REACT_APP_PLACES_API_KEY}&maxwidth=${maxWidth}&maxheight=${maxHeight}`;
}
