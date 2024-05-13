import { createSlice } from "@reduxjs/toolkit";
type User = {
  firstname: string;
  lastname: string;
  maritalStatusId: number;
  gender: string;
  dob: "";
  religionId: number;
  cityId: number;
  countryId: number;
  motherTongueId: number;
  communityId: number;
  email: string;
  password: string;
};

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    page: 1,
    signupData: {
      firstname: "",
      lastname: "",
      maritalStatusId: 0,
      gender: "",
      dob: "",
      religionId: 0,
      cityId: 0,
      countryId: 0,
      motherTongueId: 0,
      communityId: 0,
      email: "",
      password: "",
    },
  },

  reducers: {
    incrementPage(state) {
      if (state.page < 3) {
        state.page += 1;
      }
    },
    decrementPage(state) {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
  },
});

export default signupSlice;
export const signupActions = signupSlice.actions;
