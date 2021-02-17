import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { AirportCity } from "../types/location-types";

export interface FlightSearch {
  departure: Date;
  return: Date;
  from: string;
  to: string;
  adults: string;
  class: string;
  children?: string;
  infants?: string;
  dictionaries: FlightDictionary;
  flightFromAutocomplete?: AirportCity | null;
  flightToAutocomplete?: AirportCity | null;
  flightListURL: string;
  [key: string]: FlightSearch[keyof FlightSearch];
}

const initialState: FlightSearch = {
  departure: addDays(new Date(), 1),
  return: addDays(new Date(), 3),
  from: "",
  flightListURL: "",
  dictionaries: {
    carriers: {
      a: "",
    },
  },
  to: "",
  adults: "",
  class: "",
  children: "",
  infants: "",
};

const flightSlice = createSlice({
  name: "flightSlice",
  initialState,
  reducers: {
    setFlightDeparture(state, action: PayloadAction<MaterialUiPickersDate>) {
      //@ts-ignore
      state.departure = new Date(action.payload.getTime());
    },
    setFlightReturn(state, action: PayloadAction<MaterialUiPickersDate>) {
      //@ts-ignore
      state.return = new Date(action.payload.getTime());
    },
    setFlightFrom(state, action: PayloadAction<string>) {
      state.from = action.payload;
    },
    setFlightTo(state, action: PayloadAction<string>) {
      state.to = action.payload;
    },
    setFlightAdults(state, action: PayloadAction<string>) {
      state.adults = action.payload;
    },
    setFlightClass(state, action: PayloadAction<string>) {
      state.class = action.payload;
    },
    setFlightChildren(state, action: PayloadAction<string>) {
      state.children = action.payload;
    },
    setFlightInfants(state, action: PayloadAction<string>) {
      state.infants = action.payload;
    },
    setFlightFromAutocomplete(state, action: PayloadAction<AirportCity | null>) {
      state.flightFromAutocomplete = action.payload;
    },
    setFlightToAutocomplete(state, action: PayloadAction<AirportCity | null>) {
      state.flightToAutocomplete = action.payload;
    },
    setFlightListURL(state, action: PayloadAction<string>) {
      state.flightListURL = action.payload;
    },
    setFlightDictionaries(state, action: PayloadAction<FlightDictionary>) {
      state.dictionaries = action.payload;
    },
  },
});

export const {
  setFlightDeparture,
  setFlightReturn,
  setFlightFrom,
  setFlightTo,
  setFlightAdults,
  setFlightListURL,
  setFlightClass,
  setFlightDictionaries,
  setFlightChildren,
  setFlightInfants,
  setFlightFromAutocomplete,
  setFlightToAutocomplete,
} = flightSlice.actions;
export default flightSlice.reducer;
