import { configureStore } from "@reduxjs/toolkit";
import { Loginapi } from "../modules/LoginAPI";

export default configureStore({
  reducer: {
    [Loginapi.reducerPath]: Loginapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Loginapi.middleware),
});
