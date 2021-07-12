import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortCuisines } from "../functions";

interface RestaurantSlice {
  cuisines: RestaurantCuisine[];
  checkedCuisines: RestaurantCuisine[];
  restaurants: RestaurantSearch[];
  allRestaurants: RestaurantSearch[];
  filterParams: RestaurantFilterParams;
  loadingRestaurants: boolean;
  totalRestaurants: number;
}

const initialState: RestaurantSlice = {
  totalRestaurants: 0,
  cuisines: [],
  checkedCuisines: [],
  allRestaurants: [],
  loadingRestaurants: true,
  restaurants: [],
  filterParams: {
    cuisines: [],
  },
};

const restaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState,
  reducers: {
    setTotalRestaurants(state, action: PayloadAction<number>) {
      state.totalRestaurants = action.payload;
    },

    addRestaurantCuisines(state, action: PayloadAction<RestaurantCuisine[]>) {
      state.cuisines = sortCuisines([...state.cuisines, ...action.payload]);
    },

    updateRestaurantCuisines(state, action: PayloadAction<RestaurantCuisine[]>) {
      state.cuisines = action.payload;
    },
    /**
     * Marks as checked all the cuisines in the URL and updates
     * the store accordingly.
     */
    updateResCheckedCuisinesFromURL: {
      reducer(state, action: PayloadAction<RestaurantCuisine[]>) {
        state.cuisines = action.payload;
      },

      prepare(curCuisines: RestaurantCuisine[], cuisinesURL: string) {
        return {
          payload: getCuisinesListByURL(curCuisines, cuisinesURL),
        };
      },
    },
    setRestaurants(state, action: PayloadAction<RestaurantSearch[]>) {
      state.restaurants = action.payload;
    },
    setAllRestaurants(state, action: PayloadAction<RestaurantSearch[]>) {
      state.allRestaurants = action.payload;
    },
    setLoadingRestaurants(state, action: PayloadAction<boolean>) {
      state.loadingRestaurants = action.payload;
    },
    setRestaurantFilterParams(state, action: PayloadAction<RestaurantFilterParams>) {
      state.filterParams = action.payload;
    },

    setRestaurantFilterCuisines: {
      reducer(state, action: PayloadAction<RestaurantCuisine[]>) {
        state.filterParams.cuisines = action.payload;
      },

      prepare(curCuisines: RestaurantCuisine[], cuisinesURL: string) {
        return {
          payload: getCuisinesListByURL(curCuisines, cuisinesURL),
        };
      },
    },
  },
});

export const {
  setRestaurantFilterCuisines,
  setTotalRestaurants,
  setLoadingRestaurants,
  setRestaurants,
  setAllRestaurants,
  addRestaurantCuisines,
  updateResCheckedCuisinesFromURL,
  updateRestaurantCuisines,
  setRestaurantFilterParams,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;

/**
 * Returns a list of all the available cuisines, marking as 'checked'
 * those in the URL.
 */
function getCuisinesListByURL(curCuisines: RestaurantCuisine[], cuisinesURL: string) {
  //The cuisines in the URL are represented as their aliases.
  let aliases: string[] = cuisinesURL.split(",");

  let buffer: RestaurantCuisine[] = curCuisines.map((cuisine) => {
    if (aliases.includes(cuisine.alias)) {
      return { ...cuisine, checked: true };
    }
    return cuisine;
  });

  return sortCuisines(buffer);
}
