import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import ExpenseInterface from "../interfaces/ExpenseSliceInterface";
import toast from "react-hot-toast";
import CreateExpenseInterface from "../interfaces/CreateExpenseInterface";
import Pagination from "../interfaces/ExpenseWeeklyPagination";
import MonthlyInterface from "../interfaces/MonthlyExpenseInterface";
import MonthlyExpenseInterfaceGraph from "../interfaces/MonthlyExpenseInterfaceGraph";
import axiosInstance from "../helpers/axiosinstance";
const initialState: ExpenseInterface = {
  ExpenseArray: [],
  TotalPages: 0,
  TotalExpenses: 0,
  FullWeekExpense: [],
  FullYearExpense: {},
};
export const Createexpense = createAsyncThunk(
  "expense/create",
  async (FormData: CreateExpenseInterface) => {
    try {
      console.log(
      "this is formdata:",FormData
      )
      const res = await axiosInstance.post(
        "/expense/create",
        FormData,
        {
          withCredentials: true,
        }
      );
      toast.success("expense Created Successfully");

      return res.data;
    } catch (error) {
      toast.error("error is occured while creating expense ");
    }
  }
);
export const GetweeklyExpense = createAsyncThunk(
  "expense/get-weekly",
  async (FormData: Pagination) => {
    try {
      const res = await axiosInstance.get(
        `/expense/prevweek?week=${FormData.week}&page=${FormData.currentpage}`,

        {
          withCredentials: true,
        }
      );
      toast.success("fetched your weekly Expense successfully");
      return res.data;
    } catch (error) {
      toast.error("failed to fetch your weekly expense ");
    }
  }
);
export const GetGraphweek = createAsyncThunk(
  "expense/getfullweek",
  async (week: number) => {
    try {
      const res = await axiosInstance.get(
        `/expense/prevweekreport?week=${week}`,
        {
          withCredentials: true,
        }
      );
      toast.success("fetched data successfully");
      return res.data;
    } catch (error) {
      toast.error("error is occured");
    }
  }
);

export const Getmonthly_Expense = createAsyncThunk(
  "expense/monthly",
  async (formdata: MonthlyInterface) => {
    try {
      const res = await axiosInstance.get(
        `/expense/monthly?page=${formdata.page}&month=${formdata.month}&year=${formdata.year}`,
        {
          withCredentials: true,
        }
      );
      toast.success(`fetched data successfully`);
      return res.data;
    } catch (error) {
      toast.error("error in fetching monthly data  ");
    }
  }
);
export const Getmonthly_Expense_Graph = createAsyncThunk(
  "expense/monthly/graph",
  async (FormData: MonthlyExpenseInterfaceGraph) => {
    try {
      const res = await axiosInstance.get(
        `/expense/monthly_graph?year=${FormData.year}&month=${FormData.month}`,
        {
          withCredentials: true,
        }
      );
      toast.success("successfully fetched graph data ");
      return res.data;
    } catch (error) {
      toast.error("failed to fetch data ");
    }
  }
);
export const GetFullYearReport = createAsyncThunk(
  "expense/FullyearReport",
  async (year: number) => {
    try {
      console.log("this is a year from query:",year)
      const res = await axiosInstance.get(
        `/expense/report?year=${year}`,
        {
          withCredentials: true,
        }
      );
      toast.success("fetched full year Report");

      return res.data;
    } catch (error) {
      toast.error("failed to fetch full year report ");
    }
  }
);
const ExpenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(GetweeklyExpense.fulfilled, (state, action) => {
        state.ExpenseArray = action?.payload?.expenses;
        state.TotalExpenses = action?.payload?.totalExpense;
        state.TotalPages = action?.payload?.totalPages;
      })
      .addCase(GetGraphweek.fulfilled, (state, action) => {
        state.FullWeekExpense = action?.payload?.Expenses;
      })
      .addCase(Getmonthly_Expense.fulfilled, (state, action) => {
        state.ExpenseArray = action?.payload?.expenses;
        state.TotalExpenses = action?.payload?.totalexpense;
        state.TotalPages = action?.payload?.Totalpages;
      })
      .addCase(Getmonthly_Expense_Graph.fulfilled, (state, action) => {
        state.FullWeekExpense = action?.payload?.expenses;
      })
      .addCase(GetFullYearReport.fulfilled, (state, action) => {
        state.FullYearExpense = action.payload.yearlyExpensesByDay;
        state.TotalExpenses = action?.payload?.totalExpense;
      });
  },
});
export const {} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
