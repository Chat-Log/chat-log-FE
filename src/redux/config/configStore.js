import { configureStore } from "@reduxjs/toolkit";
import main from "../modules/mainSlice";
import search from "../modules/searchSlice";

const store = configureStore({
  reducer: {
    main,
    search,
  },
});

export default store;
