import { configureStore } from "@reduxjs/toolkit";
import allData from "./reducers/allData";

export const store = configureStore({
  reducer: {
    getAllData:allData
  },
});
