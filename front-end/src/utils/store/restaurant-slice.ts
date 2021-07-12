import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortCuisines } from "../functions";

interface RestaurantSlice {
  features: RestaurantFeature[];
  cuisines: RestaurantCuisine[];
  checkedFeatures: RestaurantFeature[];
  checkedCuisines: RestaurantCuisine[];
  restaurants: RestaurantSearch[];
  allRestaurants: RestaurantSearch[];
  filterParams: RestaurantFilterParams;
  loadingRestaurants: boolean;
  totalRestaurants: number;
}

const initialState: RestaurantSlice = {
  totalRestaurants: 0,
  features: [],
  cuisines: [],
  checkedFeatures: [],
  checkedCuisines: [],
  allRestaurants: [],
  loadingRestaurants: true,
  restaurants: [],
  filterParams: {
    features: [],
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
    addRestaurantFeatures(state, action: PayloadAction<RestaurantFeature[]>) {
      state.features = [...state.features, ...action.payload].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },

    addRestaurantCuisines(state, action: PayloadAction<RestaurantCuisine[]>) {
      state.cuisines = sortCuisines([...state.cuisines, ...action.payload]);
    },

    updateRestaurantFeatures(state, action: PayloadAction<RestaurantFeature[]>) {
      state.features = action.payload;
    },
    updateRestaurantCuisines(state, action: PayloadAction<RestaurantCuisine[]>) {
      state.cuisines = action.payload;
    },
    updateRestaurantCheckedFeatures: {
      reducer(state, action: PayloadAction<RestaurantFeature[]>) {
        state.features = action.payload;
      },

      prepare(curFeatures: RestaurantFeature[], featuresURL: string) {
        //The features in the URL are represented as their names.
        let names: string[] = featuresURL.split(",");

        let updatedFeatures: RestaurantFeature[] = curFeatures.map((feature) => {
          if (names.includes(feature.name)) {
            return { ...feature, checked: true };
          }
          return feature;
        });

        return {
          payload: updatedFeatures,
        };
      },
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
  addRestaurantFeatures,
  setTotalRestaurants,
  setLoadingRestaurants,
  setRestaurants,
  setAllRestaurants,
  addRestaurantCuisines,
  updateRestaurantCheckedFeatures,
  updateResCheckedCuisinesFromURL,
  updateRestaurantFeatures,
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
