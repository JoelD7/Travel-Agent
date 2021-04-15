export interface FlightSearchParams {
  flightType: FlightType;
  exitFlightDates: DatetimeRange;
  returnFlightDates?: DatetimeRange;

  [key: string]: FlightSearchParams[keyof FlightSearchParams];
}

export const ROUND = "Round trip";
export const ONE_WAY = "One way";

type FlightType = typeof ROUND | typeof ONE_WAY;
