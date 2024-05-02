import { configureStore } from "@reduxjs/toolkit";
import User from "./User";
import Header from "./Header";
import Token from "./Token";

export default configureStore({
  reducer: {
    user: User,
    header: Header,
    token: Token,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
