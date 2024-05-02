import { createSlice } from "@reduxjs/toolkit";

export type TokenState = {
  token: string;
};

export const tokenState: TokenState = {
  token: ""
};

export const Token = createSlice({
  name: "token",
  initialState: tokenState,
  reducers: {
    tokenUpdate: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.

      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { tokenUpdate } = Token.actions;

export default Token.reducer;
