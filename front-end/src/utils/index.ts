import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { format } from "date-fns";
import * as HotelAmenity from "./HotelAmenities";
export * from "./slices";
export { HotelAmenity };

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
