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
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
export default store;
