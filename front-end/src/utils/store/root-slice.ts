import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExchangeRate } from "../types";

interface RootSlice {
  openRequiredFieldSnack: boolean;
  exchangeRate: ExchangeRate;
  baseCurrency: string;
}

const initialState: RootSlice = {
  openRequiredFieldSnack: false,
  exchangeRate: JSON.parse(String(localStorage.getItem("rates"))),
  baseCurrency: getBaseCurrency(),
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
  },
});

export const {
  setOpenRequiredFieldSnack,
  setExchangeRate,
  setBaseCurrency,
} = rootSlice.actions;

export default rootSlice.reducer;
