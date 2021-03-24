import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RootSlice {
  openRequiredFieldSnack: boolean;
}

const initialState: RootSlice = {
  openRequiredFieldSnack: false,
};

const rootSlice = createSlice({
  name: "rootSlice",
  initialState,
  reducers: {
    setOpenRequiredFieldSnack(state, action: PayloadAction<boolean>) {
      state.openRequiredFieldSnack = action.payload;
    },
  },
});

export const { setOpenRequiredFieldSnack } = rootSlice.actions;

export default rootSlice.reducer;
