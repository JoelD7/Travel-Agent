import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDefaultCityImage } from "../functions";
import { CityImage, ExchangeRate, Person, Trip } from "../types";

interface RootSlice {
  idPerson: number;
  openRequiredFieldSnack: boolean;
  exchangeRate: ExchangeRate;
  userCurrency: string;
  cityImage: CityImage;
}

const initialState: RootSlice = {
  idPerson: 0,
  openRequiredFieldSnack: false,
  exchangeRate: JSON.parse(String(localStorage.getItem("rates"))),
  userCurrency: getUserCurrency(),
  cityImage: getDefaultCityImage(),
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
    setIdPerson(state, action: PayloadAction<number>) {
      state.idPerson = action.payload;
    },

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
  },
});

export const {
  setOpenRequiredFieldSnack,
  setExchangeRate,
  setEndCurrency,
  setIdPerson,
  setCityImage,
} = rootSlice.actions;

export default rootSlice.reducer;
