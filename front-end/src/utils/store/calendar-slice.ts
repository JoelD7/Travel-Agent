import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarItem } from "../types/trip-types";

interface CalendarItemHolder {
  holder: {
    [dateIndex: number]: { calendarItems: CalendarItem[] };
  };
}

interface PayloadTypeCalendar {
  dateIndex: number;
  calendarItems: CalendarItem[];
}

const initialState: CalendarItemHolder = {
  holder: {
    12: { calendarItems: [] },
  },
};

const calendarSlice = createSlice({
  name: "calendarSlice",
  initialState,
  reducers: {
    addCalendarItems(state, action: PayloadAction<PayloadTypeCalendar>) {
      let dateIndex = action.payload.dateIndex;
      let calendarItems = action.payload.calendarItems;
      let keys = [];
      for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
          keys.push(key);
        }
      }
      return {
        ...state,
        holder: { ...state.holder, [dateIndex]: { calendarItems: calendarItems } },
      };
    },
  },
});

export const calendarItemHolderSelect = (calendarState: CalendarItemHolder) =>
  calendarState.holder;
export const { addCalendarItems } = calendarSlice.actions;
export default calendarSlice.reducer;
