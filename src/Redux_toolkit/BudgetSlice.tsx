import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import CreateBudgetInterface from "../interfaces/CreateBudgetInterface";
import axiosInstance from "../helpers/axiosinstance";
import BudgetSliceInterface from "../interfaces/BudgetsSliceInterface";
const initialState: BudgetSliceInterface = {
  BudgetArray: [],
  Totalpages: 0,
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
const BudgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Getbudgets.fulfilled, (state, action) => {
      state.BudgetArray = action?.payload?.Budgets;
      state.Totalpages = action?.payload?.Totalpages;
    });
  },
});
export const {} = BudgetSlice.actions;
export default BudgetSlice.reducer;
