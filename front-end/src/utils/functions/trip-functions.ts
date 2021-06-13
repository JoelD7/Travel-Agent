import { differenceInCalendarDays, parseISO } from "date-fns";
import Compress from "react-image-file-resizer";
import { storage, firebase } from "../external-apis";
import { setUserTrips, store } from "../store";
import { Trip, TripEvent } from "../types";
import { mapFlightToDomainType } from "./functions";

/**
 * Converts data returned by the backend to a
 * client-defined Trip type.
 */
export function responseTripToDomainTrip(resTrip: any) {
  return {
    idTrip: resTrip.idTrip,
    name: resTrip.name,
    countries: resTrip.countries.split(", "),
    photosQty: 0,
    places: 1,
    budget: resTrip.budget,
    days: differenceInCalendarDays(
      parseISO(resTrip.endDate),
      parseISO(resTrip.startDate)
    ),
    startDate: parseISO(resTrip.startDate),
    endDate: parseISO(resTrip.endDate),
    coverPhoto: resTrip.coverPhoto,
    albums: resTrip.albums,
    itinerary: responseItineraryToDomainItinerary(resTrip.itinerary),
  };
}

function responseItineraryToDomainItinerary(itinerary: any[]) {
  return itinerary.map((event) => {
    if (event.flight !== null) {
      return { ...event, flight: mapFlightToDomainType(event.flight) };
    }

    return event;
  });
}

export function deleteTripEventFromStore(idEvent: number | undefined) {
  if (idEvent) {
    const userTrips: Trip[] = store.getState().tripSlice.userTrips;

    const newUserTrips: Trip[] = userTrips.map((trip) => {
      if (trip.itinerary) {
        const newItinerary: TripEvent[] = trip.itinerary.filter(
          (event) => event.idEvent !== idEvent
        );
        return { ...trip, itinerary: newItinerary };
      }

      return trip;
    });

    store.dispatch(setUserTrips(newUserTrips));
  }
}

export function compressImage(file: File) {
  return new Promise<File>((resolve) => {
    Compress.imageFileResizer(
      file, // the file from input
      800, // width
      800, // height
      "png", // compress format WEBP, JPEG, PNG
      100, // quality
      0, // rotation
      (uri) => {
        resolve(uri as File);
        // You upload logic goes here
      },
      "file" // blob, base64 or file default base64
    );
  });
}

export async function deleteImageFromFirebase(
  image: File,
  reference: firebase.storage.Reference
) {
  let fileToDelete: File = image;

  if (image.size > 250000) {
    fileToDelete = await compressImage(image);
  }

  let imageRef: firebase.storage.Reference = reference.child(fileToDelete.name);

  imageRef
    .delete()
    .then(() => {
      console.log(`Picture ${image.name} deleted.`);
    })
    .catch((error) => {
      console.log(`Couldn't delete ${image.name} | Error: ${error}`);
    });
}
