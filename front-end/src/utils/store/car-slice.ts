import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultCarReducer } from "../functions";
import { CarCheckbox, CarRsv, CarSearch } from "../types";

export interface CarReducer {
  carSearch: CarSearch;
  carRsv: CarRsv;
  carReservations?: CarRsv[];
  brands: CarCheckbox[];
  transmission: string;
  features: CarCheckbox[];
}

const initialState: CarReducer = getDefaultCarReducer();

const carSlice = createSlice({
  name: "carReducer",
  initialState,
  reducers: {
    setCarSearch(state, action: PayloadAction<CarSearch>) {
      state.carSearch = action.payload;
    },

    setCarRsv(state, action: PayloadAction<CarRsv>) {
      state.carRsv = action.payload;
    },

    setCarReservations(state, action: PayloadAction<CarRsv[]>) {
      state.carReservations = action.payload;
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
  setCarRsv,
  setCarReservations,
  setCarSearchTransmission,
} = carSlice.actions;
export default carSlice.reducer;
