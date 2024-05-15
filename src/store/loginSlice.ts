import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginData: { user: {}, token: {} },
  },
  reducers: {
    addToStore(state, action) {
      const { user, token } = action.payload;
      state.loginData.user = user;
      state.loginData.token = token;
    },
    logOut(state) {
      state.loginData.user = {};
      state.loginData.token = {};
    },
  },
});
export default loginSlice;
export const loginActions = loginSlice.actions;
