import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./signUpSlice";
import searchNavbarReducer from "./search-slice";
import calendarReducer from "./calendar-slice";
import poiReducer from "./poi-slice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    searchNavbar: searchNavbarReducer,
    calendarSlice: calendarReducer,
    poiReducer: poiReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

//Selectors

//POI
export const selectPOIs = (state: RootState) => state.poiReducer.pois;
export const selectAllPOIs = (state: RootState) => state.poiReducer.allPois;
export const selectAvailableCategories = (state: RootState) =>
  state.poiReducer.availableCategories;

export const selectLoadingPOICard = (state: RootState) => state.poiReducer.loadingPOICard;

export const selectLoadingCategories = (state: RootState) =>
  state.poiReducer.loadingCategories;

export const selectConsultedCategories = (state: RootState) =>
  state.poiReducer.consultedCategories;

export const selectConsultedCoordinates = (state: RootState) =>
  state.poiReducer.consultedCoordinates;

export const selectPOIsByCategory = (state: RootState) => state.poiReducer.poisByCategory;

export default store;
