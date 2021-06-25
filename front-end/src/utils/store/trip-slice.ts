import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { backend } from "../external-apis";
import { responseTripToDomainTrip } from "../functions";
import { AlbumPicture, Trip } from "../types";
import { Favorite } from "../types/favorite-types";
import { AppDispatch, RootState } from "./store";

interface TripSlice {
  tripDetail?: Trip;
  lastTrip?: Trip;
  userTrips?: Trip[];
  favPlaces: Favorite[];
  albumPictures: AlbumPicture[];
}

type ThunkAPIType = {
  dispatch: AppDispatch;
  state: RootState;
};

export const fetchUserTrips = createAsyncThunk<Trip[], null, ThunkAPIType>(
  "tripSlice/fetchUserTrips",
  (_, thunkAPI) => {
    let idPerson = thunkAPI.getState().rootSlice.idPerson;
    let person = thunkAPI.getState().authSlice.person;

    return backend
      .get(`/trip/all?personUuid=${person ? person.uuid : "0"}`)
      .then((response) => {
        let tripsInResponse = response.data._embedded.tripList;
        let tripsBuffer = tripsInResponse.map((resTrip: any) =>
          responseTripToDomainTrip(resTrip)
        );

        return tripsBuffer;
      })
      .catch((error) => {});
  }
);

export const fetchFavorites = createAsyncThunk<Favorite[], null, ThunkAPIType>(
  "tripSlice/fetchFavorites",
  async (_, thunkAPI) => {
    let idPerson = thunkAPI.getState().rootSlice.idPerson;
    let person = thunkAPI.getState().authSlice.person;
    let favPlaces: Favorite[] = thunkAPI.getState().tripSlice.favPlaces;

    if (favPlaces.length === 0) {
      const response = await backend.get(
        `/favorite/all?personUuid=${person ? person.uuid : "0"}`
      );
      return response.data._embedded.favoriteList;
    }

    return favPlaces;
  }
);

const initialState: TripSlice = {
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

    setLastTrip(state, action: PayloadAction<Trip>) {
      state.lastTrip = action.payload;
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

  extraReducers: (builder) => {
    builder.addCase(fetchUserTrips.fulfilled, (state, action) => {
      state.userTrips = action.payload;
    });

    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favPlaces = action.payload;
    });
  },
});

export const {
  setTripDetail,
  setUserTrips,
  setLastTrip,
  setAlbumPictures,
  setFavorites,
} = tripSlice.actions;

export default tripSlice.reducer;
