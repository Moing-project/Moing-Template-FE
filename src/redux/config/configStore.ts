import { configureStore } from "@reduxjs/toolkit";
import { Loginapi } from "../modules/LoginAPI";
import { Imageapi } from "../modules/ImageAPI";

export default configureStore({
  reducer: {
    [Loginapi.reducerPath]: Loginapi.reducer,
    [Imageapi.reducerPath]: Imageapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(Loginapi.middleware)
      .concat(Imageapi.middleware),
});
