import { configureStore, createSelector } from "@reduxjs/toolkit";
import signUpReducer from "./signUpSlice";
import searchNavbarReducer from "./search-slice";
import calendarReducer from "./calendar-slice";
import poiReducer from "./poi-slice";
import hotelReducer from "./hotel-slice";
import flightSlice from "./flight-slice";
import rootSlice from "./root-slice";
import restaurantSlice from "./restaurant-slice";
import { useDispatch } from "react-redux";
import { enableBatching } from "redux-batched-actions";
export * from "./flight-slice";
export * from "./restaurant-slice";

const store = configureStore({
  reducer: {
    signUp: enableBatching(signUpReducer),
    searchNavbar: enableBatching(searchNavbarReducer),
    calendarSlice: enableBatching(calendarReducer),
    poiReducer: enableBatching(poiReducer),
    hotelReducer: enableBatching(hotelReducer),
    flightSlice: enableBatching(flightSlice),
    restaurantSlice: enableBatching(restaurantSlice),
    rootSlice: enableBatching(rootSlice),
  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

//Selectors

//#region Root
export const selectOpenRequiredFieldSnack = (state: RootState) =>
  state.rootSlice.openRequiredFieldSnack;

export const selectExchangeRate = (state: RootState) => state.rootSlice.exchangeRate;

export const selectBaseCurrency = (state: RootState) => state.rootSlice.baseCurrency;
//#endregion

//#region Search
export const selectGeolocation = (state: RootState) => state.searchNavbar.geolocation;
//#endregion

//#region POI
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
//#endregion

//#region Hotel
export const selectHotelReservationParams = (state: RootState) =>
  state.hotelReducer.reservationParams;

export const selectHotelDetail = (state: RootState) => state.hotelReducer.hotelDetail;

export const selectRoomAccordionExpanded = (state: RootState) =>
  state.hotelReducer.allRoomAccordionsExpanded;

export const selectOpenRedirecDialog = (state: RootState) =>
  state.hotelReducer.openRedirecDialog;

export const selectIsHotelDetailsBlurred = (state: RootState) =>
  state.hotelReducer.isHotelDetailsBlurred;

//#endregion

//#region AirportCity search
export const selectSearchQuery = (state: RootState) => state.searchNavbar.query;
export const selectCityPredictions = (state: RootState) =>
  state.searchNavbar.cityPredictions;

export const selectAirportPredictions = (state: RootState) =>
  state.searchNavbar.airportPredictions;

//#endregion

//#region Flight
export const selectFlightParams = (state: RootState) => state.flightSlice;
export const selectFlightFromAutocomplete = (state: RootState) =>
  state.flightSlice.flightFromAutocomplete;
export const selectFlightToAutocomplete = (state: RootState) =>
  state.flightSlice.flightToAutocomplete;

export const selectFlightListURL = (state: RootState) => state.flightSlice.flightListURL;
export const selectFlightDictionaries = (state: RootState) =>
  state.flightSlice.dictionaries;

export const selectFlightType = (state: RootState) => state.flightSlice.flightType;

//#endregion

//#region Restaurant
export const selectRestaurantFeatures = createSelector(
  (state: RootState) => state.restaurantSlice.features,
  (features) => features
);
export const selectRestaurantCuisines = createSelector(
  (state: RootState) => state.restaurantSlice.cuisines,
  (cuisines) => cuisines
);
export const selectRestaurants = (state: RootState) => state.restaurantSlice.restaurants;
export const selectAllRestaurants = (state: RootState) =>
  state.restaurantSlice.allRestaurants;

export const selectCheckedRestaurantCuisines = (state: RootState) =>
  state.restaurantSlice.checkedCuisines;

export const selectCheckedRestaurantFeatures = (state: RootState) =>
  state.restaurantSlice.checkedFeatures;

export const selectLoadingRestaurants = (state: RootState) =>
  state.restaurantSlice.loadingRestaurants;

export const selectRestaurantFilterParams = (state: RootState) =>
  state.restaurantSlice.filterParams;
//#endregion

export default store;
