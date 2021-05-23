import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultCityImage } from "../functions";
import { tripPlaceholder } from "../placeholders";
import { CityImage, ExchangeRate, Trip } from "../types";

interface RootSlice {
  openRequiredFieldSnack: boolean;
  exchangeRate: ExchangeRate;
  userCurrency: string;
  cityImage: CityImage;
  tripDetail: Trip;
}

const initialState: RootSlice = {
  openRequiredFieldSnack: false,
  exchangeRate: JSON.parse(String(localStorage.getItem("rates"))),
  userCurrency: getUserCurrency(),
  cityImage: getDefaultCityImage(),
  tripDetail: tripPlaceholder,
};

function getUserCurrency(): string {
  let lsValue = localStorage.getItem("userCurrency");
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
    setEndCurrency(state, action: PayloadAction<string>) {
      state.userCurrency = action.payload;
    },
    setCityImage(state, action: PayloadAction<CityImage>) {
      state.cityImage = action.payload;
    },
    setTripDetail(state, action: PayloadAction<Trip>) {
      state.tripDetail = action.payload;
    },
  },
});

export const {
  setOpenRequiredFieldSnack,
  setExchangeRate,
  setEndCurrency,
  setCityImage,
  setTripDetail,
} = rootSlice.actions;

export default rootSlice.reducer;
