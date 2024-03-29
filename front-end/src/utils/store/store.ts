import {
  AnyAction,
  combineReducers,
  configureStore,
  createSelector,
  Reducer,
} from "@reduxjs/toolkit";
import signUpReducer from "./signUpSlice";
import searchNavbarReducer from "./search-slice";
import calendarReducer from "./calendar-slice";
import poiReducer from "./poi-slice";
import hotelReducer from "./hotel-slice";
import flightSlice from "./flight-slice";
import rootSlice from "./root-slice";
import restaurantSlice from "./restaurant-slice";
import carSlice from "./car-slice";
import authSlice from "./auth-slice";
import tripSlice from "./trip-slice";
import { useDispatch } from "react-redux";
import { enableBatching } from "redux-batched-actions";

const combinedReducer = combineReducers({
  signUp: enableBatching(signUpReducer),
  searchNavbar: enableBatching(searchNavbarReducer),
  calendarSlice: enableBatching(calendarReducer),
  poiReducer: enableBatching(poiReducer),
  hotelReducer: enableBatching(hotelReducer),
  flightSlice: enableBatching(flightSlice),
  restaurantSlice: enableBatching(restaurantSlice),
  carSlice: enableBatching(carSlice),
  rootSlice: enableBatching(rootSlice),
  tripSlice: enableBatching(tripSlice),
  authSlice: enableBatching(authSlice),
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === "authSlice/setLogout") {
    state = {} as RootState;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

//Selectors

//#region Root
export const selectOpenRequiredFieldSnack = (state: RootState) =>
  state.rootSlice.openRequiredFieldSnack;

export const selectExchangeRate = (state: RootState) => state.rootSlice.exchangeRate;

export const selectUserCurrency = (state: RootState) => state.rootSlice.userCurrency;

export const selectCityImage = (state: RootState) => state.rootSlice.cityImage;

export const selectIdPerson = (state: RootState) => state.rootSlice.idPerson;

export const selectTripperLogoImg = (state: RootState) => state.rootSlice.tripperLogoImg;

//#endregion

//#region Trip
export const selectTripDetail = (state: RootState) => state.tripSlice.tripDetail;
export const selectLastTrip = (state: RootState) => state.tripSlice.lastTrip;
export const selectUserTrips = (state: RootState) => state.tripSlice.userTrips;
export const selectAlbumPictures = (state: RootState) => state.tripSlice.albumPictures;
export const selectFavorites = (state: RootState) => state.tripSlice.favPlaces;
export const selectCreateTripReferrer = (state: RootState) =>
  state.tripSlice.createTripReferrer;

//#endregion

//#region Search
export const selectOriginCity = (state: RootState) => state.searchNavbar.originCity;
export const selectDestinationCity = (state: RootState) =>
  state.searchNavbar.destinationCity;
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

export const selectHotelRsv = (state: RootState) => state.hotelReducer.hotelRsv;

export const selectHotelReservations = (state: RootState) =>
  state.hotelReducer.hotelReservations;

//#endregion

//#region AirportCity search
export const selectSearchQuery = (state: RootState) => state.searchNavbar.query;
export const selectCityPredictions = (state: RootState) =>
  state.searchNavbar.cityPredictions;

export const selectAirportPredictions = (state: RootState) =>
  state.searchNavbar.airportPredictions;

//#endregion

//#region Flight
export const selectFlightSearchParams = (state: RootState) => state.flightSlice;
export const selectFlightFromAutocomplete = (state: RootState) =>
  state.flightSlice.flightFromAutocomplete;
export const selectFlightToAutocomplete = (state: RootState) =>
  state.flightSlice.flightToAutocomplete;

export const selectFlightListURL = (state: RootState) => state.flightSlice.flightListURL;
export const selectFlightDictionaries = (state: RootState) =>
  state.flightSlice.dictionaries;

export const selectFlightType = (state: RootState) => state.flightSlice.flightType;

export const selectFlightDetail = (state: RootState) => state.flightSlice.flightDetail;

//#endregion

//#region Restaurant
export const selectRestaurantCuisines = createSelector(
  (state: RootState) => state.restaurantSlice.cuisines,
  (cuisines) => cuisines
);
export const selectRestaurants = (state: RootState) => state.restaurantSlice.restaurants;
export const selectAllRestaurants = (state: RootState) =>
  state.restaurantSlice.allRestaurants;

export const selectCheckedRestaurantCuisines = (state: RootState) =>
  state.restaurantSlice.checkedCuisines;

export const selectLoadingRestaurants = (state: RootState) =>
  state.restaurantSlice.loadingRestaurants;

export const selectRestaurantFilterParams = (state: RootState) =>
  state.restaurantSlice.filterParams;

export const selectTotalRestaurants = (state: RootState) =>
  state.restaurantSlice.totalRestaurants;
//#endregion

//#region Car rental
export const selectCarReducer = (state: RootState) => state.carSlice;
export const selectCarSearch = (state: RootState) => state.carSlice.carSearch;
export const selectCarRsv = (state: RootState) => state.carSlice.carRsv;
export const selectCarReservations = (state: RootState) => state.carSlice.carReservations;
export const selectCarSearchBrands = (state: RootState) => state.carSlice.brands;
export const selectCarSearchFeatures = (state: RootState) => state.carSlice.features;
export const selectCarSearchTransmission = (state: RootState) =>
  state.carSlice.transmission;
//#endregion

//#region Auth
export const selectPerson = (state: RootState) => state.authSlice.person;

export const selectIsAuthenticated = (state: RootState) =>
  state.authSlice.isAuthenticated;

export const selectLoginReferrer = (state: RootState) => state.authSlice.loginReferrer;
//#endregion

export default store;
