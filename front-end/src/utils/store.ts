import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";
import searchNavbarReducer from "./slices/search-slice";
import calendarReducer from "./slices/calendar-slice";
import poiReducer from "./slices/poi-slice";

export default configureStore({
  reducer: {
    signUp: signUpReducer,
    searchNavbar: searchNavbarReducer,
    calendarSlice: calendarReducer,
    poiReducer: poiReducer,
  },
});
