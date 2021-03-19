import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getDistinctCuisines } from "../functions";

interface RestaurantSlice {
  features: RestaurantFeature[];
  cuisines: RestaurantCuisine[];
  checkedFeatures: RestaurantFeature[];
  checkedCuisines: RestaurantCuisine[];
  restaurants: RestaurantSearch[];
  allRestaurants: RestaurantSearch[];
  filterParams: RestaurantFilterParams;
  loadingRestaurants: boolean;
}

const initialState: RestaurantSlice = {
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
    addRestaurantFeatures(state, action: PayloadAction<RestaurantFeature[]>) {
      state.features = [...state.features, ...action.payload].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },

    addRestaurantCuisines(state, action: PayloadAction<RestaurantCuisine[]>) {
      state.cuisines = [...state.cuisines, ...action.payload].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
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
        //The cuisines in the URL are represented as their aliases.
        let aliases: string[] = cuisinesURL.split(",");
        console.log("cuisinesURL: ", cuisinesURL);
        let updatedCuisines: RestaurantCuisine[] = curCuisines.map((cuisine) => {
          if (aliases.includes(cuisine.alias)) {
            return { ...cuisine, checked: true };
          }
          return cuisine;
        });

        return {
          payload: updatedCuisines,
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
  },
});

export const {
  addRestaurantFeatures,
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
