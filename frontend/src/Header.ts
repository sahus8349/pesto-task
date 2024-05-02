import { createSlice } from "@reduxjs/toolkit";

export type HeaderState = {
  title: string;
};

export const headerState: HeaderState = {
  title: ""
};

export const Header = createSlice({
  name: "header",
  initialState: headerState,
  reducers: {
    headerUpdate: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.

      state.title = action.payload.title;
    },
  },
});

// Action creators are generated for each case reducer function
export const { headerUpdate } = Header.actions;

export default Header.reducer;
