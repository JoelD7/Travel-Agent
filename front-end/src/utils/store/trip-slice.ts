import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tripPlaceholder } from "../placeholders";
import { Trip, AlbumPicture } from "../types";

interface TripSlice {
  tripDetail: Trip;
  userTrips: Trip[];
  albumPictures: AlbumPicture[];
  autoDeletePicture: boolean;
}

const initialState: TripSlice = {
  tripDetail: tripPlaceholder,
  userTrips: [],
  albumPictures: [],
  autoDeletePicture: false,
};

const tripSlice = createSlice({
  name: "tripSlice",
  initialState,

  reducers: {
    setTripDetail(state, action: PayloadAction<Trip>) {
      state.tripDetail = action.payload;
    },

    setAlbumPictures(state, action: PayloadAction<AlbumPicture[]>) {
      state.albumPictures = action.payload;
    },

    setUserTrips(state, action: PayloadAction<Trip[]>) {
      state.userTrips = action.payload;
    },

    setAutoDeletePicture(state, action: PayloadAction<boolean>) {
      state.autoDeletePicture = action.payload;
    },
  },
});

export const { setTripDetail, setAutoDeletePicture, setUserTrips, setAlbumPictures } =
  tripSlice.actions;

export default tripSlice.reducer;
