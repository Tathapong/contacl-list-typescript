import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setuser: (state, action) => action.payload
  }
});

export default userSlice.reducer;
export const actions = userSlice.actions;
