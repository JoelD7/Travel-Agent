import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tripPlaceholder } from "../placeholders";
import { Trip, AlbumPicture } from "../types";
import { Favorite } from "../types/favorite-types";

interface TripSlice {
  tripDetail?: Trip;
  userTrips: Trip[];
  favPlaces: Favorite[];
  albumPictures: AlbumPicture[];
}

const initialState: TripSlice = {
  // tripDetail: tripPlaceholder,
  userTrips: [],
  albumPictures: [],
  favPlaces: [],
};

const tripSlice = createSlice({
  name: "tripSlice",
  initialState,

  reducers: {
    setTripDetail(state, action: PayloadAction<Trip>) {
      state.tripDetail = action.payload;
    },

    setFavorites(state, action: PayloadAction<Favorite[]>) {
      state.favPlaces = action.payload;
    },

    setAlbumPictures(state, action: PayloadAction<AlbumPicture[]>) {
      state.albumPictures = action.payload;
    },

    setUserTrips(state, action: PayloadAction<Trip[]>) {
      state.userTrips = action.payload;
    },
  },
});

export const { setTripDetail, setUserTrips, setAlbumPictures, setFavorites } =
  tripSlice.actions;

export default tripSlice.reducer;
