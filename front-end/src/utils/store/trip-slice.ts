import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tripPlaceholder } from "../placeholders";
import { Trip } from "../types";

interface TripSlice {
  tripDetail: Trip;
  userTrips: Trip[];
}

const initialState: TripSlice = {
  tripDetail: tripPlaceholder,
  userTrips: [],
};

const tripSlice = createSlice({
  name: "tripSlice",
  initialState,

  reducers: {
    setTripDetail(state, action: PayloadAction<Trip>) {
      state.tripDetail = action.payload;
    },

    setUserTrips(state, action: PayloadAction<Trip[]>) {
      state.userTrips = action.payload;
    },
  },
});

export const { setTripDetail, setUserTrips } = tripSlice.actions;

export default tripSlice.reducer;
