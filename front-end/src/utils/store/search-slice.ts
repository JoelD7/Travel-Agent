import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IATALocation } from "../types/location-types";
import { airportCityPlaceholder } from "../../utils";
import { getDefaultGeolocation } from "../functions";

interface SearchType {
  query: string;
  cityPredictions: IATALocation[];
  airportPredictions: IATALocation[];
  currentCity: IATALocation;
}

interface PayloadType {
  value: string;
}

const initialState: SearchType = {
  query: " ",
  cityPredictions: [],
  airportPredictions: [],
  currentCity: getDefaultGeolocation(),
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
    setCurrentCity(state, action: PayloadAction<IATALocation>) {
      state.currentCity = action.payload;
    },
  },
});

export const {
  onQueryChanged,
  updateCityPredictions,
  setCurrentCity,
  updateAirportPredictions,
} = searchSlice.actions;
export default searchSlice.reducer;
