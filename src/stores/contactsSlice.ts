import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { getContactsByUserId } from "../api/api";
import { RootState } from "./index";
import { Status, ContactType } from "../interface/interfaces";

interface InitialStateType {
  contacts: ContactType[];
  status: Status.IDLE | Status.PENDING | Status.FAILED | Status.SUCCESS;
  error: string;
}

const initialState: InitialStateType = {
  contacts: [],
  status: Status.IDLE,
  error: ""
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    initialize: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunk_fetchContacts.pending, (state) => {
        state.status = Status.PENDING;
        state.error = "";
      })
      .addCase(thunk_fetchContacts.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.contacts = action.payload;
      })
      .addCase(thunk_fetchContacts.rejected, (state, action) => {
        state.status = Status.FAILED;
        if (action.error.message) state.error = action.error.message;
      });
  }
});

export const thunk_fetchContacts = createAsyncThunk("contacts/fetch", async (userId: number) => {
  const response = await getContactsByUserId(userId);
  return response.data;
});

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectStatus = (state: RootState) => state.contacts.status;
export const selectError = (state: RootState) => state.contacts.error;
export const selectContactsBySearch = createSelector([selectContacts, (state: RootState, search: string) => search], (contacts, search) => {
  return contacts.filter(
    (contact) =>
      isInclude(contact.firstName, search) ||
      isInclude(contact.lastName, search) ||
      isInclude(contact.email, search) ||
      isInclude(contact.company, search) ||
      isInclude(contact.phone, search)
  );
});

export const { initialize } = contactsSlice.actions;

export default contactsSlice.reducer;

// Utilities function
function isInclude(text: string, search: string) {
  return text.toUpperCase().includes(search.toUpperCase());
}
