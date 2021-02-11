import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { hotelPlaceholder } from "../placeholders";
import { HotelBooking, HotelPax, HotelSearch } from "../types/hotel-types";

interface HotelReducer {
  reservationParams: HotelSearch;
  hotelDetail: HotelBooking;
  allRoomAccordionsExpanded: boolean;
}

const initialState: HotelReducer = {
  hotelDetail: hotelPlaceholder,
  allRoomAccordionsExpanded: false,
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
