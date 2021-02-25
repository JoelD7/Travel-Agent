import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

export interface FlightSearchParams {
  // departure: MaterialUiPickersDate;
  // return: MaterialUiPickersDate;
  // from: string;
  // to: string;
  // adults: string;
  // children: string;
  // infants: string;
  flightType: FlightType;
  // class: FlightClassType;
  priceRange: number[];
  exitFlightDates: DatetimeRange;
  returnFlightDates: DatetimeRange;

  [key: string]: FlightSearchParams[keyof FlightSearchParams];
}

export const ROUND = "Round trip";
export const ONE_WAY = "One way";

type FlightType = typeof ROUND | typeof ONE_WAY;
