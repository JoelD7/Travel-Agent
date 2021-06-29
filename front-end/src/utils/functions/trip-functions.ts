import { compareDesc, differenceInCalendarDays, parseISO } from "date-fns";
import Compress from "react-image-file-resizer";
import { firebase } from "../external-apis";
import { setLastTrip, setUserTrips, store } from "../store";
import { Trip, TripEvent } from "../types";
import { mapFlightToDomainType } from "./flight-functions";

/**
 * Converts data returned by the backend to a
 * client-defined Trip type.
 */
export function responseTripToDomainTrip(resTrip: any) {
  return {
    idTrip: resTrip.idTrip,
    uuid: resTrip.uuid,
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

export function deleteTripEventFromStore(uuid: string | undefined) {
  const userTrips: Trip[] | undefined = store.getState().tripSlice.userTrips;

  if (uuid && userTrips) {
    const newUserTrips: Trip[] = userTrips.map((trip) => {
      if (trip.itinerary) {
        const newItinerary: TripEvent[] = trip.itinerary.filter(
          (event) => event.uuid !== uuid
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

export function setUpLastTrip(trips: Trip[]) {
  let lastTrip: Trip = trips.sort((a, b) => compareDesc(a.endDate, b.endDate))[0];

  store.dispatch(setLastTrip(lastTrip));
}
