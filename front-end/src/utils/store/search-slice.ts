import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AirportCity } from "../types/location-types";
import { airportCityPlaceholder } from "../../utils";

interface SearchType {
  query: string;
  cityPredictions: AirportCity[];
  airportPredictions: AirportCity[];
  currentCity: AirportCity;
}

interface PayloadType {
  value: string;
}

const initialState: SearchType = {
  query: " ",
  cityPredictions: [],
  airportPredictions: [],
  currentCity: airportCityPlaceholder,
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
    updateCityPredictions(state, action: PayloadAction<AirportCity[]>) {
      state.cityPredictions = action.payload;
    },

    updateAirportPredictions(state, action: PayloadAction<AirportCity[]>) {
      state.airportPredictions = action.payload;
    },
    setCurrentCity(state, action: PayloadAction<AirportCity>) {
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
