import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarItem } from "../types/Trip";

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
          //   const element = state[key];
          keys.push(key);
        }
      }

      //   console.log("State indexes: ", keys);
      //   console.log(
      //     JSON.stringify({ ...state, [dateIndex]: { calendarItems: calendarItems } })
      //   );

      return { ...state, [dateIndex]: { calendarItems: calendarItems } };
    },
  },
});

export const calendarItemHolderSelect = (calendarState: CalendarItemHolder) =>
  calendarState.holder;
export const { addCalendarItems } = calendarSlice.actions;
export default calendarSlice.reducer;
