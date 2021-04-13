import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import { carSearchDefault } from "../constants";
import { getDefaultCity, getISOCodeFromCountry } from "../functions";
import { CarCheckbox, CarSearch, IATALocation } from "../types";

export interface CarReducer {
  carSearch: CarSearch;
  brands: CarCheckbox[];
  transmission: string;
  features: CarCheckbox[];
}

const defaultDestinationCity: IATALocation = getDefaultCity("destinationCity");

const initialState: CarReducer = {
  carSearch: carSearchDefault,
  features: [
    {
      name: "Air conditioned",
      checked: true,
    },
    {
      name: "Bluetooth",
      checked: true,
    },
    {
      name: "Smoke free",
      checked: true,
    },
  ],
  brands: [
    {
      name: "Chrysler",
      checked: true,
    },
    {
      name: "Fiat",
      checked: false,
    },
    {
      name: "Ford",
      checked: false,
    },
    {
      name: "Toyota",
      checked: true,
    },
  ],
  transmission: "",
};

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
