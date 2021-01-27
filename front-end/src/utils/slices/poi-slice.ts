import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { poisPlaceholder } from "../placeholders";

interface PayloadType {
  pois: POISearch[];
  allPois: POISearch[];
  loadingPOICard: boolean;
  loadingCategories: boolean;
}

const initialState: PayloadType = {
  pois: poisPlaceholder,
  allPois: poisPlaceholder,
  loadingPOICard: true,
  loadingCategories: true,
};

export const getPoisThunk = createAsyncThunk(
  "poiReducer/getPoisThunk",
  async (ll: string, thunkAPI) => {
    try {
      const res = await Axios.get("https://api.foursquare.com/v2/venues/search", {
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
      let pois: POISearch[] = res.data.response.venues;

      thunkAPI.dispatch(poiSlice.actions.getPOIs([...pois]));

      return res.data.response.venues;
    } catch (error) {
      console.log(error);
    }
  }
);

const poiSlice = createSlice({
  name: "poiReducer",
  initialState,
  reducers: {
    getPOIs(state, action) {
      return { ...state, loadingPOICard: false, pois: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPoisThunk.fulfilled, (state, action) => {});
  },
});

export const selectPOIs = (state: any) => state.poiReducer.pois;
export const selectLoadingPOICard = (state: any) => state.poiReducer.loadingPOICard;
export const selectAllPOIs = (state: any) => state.poiReducer.allPois;

export const {} = poiSlice.actions;
export default poiSlice.reducer;
