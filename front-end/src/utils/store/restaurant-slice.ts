import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getRestaurantCategoriesList,
  getRestaurantTransactions,
  hasAny,
} from "../functions";
import { restaurantPlaceholder, restaurantsPlaceholder } from "../placeholders";

interface RestaurantSlice {
  features: RestaurantFilter[];
  cuisines: RestaurantFilter[];
  restaurants: RestaurantSearch[];
}

const initialState: RestaurantSlice = {
  features: [],
  cuisines: [],
  restaurants: restaurantsPlaceholder,
};

const restaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState,
  reducers: {
    addRestaurantFeatures: {
      reducer(state, action: PayloadAction<RestaurantFilter[]>) {
        state.features = [...state.features, ...action.payload].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      },
      //Add feature if it isn's included already
      prepare(curFeatures: RestaurantFilter[], restaurants: RestaurantSearch[]) {
        let features: any[] = [];
        restaurants.forEach((r) => {
          let arr = getRestaurantTransactions(r).split(", ");
          features = [...features, ...arr];
        });

        let curFeaturesString = curFeatures.map((ft) => ft.name);
        let newFeatures: RestaurantFilter[] = [];

        let featuresSet = new Set([...features]);

        featuresSet.forEach((ft) => {
          if (!curFeaturesString.includes(ft)) {
            newFeatures.push({ name: ft, checked: false });
          }
        });

        return {
          payload: newFeatures,
        };
      },
    },
    addRestaurantCuisines: {
      reducer(state, action: PayloadAction<RestaurantFilter[]>) {
        state.cuisines = [...state.cuisines, ...action.payload].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      },
      //Add feature if it isn's included already
      prepare(curCuisines: RestaurantFilter[], restaurants: RestaurantSearch[]) {
        let cuisines: any[] = [];
        restaurants.forEach((r) => {
          let arr = getRestaurantCategoriesList(r).split(", ");
          cuisines = [...cuisines, ...arr];
        });

        let curCuisinesString = curCuisines.map((ft) => ft.name);
        let newCuisines: RestaurantFilter[] = [];

        let cuisinesSet = new Set([...cuisines]);

        cuisinesSet.forEach((ft) => {
          if (!curCuisinesString.includes(ft)) {
            newCuisines.push({ name: ft, checked: false });
          }
        });

        return {
          payload: newCuisines,
        };
      },
    },
    updateRestaurantFeatures(state, action: PayloadAction<RestaurantFilter[]>) {
      state.features = action.payload;
    },
    updateRestaurantCuisines(state, action: PayloadAction<RestaurantFilter[]>) {
      state.cuisines = action.payload;
    },
    setRestaurants(state, action: PayloadAction<RestaurantSearch[]>) {
      state.restaurants = action.payload;
    },
  },
});

export const {
  addRestaurantFeatures,
  setRestaurants,
  addRestaurantCuisines,
  updateRestaurantFeatures,
  updateRestaurantCuisines,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
