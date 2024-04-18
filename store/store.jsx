import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../store/userslice"

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
