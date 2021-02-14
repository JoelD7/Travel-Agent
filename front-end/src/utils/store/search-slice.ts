import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AirportCitySearch } from "../types/location-types";

interface SearchType {
  query: string;
  cityPredictions: AirportCitySearch[];
  airportPredictions: AirportCitySearch[];
}

interface PayloadType {
  value: string;
}

const initialState: SearchType = {
  query: " ",
  cityPredictions: [],
  airportPredictions: [],
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
    updateCityPredictions(state, action: PayloadAction<AirportCitySearch[]>) {
      state.cityPredictions = action.payload;
    },

    updateAirportPredictions(state, action: PayloadAction<AirportCitySearch[]>) {
      state.airportPredictions = action.payload;
    },
  },
});

export const {
  onQueryChanged,
  updateCityPredictions,
  updateAirportPredictions,
} = searchSlice.actions;
export default searchSlice.reducer;
