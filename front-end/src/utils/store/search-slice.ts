import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultCity, persistGeolocationInLocalStorage } from "../functions";
import { IATALocation } from "../types/location-types";

interface SearchType {
  query: string;
  cityPredictions: IATALocation[];
  airportPredictions: IATALocation[];
  originCity: IATALocation;
  destinationCity: IATALocation;
}

interface PayloadType {
  value: string;
}

const initialState: SearchType = {
  query: " ",
  cityPredictions: [],
  airportPredictions: [],
  originCity: getDefaultCity("originCity"),
  destinationCity: getDefaultCity("destinationCity"),
};

const searchSlice = createSlice({
  name: "searchNavbar",
  initialState,
  reducers: {
    onQueryChanged(state, action: PayloadAction<PayloadType>) {
      let payload: PayloadType = action.payload;
      let value: string = payload.value;
      return { ...state, query: value };
    },
    updateCityPredictions(state, action: PayloadAction<IATALocation[]>) {
      state.cityPredictions = action.payload;
    },

    updateAirportPredictions(state, action: PayloadAction<IATALocation[]>) {
      state.airportPredictions = action.payload;
    },

    setOriginCity: {
      reducer(state, action: PayloadAction<IATALocation>) {
        state.originCity = action.payload;
      },

      prepare(location: IATALocation) {
        persistGeolocationInLocalStorage(location, "originCity");

        return {
          payload: location,
        };
      },
    },

    setDestinationCity: {
      reducer(state, action: PayloadAction<IATALocation>) {
        state.destinationCity = action.payload;
      },

      prepare(location: IATALocation) {
        persistGeolocationInLocalStorage(location, "destinationCity");

        return {
          payload: location,
        };
      },
    },
  },
});

export const {
  onQueryChanged,
  updateCityPredictions,
  setDestinationCity,
  updateAirportPredictions,
  setOriginCity,
} = searchSlice.actions;
export default searchSlice.reducer;
