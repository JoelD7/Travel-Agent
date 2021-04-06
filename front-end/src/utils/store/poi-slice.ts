import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { getPOICategoryParent } from "../functions/functions";
import { poisPlaceholder } from "../placeholders";
import { POICategories, POICategoryFetch, POICategorySearch } from "../POICategory";
import { AppDispatch, RootState } from "./store";

interface POICategoryGroup {
  category: string;
  ll: string;
  pois: POISearch[];
}

interface POIState {
  pois: POISearch[];
  allPois: POISearch[];
  loadingPOICard: boolean;
  loadingCategories: boolean;
  availableCategories: POICategorySearch[];
  /**
   * This object groups POIs by category(first index),
   * then by coordinate(second index).
   */
  poisByCategory: { [index: string]: { [index: string]: POISearch[] } };
  consultedCategories: string[];
  consultedCoordinates: string[];
}

const initialState: POIState = {
  pois: poisPlaceholder,
  allPois: poisPlaceholder,
  availableCategories: [],
  loadingPOICard: true,
  loadingCategories: true,
  poisByCategory: {
    category: {
      coordinate: [],
    },
  },
  consultedCategories: [],
  consultedCoordinates: [],
};

export const fetchPOIs = createAsyncThunk(
  "poiReducer/getPoisThunk",
  async (ll: string, thunkAPI) => {
    const response = await Axios.get("https://api.foursquare.com/v2/venues/search", {
      headers: {
        "Accept-Language": "en",
      },
      params: {
        ll: ll,
        categoryId:
          "4deefb944765f83613cdba6e,4bf58dd8d48988d17f941735,4bf58dd8d48988d181941735,4bf58dd8d48988d1e5931735,4bf58dd8d48988d137941735,4bf58dd8d48988d184941735,4bf58dd8d48988d182941735,4bf58dd8d48988d17b941735,4bf58dd8d48988d116941735,4bf58dd8d48988d11f941735,4bf58dd8d48988d175941735,4bf58dd8d48988d1e2941735,52e81612bcbc57f1066b7a21,4bf58dd8d48988d1e9941735,4bf58dd8d48988d103951735,4bf58dd8d48988d1fd941735",
        client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
        client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
        v: "20210104",
        radius: "100000",
      },
    });

    return response.data;
  }
);

type thunkAPITypeObject = {
  dispatch: AppDispatch;
  state: RootState;
};

export const fetchPOIsOfCategory = createAsyncThunk<
  POISearch[],
  POICategoryFetch,
  thunkAPITypeObject
>("poiReducer/getPOIsofCategoryThunk", (params: POICategoryFetch, thunkAPI) => {
  let category: POICategorySearch = params.category;
  let ll: string = params.ll;

  return Axios.get("https://api.foursquare.com/v2/venues/search", {
    params: {
      ll: ll,
      categoryId: `${category.id}`,
      client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
      client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
      v: "20210104",
      radius: "100000",
    },
  })
    .then((res) => {
      return res.data.response.venues;
    })
    .catch((error) => {
      console.log(error);
    });
});

const poiSlice = createSlice({
  name: "poiReducer",
  initialState,
  reducers: {
    setPOIs(state, action: PayloadAction<POISearch[]>) {
      state.loadingPOICard = false;
      state.pois = action.payload;
    },

    addPOIsByCategoryGroup(state, action: PayloadAction<POICategoryGroup>) {
      let category = action.payload.category;
      let coordinate = action.payload.ll;

      state.poisByCategory[category] = {
        [coordinate]: action.payload.pois,
      };

      state.consultedCategories = [...state.consultedCategories, category];

      if (!state.consultedCoordinates.includes(coordinate)) {
        state.consultedCoordinates = [...state.consultedCoordinates, coordinate];
      }
    },

    onLoadingPOICardChange(state, action: PayloadAction<boolean>) {
      state.loadingPOICard = action.payload;
    },

    setAvailableCategories: {
      reducer(state, action) {
        state.loadingCategories = false;
        state.availableCategories = action.payload;
      },
      /**
       * Returns the categories included in allPois.
       * This to avoid the user from selecting a
       * category in the UI with no pois.
       * @param allPois
       */
      prepare(allPois: POISearch[]) {
        let categoryNameBuffer: string[] = [];
        let availableCategoriesBuffer: any[] = [];

        allPois.forEach((poi) => {
          let name = getPOICategoryParent(poi.categories[0].id);
          if (!categoryNameBuffer.includes(name)) {
            categoryNameBuffer.push(name);
          }
        });

        POICategories.forEach((poiCategory: POICategorySearch) => {
          let name = getPOICategoryParent(poiCategory.id);
          if (categoryNameBuffer.includes(name)) {
            availableCategoriesBuffer.push(poiCategory);
          }
        });

        return {
          payload: availableCategoriesBuffer,
          meta: "",
          error: false,
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPOIs.fulfilled, (state, action) => {
      let pois: POISearch[] = action.payload.response.venues;
      state.pois = pois;
      state.loadingPOICard = false;
    });

    builder.addCase(fetchPOIsOfCategory.fulfilled, (state, action) => {
      let filteredPois: POISearch[] = action.payload;
      state.pois = filteredPois;
      state.loadingPOICard = false;
    });
  },
});

export const {
  setAvailableCategories,
  onLoadingPOICardChange,
  setPOIs,
  addPOIsByCategoryGroup,
} = poiSlice.actions;
export default poiSlice.reducer;
