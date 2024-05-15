import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginData: { user: {}, token: {} },
  },
  reducers: {
    addToStore(state, action) {
      const { user, token } = action.payload;
      console.log(user, token);
      state.loginData.user = user;
      state.loginData.token = token;
    },
    logOut(state) {
      state.loginData.user = {};
      state.loginData.token = {};
    },
    updateUserImage(state, action) {
      const { image } = action.payload;
      return produce(state, (draftState: any) => {
        draftState.loginData.user.image = image;
      });
    },
  },
});
export default loginSlice;
export const loginActions = loginSlice.actions;
