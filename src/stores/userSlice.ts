import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/api";
import { RootState } from "./index";
import { InputType, UserType, Status } from "../interface/interfaces";

interface InitialStateType {
  user: UserType | null;
  status: Status.PENDING | Status.SUCCESS | Status.FAILED | Status.IDLE;
  error: string;
}

const initialState: InitialStateType = {
  user: null,
  status: Status.IDLE,
  error: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunk_login.pending, (state) => {
        state.status = Status.PENDING;
        state.error = "";
      })
      .addCase(thunk_login.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          delete action.payload[0].password;

          state.status = Status.SUCCESS;
          state.user = action.payload[0];
        } else {
          state.status = Status.FAILED;
          state.error = "Username or password is invalid";
        }
      })
      .addCase(thunk_login.rejected, (state, action) => {
        state.status = Status.FAILED;
        if (action.error.message) state.error = action.error.message;
      });
  }
});

export const thunk_login = createAsyncThunk("user/login", async ({ username, password }: InputType) => {
  const response = await login({ username, password });
  return response.data;
});

export const selectUser = (state: RootState) => state.user.user;
export const selectError = (state: RootState) => state.user.error;
export const selectStatus = (state: RootState) => state.user.status;

export const { logout } = userSlice.actions;
export default userSlice.reducer;
