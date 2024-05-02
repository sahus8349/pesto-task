import { createSlice } from "@reduxjs/toolkit";

export type UserState = {
  name: string;
};

export const userState: UserState = {
  name: "",
};

export const User = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    updateUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.

      state.name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = User.actions;

export default User.reducer;
