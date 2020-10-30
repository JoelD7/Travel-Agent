import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";
import searchNavbarReducer from "./slices/search-slice"

export default configureStore({
  reducer: {
    signUp: signUpReducer,
    searchNavbar: searchNavbarReducer,
  },
});
