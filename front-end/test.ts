interface CalendarItem {
  a: string;
}

interface CalendarItemHolder {
  holder: {
    [dateIndex: number]: { calendarItems: CalendarItem[] };
  };
}

let state: CalendarItemHolder = {
  holder: {
    12: { calendarItems: [] },
  },
};

let stateTwo = {
  ...state,
  holder: { ...state.holder, [45]: { calendarItems: [{ a: "klk" }] } },
};

console.log(JSON.stringify(stateTwo));
