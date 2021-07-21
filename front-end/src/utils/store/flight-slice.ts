import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import { iataCodes } from "../constants";
import { getDefaultCity, sortIATAPredictionsByImportance } from "../functions";
import { flightPlaceholder } from "../placeholders";
import { FlightTypes } from "../types";
import { IATALocation } from "../types/location-types";

export interface FlightSearch {
  departure: Date;
  return?: Date;
  adults: number;
  class: FlightClassType;
  children?: number;
  flightType: FlightType;
  infants?: number;
  dictionaries?: FlightDictionary;
  flightFromAutocomplete: IATALocation | null;
  flightToAutocomplete: IATALocation | null;
  flightListURL?: string;
  flightDetail: Flight;
  [key: string]: FlightSearch[keyof FlightSearch];
}

const defaultOriginCity: IATALocation = getDefaultCity("originCity");
const defaultDestinationCity: IATALocation = getDefaultCity("destinationCity");

const initialState: FlightSearch = {
  departure: addDays(new Date(), 1),
  return: addDays(new Date(), 3),
  flightType: FlightTypes.ROUND,
  flightListURL: `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${
    defaultDestinationCity.code
  }&destinationLocationCode=MUC&departureDate=${format(
    addDays(new Date(), 1),
    "yyyy-MM-dd"
  )}&returnDate=${format(addDays(new Date(), 3), "yyyy-MM-dd")}&adults=${2}`,
  flightFromAutocomplete: getMainAirportForCity(defaultOriginCity),
  flightToAutocomplete: getMainAirportForCity(defaultDestinationCity),
  flightDetail: flightPlaceholder,
  dictionaries: {
    carriers: {
      a: "",
    },
  },
  adults: 2,
  class: "ECONOMY",
  children: 0,
  infants: 0,
};

const flightSlice = createSlice({
  name: "flightSlice",
  initialState,
  reducers: {
    setFlightDetail(state, action: PayloadAction<Flight>) {
      state.flightDetail = action.payload;
    },
    setFlightParams(state, action: PayloadAction<FlightSearch>) {
      return { ...state, ...action.payload };
    },
    setFlightDepartureDate(state, action: PayloadAction<MaterialUiPickersDate>) {
      //@ts-ignore
      state.departure = new Date(action.payload.getTime());
    },
    setFlightReturnDate(state, action: PayloadAction<MaterialUiPickersDate | undefined>) {
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
    setFlightAdults(state, action: PayloadAction<number>) {
      state.adults = action.payload;
    },
    setFlightClass(state, action: PayloadAction<FlightClassType>) {
      state.class = action.payload;
    },
    setFlightChildren(state, action: PayloadAction<number>) {
      state.children = action.payload;
    },
    setFlightInfants(state, action: PayloadAction<number>) {
      state.infants = action.payload;
    },
    setFlightFromAutocomplete: {
      reducer(state, action: PayloadAction<IATALocation | null>) {
        state.flightFromAutocomplete = action.payload;
      },

      prepare(iata: IATALocation | null) {
        return {
          payload: getMainAirportForCity(iata),
        };
      },
    },
    setFlightToAutocomplete: {
      reducer(state, action: PayloadAction<IATALocation | null>) {
        state.flightToAutocomplete = action.payload;
      },

      prepare(iata: IATALocation | null) {
        return {
          payload: getMainAirportForCity(iata),
        };
      },
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
  setFlightDepartureDate,
  setFlightReturnDate,
  setFlightAdults,
  setFlightListURL,
  setFlightClass,
  setFlightDictionaries,
  setFlightDetail,
  setFlightChildren,
  setFlightInfants,
  setFlightFromAutocomplete,
  setFlightToAutocomplete,
  setFlightType,
} = flightSlice.actions;
export default flightSlice.reducer;

/**
 * Returns the most important airport for a particular
 * city.
 * NOTE: The "importance" of an airport is measured by the
 * numbers of carriers it receives.
 */
function getMainAirportForCity(iata: IATALocation | null): IATALocation | null {
  if (iata !== undefined && iata !== null) {
    let city = iata.city.toLowerCase();
    let predictionsBuffer: IATALocation[] = iataCodes.filter(
      (iata) =>
        iata.code.toLowerCase().indexOf(city) === 0 ||
        iata.name.toLowerCase().indexOf(city) === 0 ||
        iata.city.toLowerCase().indexOf(city) === 0
    );

    sortIATAPredictionsByImportance(predictionsBuffer);

    return predictionsBuffer[0];
  }

  return iata;
}
