import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
  // method which taskes object as parameter
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
