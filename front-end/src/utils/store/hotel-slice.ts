import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays, format } from "date-fns";
import { hotelPlaceholder } from "../placeholders";
import {
  HotelBooking,
  HotelBookingParams,
  HotelPax,
  HotelSearch,
} from "../types/hotel-types";

interface HotelReducer {
  reservationParams: HotelBookingParams;
  hotelDetail: HotelBooking;
  allRoomAccordionsExpanded: boolean;
}

const initialState: HotelReducer = {
  hotelDetail: hotelPlaceholder,
  allRoomAccordionsExpanded: false,
  reservationParams: {
    // occupancyParamsChanged: false,

    stay: {
      checkIn: addDays(new Date(), 1),
      checkOut: addDays(new Date(), 3),
    },
    occupancies: [
      {
        adults: 2,
        children: 0,
        paxes: [],
        rooms: 1,
      },
    ],

    geolocation: {
      longitude: 2.3522,
      latitude: 48.8566,
      radius: 15,
      unit: "km",
    },
    filter: {
      maxHotels: 250,
      minCategory: 1,
      minRate: 0,
    },
  },
};

const hotelSlice = createSlice({
  name: "hotelReducer",
  initialState,
  reducers: {
    setHotelDetail(state, action: PayloadAction<HotelBooking>) {
      state.hotelDetail = action.payload;
    },

    updateReservationParams(state, action: PayloadAction<any>) {
      state.reservationParams = { ...state.reservationParams, ...action.payload };
    },

    setRoomAccordionExpanded(state, action: PayloadAction<boolean>) {
      state.allRoomAccordionsExpanded = action.payload;
    },
  },
});

export const {
  updateReservationParams,
  setHotelDetail,
  setRoomAccordionExpanded,
} = hotelSlice.actions;

export default hotelSlice.reducer;
