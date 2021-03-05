import { addDays, format } from "date-fns";
import { HotelBedAPI } from "../external-apis";
import { HotelBooking, HotelBookingParams } from "../types/hotel-types";

export function getHotelStars(hotel: HotelBooking) {
  if (hotel.categoryCode) {
    return Number(hotel.categoryCode.split("EST")[0]);
  }
  return Number(hotel.category.code.split("EST")[0]);
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

export function convertReservationParamsToURLParams(
  reservationParams: HotelBookingParams,
  page: "hotel" | "hotelDetails"
): string {
  let params = [];

  let checkIn: string = format(reservationParams.stay.checkIn, "yyyy-MM-dd");
  let checkOut: string = format(reservationParams.stay.checkOut, "yyyy-MM-dd");

  let adults: string = String(reservationParams.occupancies[0].adults);
  let children: string = String(reservationParams.occupancies[0].children);
  let rooms: string = String(reservationParams.occupancies[0].rooms);
  let paxes: string = reservationParams.occupancies[0].paxes
    .map((p) => p.type + "," + p.age)
    .join(",");

  let longitude: string = String(reservationParams.geolocation.longitude);
  let latitude: string = String(reservationParams.geolocation.latitude);
  let radius: string = String(reservationParams.geolocation.radius);
  let unit: string = reservationParams.geolocation.unit;

  let maxHotels: string = String(reservationParams.filter.maxHotels);
  let minCategory: string = String(reservationParams.filter.minCategory);
  let minRate: string = String(reservationParams.filter.minRate);

  params.push(`checkIn=${checkIn}`);
  params.push(`checkOut=${checkOut}`);
  params.push(`adults=${adults}`);
  params.push(`children=${children}`);
  params.push(`rooms=${rooms}`);

  if (reservationParams.occupancies[0].paxes.length > 0) {
    params.push(`paxes=${paxes}`);
  }

  if (page === "hotel") {
    params.push(`longitude=${longitude}`);
    params.push(`latitude=${latitude}`);
    params.push(`radius=${radius}`);
    params.push(`unit=${unit}`);
    params.push(`maxHotels=${maxHotels}`);
    params.push(`minCategory=${minCategory}`);
    params.push(`minRate=${minRate}`);
  }

  return "?" + params.sort().join("&");
}

export function convertURLToReservationParams(
  urlParams: string,
  page: "hotel" | "hotelDetails"
): HotelBookingParams {
  let reservationParams: HotelBookingParams;
  let keyValuePairs: string[] = urlParams.substring(1).split("&");
  let parameters: any;

  keyValuePairs.forEach((kvp) => {
    let key = kvp.split("=")[0];
    let value = kvp.split("=")[1];

    parameters = { ...parameters, [key]: value };
  });

  reservationParams = {
    stay: {
      checkIn: parameters.checkIn,
      checkOut: parameters.checkOut,
    },
    occupancies: [
      {
        adults: Number(parameters.adults),
        children: Number(parameters.children),
        rooms: Number(parameters.rooms),
        paxes: parameters.hasOwnProperty("paxes") ? parameters.paxes : [],
      },
    ],
    geolocation: {
      latitude: Number(parameters.latitude),
      longitude: Number(parameters.longitude),
      radius: Number(parameters.radius),
      unit: parameters.unit,
    },
    filter: {
      maxHotels: Number(parameters.maxHotels),
      minCategory: Number(parameters.minCategory),
      minRate: Number(parameters.minRate),
    },
  };

  return reservationParams;
}
