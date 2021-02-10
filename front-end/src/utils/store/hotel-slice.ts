import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { HotelPax, HotelSearch } from "../types/hotel-types";

interface HotelReducer {
  reservationParams: HotelSearch;
}

const initialState: HotelReducer = {
  reservationParams: {
    checkIn: addDays(new Date(), 1),
    checkOut: addDays(new Date(), 3),
    adults: 2,
    children: 0,
    paxes: [],
    rooms: 1,
    priceRange: [0, 500],
    stars: 0,
    occupancyParamsChanged: false,
  },
};

const hotelSlice = createSlice({
  name: "hotelReducer",
  initialState,
  reducers: {
    updateReservationParams(state, action: PayloadAction<any>) {
      state.reservationParams = { ...state.reservationParams, ...action.payload };
    },
  },
});

export const { updateReservationParams } = hotelSlice.actions;

export default hotelSlice.reducer;
