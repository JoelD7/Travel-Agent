import * as HotelBedAPI from "./hotelbeds-apis";
export * from "./google-places-apis";
export { HotelBedAPI };
export * from "./amadeus-apis";
export * from "./backend";
export * from "./avis-apis";
export * from "./yelp-apis";
export * from "./firebase";
export * from "./hotelbeds-apis";

/**
 * To use Google Places API and HotelBeds API on the client side, a proxy is required to add the
 * "Access-Control-Allow-Origin" header(which is not included in the response
 * from neither of the APIs, but required from the client).
 */
export const proxyUrl = "https://stormy-gorge-33469.herokuapp.com/";
