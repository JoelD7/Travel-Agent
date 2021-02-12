import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { CitySearch } from "../types/location-types";

interface SearchType {
  query: string;
  cityPredictions: CitySearch[];
}

interface PayloadType {
  value: string;
}

const initialState: SearchType = {
  query: " ",
  cityPredictions: [],
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
    updateCityPredictions(state, action: PayloadAction<CitySearch[]>) {
      state.cityPredictions = action.payload;
    },
  },
});

export const { onQueryChanged, updateCityPredictions } = searchSlice.actions;
export default searchSlice.reducer;
