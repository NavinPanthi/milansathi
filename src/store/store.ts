import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";

import signupSlice from "./signupSlice";
import loginSlice from "./loginSlice";
import usersSlice from "./usersSlice";
const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  signup: signupSlice.reducer,
  login: loginSlice.reducer,
  users: usersSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
