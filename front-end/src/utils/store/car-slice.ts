import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import {
  getDefaultCarReducer,
  getDefaultCity,
  getISOCodeFromCountry,
} from "../functions";
import { CarCheckbox, CarSearch, IATALocation } from "../types";

export interface CarReducer {
  carSearch: CarSearch;
  brands: CarCheckbox[];
  transmission: string;
  features: CarCheckbox[];
}

const defaultDestinationCity: IATALocation = getDefaultCity("destinationCity");

const initialState: CarReducer = getDefaultCarReducer();

const carSlice = createSlice({
  name: "carReducer",
  initialState,
  reducers: {
    setCarSearch(state, action: PayloadAction<CarSearch>) {
      state.carSearch = action.payload;
    },

    setCarSearchBrands(state, action: PayloadAction<CarCheckbox[]>) {
      state.brands = action.payload;
    },

    setCarSearchFeatures(state, action: PayloadAction<CarCheckbox[]>) {
      state.features = action.payload;
    },

    setCarSearchTransmission(state, action: PayloadAction<string>) {
      state.transmission = action.payload;
    },
  },
});

export const {
  setCarSearch,
  setCarSearchBrands,
  setCarSearchFeatures,
  setCarSearchTransmission,
} = carSlice.actions;
export default carSlice.reducer;
