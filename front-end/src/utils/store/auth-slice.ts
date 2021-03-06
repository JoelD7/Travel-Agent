import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "../types";

interface RootState {
  person?: Person;
  loginReferrer: string;
  isAuthenticated: boolean;
}

const initialState: RootState = {
  isAuthenticated: false,
  loginReferrer: "",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },

    setPerson(state, action: PayloadAction<Person | undefined>) {
      state.person = action.payload;
    },

    setLoginReferrer(state, action: PayloadAction<string>) {
      state.loginReferrer = action.payload;
    },

    setLogout(state, action) {},
  },
});

export const { setIsAuthenticated, setPerson, setLoginReferrer, setLogout } =
  authSlice.actions;

export default authSlice.reducer;
