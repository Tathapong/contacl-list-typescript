import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import contactsSlice from "./contactsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    contacts: contactsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
