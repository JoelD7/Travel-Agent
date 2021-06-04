export const HOTEL = "HOTEL";
export type HOTEL = typeof HOTEL;

export const RESTAURANT = "RESTAURANT";
export type RESTAURANT = typeof RESTAURANT;

export const POI = "POI";
export type POI = typeof POI;

export type FavoriteType = HOTEL | RESTAURANT | POI;

export interface Favorite {
  code: string;
  type: FavoriteType;
  poi: RsvPOI | null;
  restaurant: RsvRestaurant | null;
}
