// Define an interface for the signup state
export interface SignupState {
  page: number;
}

export interface RootState {
  signup: SignupState;
  // Add other slices if you have them in your Redux store
}
