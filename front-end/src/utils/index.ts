import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { format } from "date-fns";
import * as Route from "./Routes";
import * as HotelAmenity from "./HotelAmenities";
export * from "./slices";
export { HotelAmenity, Route };

export function muiDateFormatter(
  date: MaterialUiPickersDate,
  invalidLabel: string
) {
  return date
    ? format(
        new Date(date?.getFullYear(), date?.getMonth(), date?.getDate()),
        "EEE. d/MMM, yyyy"
      )
    : "dd MMM., yyyy";
}

export const currencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
}).format;
