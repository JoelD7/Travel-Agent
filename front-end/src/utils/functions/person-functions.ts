import { setUserTrips, store } from "../store";
import { Trip } from "../types";
import { responseTripToDomainTrip, setUpLastTrip } from "./trip-functions";

export function setUserTripsFromPerson(person: any) {
  let tripsInResponse = person.trips;
  let tripsBuffer = tripsInResponse.map((resTrip: any) =>
    responseTripToDomainTrip(resTrip)
  );

  store.dispatch(setUserTrips(tripsBuffer));

  let userTrips: Trip[] | undefined = store.getState().tripSlice.userTrips;
  if (userTrips) {
    setUpLastTrip([...userTrips]);
  }
}
