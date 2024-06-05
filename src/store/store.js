import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = configureStore({
  // method which taskes object as parameter
  reducer: { authReducer },
});

export default store;
