import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { useDispatch } from "react-redux";

interface SearchType {
  query: string;
}

interface PayloadType {
  value: string;
}

const initialState: SearchType = {
  query: "",
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
  },
});

export const selectSearchQuery = (state: SearchType) => state.query;
export const { onQueryChanged } = searchSlice.actions;
export default searchSlice.reducer;
