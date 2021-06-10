import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { compareDesc } from "date-fns";
import { AlbumPicture, Trip } from "../types";
import { Favorite } from "../types/favorite-types";

interface TripSlice {
  tripDetail?: Trip;
  lastTrip?: Trip;
  userTrips: Trip[];
  favPlaces: Favorite[];
  albumPictures: AlbumPicture[];
}

const initialState: TripSlice = {
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

    setLastTrip: {
      reducer(state, action: PayloadAction<Trip>) {
        state.lastTrip = action.payload;
      },

      prepare(userTrips: Trip[]) {
        let lastTrip: Trip = [...userTrips].sort((a, b) =>
          compareDesc(a.endDate, b.endDate)
        )[0];

        return {
          payload: lastTrip,
        };
      },
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

export const {
  setTripDetail,
  setLastTrip,
  setUserTrips,
  setAlbumPictures,
  setFavorites,
} = tripSlice.actions;

export default tripSlice.reducer;
