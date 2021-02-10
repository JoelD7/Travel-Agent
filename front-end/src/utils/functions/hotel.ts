import { HotelBedAPI } from "../external-apis";
import { HotelBooking } from "../types/hotel-types";

export function getHotelStars(hotel: HotelBooking) {
  return Number(hotel.categoryCode.split("EST")[0]);
}

export function getHotelImages(hotel: HotelBooking) {
  /**
   * Sort by visualOrder in order for the first image
   * to be used as cover.
   */
  return [...hotel.images]
    .sort((a, b) => a.visualOrder - b.visualOrder)
    .map((image) => HotelBedAPI.imageURL.bigger + image.path);
}
