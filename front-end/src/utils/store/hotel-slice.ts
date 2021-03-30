import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addDays } from "date-fns";
import { getDefaultGeolocation } from "../functions";
import { hotelPlaceholder } from "../placeholders";
import { HotelBooking, HotelBookingParams, HotelCoordinates } from "../types/hotel-types";
import { IATALocation } from "../types/location-types";

interface HotelReducer {
  reservationParams: HotelBookingParams;
  hotelDetail?: HotelBooking;
  allRoomAccordionsExpanded: boolean;
  openRedirecDialog: boolean;
  isHotelDetailsBlurred: boolean;
}

const defaultGeolocation: IATALocation = getDefaultGeolocation();

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
    longitude: Number(defaultGeolocation.lon),
    latitude: Number(defaultGeolocation.lat),
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
  allRoomAccordionsExpanded: false,
  openRedirecDialog: false,
  isHotelDetailsBlurred: false,
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

    updateHotelCoordinates(state, action: PayloadAction<HotelCoordinates>) {
      state.reservationParams.geolocation = {
        ...state.reservationParams.geolocation,
        ...action.payload,
      };
    },

    setRoomAccordionExpanded(state, action: PayloadAction<boolean>) {
      state.allRoomAccordionsExpanded = action.payload;
    },
    setOpenRedirecDialog(state, action: PayloadAction<boolean>) {
      state.openRedirecDialog = action.payload;
    },

    blurHotelDetails(state, action: PayloadAction<boolean>) {
      state.isHotelDetailsBlurred = action.payload;
    },
  },
});

export const {
  updateReservationParams,
  setHotelDetail,
  setOpenRedirecDialog,
  blurHotelDetails,
  setRoomAccordionExpanded,
  updateHotelCoordinates,
} = hotelSlice.actions;

export default hotelSlice.reducer;
