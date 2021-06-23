import { setUserTrips, store } from "../store";
import { responseTripToDomainTrip } from "./trip-functions";

export function setUserTripsFromPerson(person: any) {
  let tripsInResponse = person.trips;
  let tripsBuffer = tripsInResponse.map((resTrip: any) =>
    responseTripToDomainTrip(resTrip)
  );

  store.dispatch(setUserTrips(tripsBuffer));
}
