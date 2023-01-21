import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  userInfo: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginHandler: (latestState, action) => {
      const { user, tokenData } = action.payload;
      const { token } = tokenData;

      latestState.userInfo = user;
      latestState.token = token;
      latestState.isLoggedIn = true;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logoutHandler: latestState => {
      latestState.userInfo = null;
      latestState.token = null;
      latestState.isLoggedIn = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice.reducer;
