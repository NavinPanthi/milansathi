import { createSlice } from "@reduxjs/toolkit";
const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersData: [],
  },
  reducers: {
    addUsers(state, action) {
      const details = action.payload;
      state.usersData = details;
    },
  },
});
export default usersSlice;
export const usersActions = usersSlice.actions;
