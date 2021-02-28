import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getDistinctCuisines,
  getRestaurantCategoriesList,
  getRestaurantTransactions,
  hasAny,
} from "../functions";
import { restaurantPlaceholder, restaurantsPlaceholder } from "../placeholders";

interface RestaurantSlice {
  features: RestaurantFilter[];
  cuisines: RestaurantCuisine[];
  checkedFeatures: RestaurantFilter[];
  checkedCuisines: RestaurantCuisine[];
  restaurants: RestaurantSearch[];
  allRestaurants: RestaurantSearch[];
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
          let arr = r.transactions.filter((e) => e !== "");
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
      reducer(state, action: PayloadAction<RestaurantCuisine[]>) {
        state.cuisines = [...state.cuisines, ...action.payload].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      },
      //Add feature if it isn's included already
      prepare(curCuisines: RestaurantCuisine[], restaurants: RestaurantSearch[]) {
        let cuisines: any[] = [];
        restaurants.forEach((r) => {
          let arr = r.categories;
          cuisines = [...cuisines, ...arr];
        });

        let curCuisinesString = curCuisines.map((ft) => ft.title);
        let newCuisines: RestaurantCuisine[] = [];

        let cuisinesSet = getDistinctCuisines(cuisines);

        cuisinesSet.forEach((ft) => {
          if (!curCuisinesString.includes(ft.title)) {
            newCuisines.push({ title: ft.title, alias: ft.alias, checked: false });
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
    updateRestaurantCuisines(state, action: PayloadAction<RestaurantCuisine[]>) {
      state.cuisines = action.payload;
    },
    updateRestaurantCheckedFeatures(state, action: PayloadAction<RestaurantFilter[]>) {
      state.checkedFeatures = action.payload;
    },
    updateRestaurantCheckedCuisines(state, action: PayloadAction<RestaurantCuisine[]>) {
      state.checkedCuisines = action.payload;
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
  },
});

export const {
  addRestaurantFeatures,
  setLoadingRestaurants,
  setRestaurants,
  setAllRestaurants,
  addRestaurantCuisines,
  updateRestaurantCheckedFeatures,
  updateRestaurantCheckedCuisines,
  updateRestaurantFeatures,
  updateRestaurantCuisines,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
