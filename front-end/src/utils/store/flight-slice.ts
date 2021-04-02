import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import { getDefaultCity } from "../functions";
import { airportCityPlaceholder, airportCityPlaceholderTwo } from "../placeholders";
import { FlightTypes } from "../types";
import { IATALocation } from "../types/location-types";

export interface FlightSearch {
  departure: Date;
  return?: Date;
  from: string;
  to: string;
  adults: number;
  class: string;
  children?: number;
  flightType: FlightType;
  infants?: number;
  dictionaries?: FlightDictionary;
  flightFromAutocomplete?: IATALocation | null;
  flightToAutocomplete?: IATALocation | null;
  flightListURL?: string;
  [key: string]: FlightSearch[keyof FlightSearch];
}

const defaultOriginCity: IATALocation = getDefaultCity("originCity");
const defaultDestinationCity: IATALocation = getDefaultCity("destinationCity");

const initialState: FlightSearch = {
  departure: addDays(new Date(), 1),
  return: addDays(new Date(), 3),
  flightType: FlightTypes.ONE_WAY,
  from: defaultOriginCity.code,
  to: defaultDestinationCity.code,
  flightListURL: `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${
    defaultDestinationCity.code
  }&destinationLocationCode=MUC&departureDate=${format(
    addDays(new Date(), 1),
    "yyyy-MM-dd"
  )}&returnDate=${format(addDays(new Date(), 3), "yyyy-MM-dd")}&adults=${2}`,
  flightFromAutocomplete: defaultDestinationCity,
  flightToAutocomplete: airportCityPlaceholderTwo,
  dictionaries: {
    carriers: {
      a: "",
    },
  },
  adults: 2,
  class: "Economy",
  children: 0,
  infants: 0,
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
    setFlightReturn(state, action: PayloadAction<MaterialUiPickersDate | undefined>) {
      //@ts-ignore
      if (action.payload) {
        state.return = new Date(action.payload.getTime());
      } else {
        state.return = undefined;
      }
    },
    setFlightType(state, action: PayloadAction<FlightType>) {
      state.flightType = action.payload;
    },
    setFlightFrom(state, action: PayloadAction<string>) {
      state.from = action.payload;
    },
    setFlightTo(state, action: PayloadAction<string>) {
      state.to = action.payload;
    },
    setFlightAdults(state, action: PayloadAction<number>) {
      state.adults = action.payload;
    },
    setFlightClass(state, action: PayloadAction<string>) {
      state.class = action.payload;
    },
    setFlightChildren(state, action: PayloadAction<number>) {
      state.children = action.payload;
    },
    setFlightInfants(state, action: PayloadAction<number>) {
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
  setFlightType,
} = flightSlice.actions;
export default flightSlice.reducer;
