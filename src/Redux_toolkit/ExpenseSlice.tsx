import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ExpenseInterface from "../interfaces/ExpenseSliceInterface";
import toast from "react-hot-toast";

import Pagination from "../interfaces/ExpenseWeeklyPagination";
import MonthlyInterface from "../interfaces/MonthlyExpenseInterface";
import MonthlyExpenseInterfaceGraph from "../interfaces/MonthlyExpenseInterfaceGraph";
import axiosInstance from "../helpers/axiosinstance";

import CreateExpenseInterface from "@/interfaces/CreateExpenseInterface";
const initialState: ExpenseInterface = {
  ExpenseArray: [],
  TotalPages: 0,
  TotalExpenses: 0,
  FullWeekExpense: [],
  FullYearExpense: {},
  isLoading: false,
};
export const Createexpense = createAsyncThunk(
  "expense/create",
  async (FormData: CreateExpenseInterface, { rejectWithValue }) => {
    try {
      console.log("this is formdata:", FormData);
      const res = await axiosInstance.post("/expense/create", FormData, {
        withCredentials: true,
      });
      toast.success("expense Created Successfully");

      return res.data;
    } catch (error) {
      toast.error("error is occured while creating expense ");
      return rejectWithValue("Failed to create expense");
    }
  }
);
export const GetDailyExpenses = createAsyncThunk(
  "expense/get-daily",
  async (date: Date, { rejectWithValue }) => {
    try {
      const formatDate = (date: Date) => {
        const year = date.getFullYear(); // Get the full year (e.g., 2024)
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed) and pad with '0' if necessary
        const day = String(date.getDate()).padStart(2, "0"); // Get the day and pad with '0' if necessary
        return `${year}-${month}-${day}`;
      };
      const formattedDate = formatDate(date);

      const response = await axiosInstance.get(
        `expense/get-daily/${formattedDate}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error");
    }
  }
);
export const GetweeklyExpense = createAsyncThunk(
  "expense/get-weekly",
  async (FormData: Pagination, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/expense/prevweek?week=${FormData.week}&page=${FormData.currentpage}`,

        {
          withCredentials: true,
        }
      );
      toast.success("fetched your weekly Expense successfully");
      return res.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error");
    }
  }
);
export const GetGraphweek = createAsyncThunk(
  "expense/getfullweek",
  async (week: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/expense/prevweekreport?week=${week}`,
        {
          withCredentials: true,
        }
      );
      toast.success("fetched data successfully");
      return res.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error");
    }
  }
);

export const Getmonthly_Expense = createAsyncThunk(
  "expense/monthly",
  async (formdata: MonthlyInterface, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/expense/monthly?page=${formdata.page}&month=${formdata.month}&year=${formdata.year}`,
        {
          withCredentials: true,
        }
      );
      toast.success(`fetched data successfully`);
      return res.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error");
    }
  }
);
export const Getmonthly_Expense_Graph = createAsyncThunk(
  "expense/monthly/graph",
  async (FormData: MonthlyExpenseInterfaceGraph, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/expense/monthly_graph?year=${FormData.year}&month=${FormData.month}`,
        {
          withCredentials: true,
        }
      );
      toast.success("successfully fetched graph data ");
      return res.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error");
    }
  }
);
export const GetFullYearReport = createAsyncThunk(
  "expense/FullyearReport",
  async (year: number, { rejectWithValue }) => {
    try {
      console.log("this is a year from query:", year);
      const res = await axiosInstance.get(`/expense/report?year=${year}`, {
        withCredentials: true,
      });
      toast.success("fetched full year Report");

      return res.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error");
    }
  }
);
const ExpenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(GetDailyExpenses.fulfilled, (state, action) => {
        state.ExpenseArray = action.payload?.expenses;
        state.TotalExpenses = action.payload?.TotalExpense;
        state.isLoading = false;
      })
      .addCase(GetDailyExpenses.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetDailyExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetweeklyExpense.fulfilled, (state, action) => {
        state.ExpenseArray = action?.payload?.expenses;
        state.TotalExpenses = action?.payload?.totalExpense;
        state.TotalPages = action?.payload?.totalPages;
        state.isLoading = false;
      })
      .addCase(GetweeklyExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetweeklyExpense.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetGraphweek.fulfilled, (state, action) => {
        state.FullWeekExpense = action?.payload?.Expenses;
        state.isLoading = false;
      })
      .addCase(GetGraphweek.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetGraphweek.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(Getmonthly_Expense.fulfilled, (state, action) => {
        state.ExpenseArray = action?.payload?.expenses;
        state.TotalExpenses = action?.payload?.totalexpense;
        state.TotalPages = action?.payload?.Totalpages;
        state.isLoading = false;
      })
      .addCase(Getmonthly_Expense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getmonthly_Expense.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(Getmonthly_Expense_Graph.fulfilled, (state, action) => {
        state.FullWeekExpense = action?.payload?.expenses;
        state.isLoading = false;
      })
      .addCase(Getmonthly_Expense_Graph.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getmonthly_Expense_Graph.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetFullYearReport.fulfilled, (state, action) => {
        state.FullYearExpense = action.payload.yearlyExpensesByDay;
        state.TotalExpenses = action?.payload?.totalExpense;
        state.isLoading = false;
      })
      .addCase(GetFullYearReport.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetFullYearReport.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Createexpense.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(Createexpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Createexpense.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const {} = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
