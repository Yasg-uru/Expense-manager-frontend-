import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./AuthSlice";
import ExpenseReducer from "./ExpenseSlice"
const store = configureStore({
  reducer: {
    auth: Authreducer,
    expense:ExpenseReducer
  },
  devTools: true,
});
export default store;
