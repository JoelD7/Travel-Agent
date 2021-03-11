import { addDays, format, parseISO } from "date-fns";
import { HotelBedAPI } from "../external-apis";
import {
  HotelBooking,
  HotelBookingParams,
  HotelPax,
  HotelRoomRate,
  HotelRooms,
} from "../types/hotel-types";
import { formatAsDecimal } from "./functions";

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
      latitude: Number(parameters.latitude),
      longitude: Number(parameters.longitude),
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

  return reservationParams;
}

function getPaxes(parameters: any): HotelPax[] {
  let paxes: HotelPax[] = [];

  if (parameters.hasOwnProperty("paxes")) {
    let stringPaxes = parameters.paxes.split(",");
    for (let i = 0; i <= stringPaxes.length - 2; i += 2) {
      let type = stringPaxes[i];
      let age = stringPaxes[i + 1];

      paxes.push({ type, age: Number(age) });
    }
  } else if (parameters.hasOwnProperty("children")) {
    let children: number = Number(parameters.children);
    for (let i = 0; i < children; i++) {
      paxes.push({ type: "CH", age: 4 });
    }
  }

  return paxes;
}

export function getRoomTotalPrice(rate: HotelRoomRate): number {
  let total: number = Number(rate.net);

  if (rate.taxes) {
    total += Number(rate.taxes.taxes[0].amount);
  }

  return Number(total);
}

export function getMinRate(rooms: HotelRooms[]): number {
  let rates: HotelRoomRate[] = [];

  rooms.forEach((room) => {
    rates.concat(room.rates);
  });

  let minRate = rates.reduce((prev: HotelRoomRate, cur: HotelRoomRate) => {
    let totalPrev = getRoomTotalPrice(prev);
    let totalCur = getRoomTotalPrice(cur);

    return totalPrev < totalCur ? prev : cur;
  }, rooms[0].rates[0]);

  return getRoomTotalPrice(minRate);
}
