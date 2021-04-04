import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultCityImage } from "../functions";
import { CityImage, ExchangeRate } from "../types";

interface RootSlice {
  openRequiredFieldSnack: boolean;
  exchangeRate: ExchangeRate;
  baseCurrency: string;
  cityImage: CityImage;
}

const initialState: RootSlice = {
  openRequiredFieldSnack: false,
  exchangeRate: JSON.parse(String(localStorage.getItem("rates"))),
  baseCurrency: getBaseCurrency(),
  cityImage: getDefaultCityImage(),
};

function getBaseCurrency(): string {
  let lsValue = localStorage.getItem("baseCurrency");
  if (lsValue === null) {
    return "USD";
  }

  return lsValue;
}

const rootSlice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    setOpenRequiredFieldSnack(state, action: PayloadAction<boolean>) {
      state.openRequiredFieldSnack = action.payload;
    },
    setExchangeRate(state, action: PayloadAction<ExchangeRate>) {
      state.exchangeRate = action.payload;
    },
    setBaseCurrency(state, action: PayloadAction<string>) {
      state.baseCurrency = action.payload;
    },
    setCityImage(state, action: PayloadAction<CityImage>) {
      state.cityImage = action.payload;
    },
  },
});

export const {
  setOpenRequiredFieldSnack,
  setExchangeRate,
  setBaseCurrency,
  setCityImage,
} = rootSlice.actions;

export default rootSlice.reducer;
