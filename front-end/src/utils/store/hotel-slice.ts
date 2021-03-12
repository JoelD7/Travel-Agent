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
  openRedirecDialog: boolean;
}

const initialStateReservationParams = {
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
};

const initialState: HotelReducer = {
  hotelDetail: hotelPlaceholder,
  allRoomAccordionsExpanded: false,
  openRedirecDialog: false,
  reservationParams: {
    ...initialStateReservationParams,
    id: JSON.stringify(initialStateReservationParams),
  },
};

const hotelSlice = createSlice({
  name: "hotelReducer",
  initialState,
  reducers: {
    setHotelDetail(state, action: PayloadAction<HotelBooking>) {
      state.hotelDetail = action.payload;
    },

    updateReservationParams: {
      reducer(state, action) {
        state.reservationParams = action.payload;
      },

      prepare(reservationParams: any) {
        let id = JSON.stringify({ ...reservationParams });
        return {
          payload: { ...reservationParams, id },
          meta: "",
          error: false,
        };
      },
    },

    setRoomAccordionExpanded(state, action: PayloadAction<boolean>) {
      state.allRoomAccordionsExpanded = action.payload;
    },
    setOpenRedirecDialog(state, action: PayloadAction<boolean>) {
      state.openRedirecDialog = action.payload;
    },
  },
});

export const {
  updateReservationParams,
  setHotelDetail,
  setOpenRedirecDialog,
  setRoomAccordionExpanded,
} = hotelSlice.actions;

export default hotelSlice.reducer;
