import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import { airportCityPlaceholder, airportCityPlaceholderTwo } from "../placeholders";
import { AirportCity, IATALocation } from "../types/location-types";

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
  flightFromAutocomplete?: IATALocation | null;
  flightToAutocomplete?: IATALocation | null;
  flightListURL: string;
  [key: string]: FlightSearch[keyof FlightSearch];
}

const initialState: FlightSearch = {
  departure: addDays(new Date(), 1),
  return: addDays(new Date(), 3),
  from: airportCityPlaceholder.code,
  flightListURL: `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=MIA&destinationLocationCode=MUC&departureDate=${format(
    addDays(new Date(), 1),
    "yyyy-MM-dd"
  )}&returnDate=${format(addDays(new Date(), 3), "yyyy-MM-dd")}&adults=${2}`,
  flightFromAutocomplete: airportCityPlaceholder,
  flightToAutocomplete: airportCityPlaceholderTwo,
  dictionaries: {
    carriers: {
      a: "",
    },
  },
  to: "",
  adults: "1",
  class: "",
  children: "",
  infants: "",
};

const flightSlice = createSlice({
  name: "flightSlice",
  initialState,
  reducers: {
    setFlightParams(state, action: PayloadAction<FlightSearch>) {
      return { ...state, ...action.payload };
    },
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
    setFlightFromAutocomplete(
      state,
      action: PayloadAction<IATALocation | null | undefined>
    ) {
      state.flightFromAutocomplete = action.payload;
    },
    setFlightToAutocomplete(
      state,
      action: PayloadAction<IATALocation | null | undefined>
    ) {
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
  setFlightParams,
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
