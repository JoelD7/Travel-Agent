import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { FlightClassType } from "./FlightClassType";

export interface FlightSearchParams {
  departure: MaterialUiPickersDate;
  return: MaterialUiPickersDate;
  from: string;
  to: string;
  adults: string;
  children: string;
  infants: string;
  flightType: FlightType;
  class: FlightClassType;
  priceRange: number[];
  goDatetime?: DatetimeRange;
  returnDatetime?: DatetimeRange;

  [key: string]: FlightSearchParams[keyof FlightSearchParams];
}

interface DatetimeRange {
  departureDatetimeRange?: Date[];
  arrivalDatetimeRange?: Date[];
}

export const ROUND = "Round trip";
export const ONE_WAY = "One way";

type FlightType = typeof ROUND | typeof ONE_WAY;
