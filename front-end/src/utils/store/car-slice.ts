import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { getDefaultCity, getISOCodeFromCountry } from "../functions";
import { CarSearch, IATALocation } from "../types";

interface CarReducer {
  carSearch: CarSearch;
}

const defaultDestinationCity: IATALocation = getDefaultCity("destinationCity");

const initialState: CarReducer = {
  carSearch: {
    pickup_date: addDays(new Date(), 2).toISOString(),
    pickup_location: defaultDestinationCity.code,
    dropoff_date: addDays(new Date(), 4).toISOString(),
    country_code: getISOCodeFromCountry(defaultDestinationCity.country),
  },
};

const carSlice = createSlice({
  name: "carReducer",
  initialState,
  reducers: {
    setCarSearch(state, action: PayloadAction<CarSearch>) {
      state.carSearch = action.payload;
    },
  },
});

export const { setCarSearch } = carSlice.actions;
export default carSlice.reducer;
