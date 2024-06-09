import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./AuthSlice";
import ExpenseReducer from "./ExpenseSlice";
import BudgetReducer from "./BudgetSlice";

const store = configureStore({
  reducer: {
    auth: Authreducer,
    expense: ExpenseReducer,
    budget: BudgetReducer,
  },
  devTools: true,
});
export default store;
