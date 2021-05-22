export const Flight = "Flight";
export type Flight = typeof Flight;

export const Hotel = "Hotel";
export type Hotel = typeof Hotel;

export const Restaurant = "Restaurant";
export type Restaurant = typeof Restaurant;

export const POI = "Point of interest";
export type POI = typeof POI;

export const CAR_RENTAL = "Car Rental";
export type CAR_RENTAL = typeof CAR_RENTAL;

export type EventType = Flight | Hotel | Restaurant | POI | CAR_RENTAL;
