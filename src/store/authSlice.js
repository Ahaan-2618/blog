import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },

    logout: (state) => {
      state.status = false;
      state.status.userData = null;
    },
  },
});

// individual export so any file can use these functions
export const { login, logout } = authSlice.reducers;

// as docs said we are not gonna export reducers, we need to export reducer
export default authSlice.reducer;
