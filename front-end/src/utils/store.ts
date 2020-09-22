import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";

export default configureStore({
  reducer: {
    signUp: signUpReducer,
  },
});
