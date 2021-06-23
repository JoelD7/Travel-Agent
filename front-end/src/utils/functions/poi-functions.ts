import { store } from "../store";
import { EventTypes, Trip } from "../types";
import { getISODatetimeWithOffset } from "./functions";

export function parsePOIAddress(poi: POIType) {
  if (poi.location.formattedAddress === undefined) {
    return;
  }

  if (poi.location.formattedAddress.length === 1) {
    return `${poi.location.formattedAddress[0]}`;
  }

  return `${poi.location.formattedAddress[0]}, ${
    poi.location.formattedAddress[1].split(",")[0]
  }`;
}

export function getPoiDTO(poi: POIType, visitDate?: Date): RsvPOI {
  let image: POIPhotoItems | undefined = poi.bestPhoto ? poi.bestPhoto : undefined;
  let imageUrl: string = image
    ? `${image.prefix}${image.width}x${image.height}${image.suffix}`
    : "";

  let poiAddress = parsePOIAddress(poi);

  return {
    id: poi.id,
    name: poi.name,
    rating: poi.rating / 2,
    category: poi.categories[0].name,
    categoryIconUrl: `${poi.categories[0].icon.prefix}32${poi.categories[0].icon.suffix}`,
    visitDate: visitDate ? getISODatetimeWithOffset(visitDate) : "",
    imageUrl,
    formattedAddress: poiAddress ? poiAddress : "",
  };
}

export function isPoiInAnyTrip(poi: POIType): boolean {
  const userTrips: Trip[] | undefined = store.getState().tripSlice.userTrips;
  let included: boolean = false;

  if (userTrips) {
    userTrips.forEach((trip) => {
      if (trip.itinerary) {
        trip.itinerary
          .filter((event) => event.type === EventTypes.POI)
          .forEach((event) => {
            if (event.poi && event.poi.id === poi.id) {
              included = true;
              return;
            }
          });
      }
    });
  }

  return included;
}
