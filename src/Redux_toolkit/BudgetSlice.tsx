import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import CreateBudgetInterface from "../interfaces/CreateBudgetInterface";
import axiosInstance from "../helpers/axiosinstance";
import BudgetSliceInterface from "../interfaces/BudgetsSliceInterface";
const initialState: BudgetSliceInterface = {
  BudgetArray: [],
  Totalpages: 0,
  RemainingBudget: 0,
  PercentageUsage: 0,
  isLoading: false,
};
export const createBudget = createAsyncThunk(
  "budget/create",
  async (FormData: CreateBudgetInterface) => {
    try {
      const res = await axiosInstance.post("/budget/create", FormData, {
        withCredentials: true,
      });
      toast.success("your budget created successfully");

      return res.data;
    } catch (error) {
      toast.error("failed to create budget ");
      throw error;
    }
  }
);
export const Getbudgets = createAsyncThunk(
  "budget/get",
  async (page: number) => {
    try {
      const res = await axiosInstance.get(`/budget/Budgets?page=${page}`, {
        withCredentials: true,
      });
      toast.success("fetched your budgets successfully");
      return res.data;
    } catch (error) {
      toast.error("failed to fetch your budgets ");
    }
  }
);
export const DeleteBudget = createAsyncThunk(
  "budget/delete",
  async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/budget/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("deleted your budget successfully");
      return res.data;
    } catch (error) {
      toast.error("failed to delete your budget");
    }
  }
);
export const UpdateBudget = createAsyncThunk(
  "budget/update",
  async (formdata: any) => {
    try {
      const res = await axiosInstance.put(
        `/budget/update/${formdata._id}`,
        formdata,
        {
          withCredentials: true,
        }
      );
      toast.success("updated your budget successfully");
      return res.data;
    } catch (error) {
      toast.error("failed to update budget please try again later ");
    }
  }
);
export const getprogress = createAsyncThunk(
  "budget/progress",
  async (formdata: { year: number; month: number; category: string }) => {
    try {
      console.log("this is a formdata:", formdata);
      const res = await axiosInstance.post(`/budget/monthly`, formdata, {
        withCredentials: true,
      });
      toast.success("fetched your budget usage successfully");
      return res.data;
    } catch (error) {
      toast.error("failed to fetch your budget usage");
    }
  }
);
const BudgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Getbudgets.fulfilled, (state, action) => {
        state.BudgetArray = action?.payload?.Budgets;
        state.Totalpages = action?.payload?.Totalpages;
      })
      .addCase(getprogress.fulfilled, (state, action) => {
        state.RemainingBudget = action?.payload?.remainingbudget;
        state.PercentageUsage = action?.payload?.percentageUsage;
      })
      .addCase(createBudget.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createBudget.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createBudget.pending, (state) => {
        state.isLoading = true;
      });
  },
});
export const {} = BudgetSlice.actions;
export default BudgetSlice.reducer;
