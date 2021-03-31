import { format, parseISO } from "date-fns";
import { Routes } from "..";
import { HotelBedAPI } from "../external-apis";
import { ExchangeRate } from "../types";
import {
  HotelBooking,
  HotelBookingParams,
  HotelPax,
  HotelRoomRate,
  HotelRooms,
} from "../types/hotel-types";
import { IATALocation } from "../types/location-types";
import { DEFAULT_CURRENCY } from "../constants";

export function getHotelStars(hotel: HotelBooking) {
  let stars = Number(hotel.categoryCode.split("EST")[0]);

  if (isNaN(stars)) {
    for (const char of hotel.categoryName) {
      if (char === " ") {
        continue;
      }

      if (Number.isFinite(Number(char))) {
        stars = Number(char);
      }
    }

    if (hotel.categoryName.includes("HALF")) {
      stars = stars + 0.5;
    }
  }

  return stars;
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
  // city: IATALocation,
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

  params.push(`checkIn=${checkIn}`);
  params.push(`checkOut=${checkOut}`);
  params.push(`adults=${adults}`);
  params.push(`children=${children}`);
  params.push(`rooms=${rooms}`);

  if (reservationParams.occupancies[0].paxes.length > 0) {
    params.push(`paxes=${paxes}`);
  }

  params.push(`longitude=${longitude}`);
  params.push(`latitude=${latitude}`);
  params.push(`radius=${radius}`);
  params.push(`unit=${unit}`);

  if (page === "hotel" && reservationParams.filter) {
    let maxHotels: string = String(reservationParams.filter.maxHotels);
    let minCategory: string = String(reservationParams.filter.minCategory);

    params.push(`maxHotels=${maxHotels}`);
    params.push(`minCategory=${minCategory}`);
  }

  return "?" + params.sort().join("&");
}

/**
 *
 * @param urlParams
 * @param geolocation is necesarry to prevent the situation in which the
 * coordinates in the URL are outdated.
 * @param page
 * @returns
 */
export function convertURLToReservationParams(
  urlParams: string,
  geolocation: IATALocation,
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

  let buffer = {
    stay: {
      checkIn: parseISO(parameters.checkIn),
      checkOut: parseISO(parameters.checkOut),
    },
    occupancies: [
      {
        adults: Number(parameters.adults),
        children: Number(parameters.children),
        rooms: Number(parameters.rooms),
        paxes: getPaxes(parameters),
      },
    ],
    geolocation: {
      latitude: Number(geolocation.lat),
      longitude: Number(geolocation.lon),
      radius: Number(parameters.radius),
      unit: parameters.unit,
    },
    filter:
      page === "hotel"
        ? {
            maxHotels: Number(parameters.maxHotels),
            minCategory: Number(parameters.minCategory),
            minRate: Number(parameters.minRate),
          }
        : undefined,
  };

  reservationParams = { ...buffer, id: JSON.stringify(buffer) };

  return reservationParams;
}

function getPaxes(parameters: any): HotelPax[] {
  let paxes: HotelPax[] = [];

  let children: number = Number(parameters.children);

  if (parameters.hasOwnProperty("paxes")) {
    let stringPaxes = parameters.paxes.split(",");
    let totalPaxes = stringPaxes.length / 2;

    if (totalPaxes === children) {
      for (let i = 0; i <= stringPaxes.length - 2; i += 2) {
        let type = stringPaxes[i];
        let age = stringPaxes[i + 1];

        paxes.push({ type, age: Number(age) });
      }
      return paxes;
    }
  }

  for (let i = 0; i < children; i++) {
    paxes.push({ type: "CH", age: 4 });
  }

  return paxes;
}

export function getRoomTotalPrice(rate: HotelRoomRate): number {
  let total: number = Number(rate.net);

  if (rate.taxes) {
    let taxes = Number(rate.taxes.taxes[0].amount);
    if (!isNaN(taxes)) {
      total += Number(rate.taxes.taxes[0].amount);
    }
  }

  return Number(total);
}

export function getMinRate(rooms: HotelRooms[]): number {
  let rates: HotelRoomRate[] = [];

  rooms.forEach((room) => {
    let buffer = rates.concat(room.rates);
    rates = buffer;
  });

  let rateTotals: number[] = rates
    .map((rate) => getRoomTotalPrice(rate))
    .sort((a, b) => a - b);

  return rateTotals[0];
}

export function getHotelSearchURL(
  reservationParams: HotelBookingParams
  // city: IATALocation
): string {
  return `${Routes.HOTELS}${convertReservationParamsToURLParams(
    reservationParams,
    "hotel"
  )}&sortBy=Stars | desc&page=${1}&pageSize=${20}`;
}
