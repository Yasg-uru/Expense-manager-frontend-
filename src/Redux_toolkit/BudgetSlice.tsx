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
  ProgressLoading: false
};
export const createBudget = createAsyncThunk(
  "budget/create",
  async (FormData: CreateBudgetInterface,{rejectWithValue}) => {
    try {
      const res = await axiosInstance.post("/budget/create", FormData, {
        withCredentials: true,
      });
      toast.success("your budget created successfully");

      return res.data;
    } catch (error:any) {
      if(error.response && error.response.data && error.response.data.message){

        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error")
    }
  }
);
export const Getbudgets = createAsyncThunk(
  "budget/get",
  async (page: number,{rejectWithValue}) => {
    try {
      const res = await axiosInstance.get(`/budget/Budgets?page=${page}`, {
        withCredentials: true,
      });
      toast.success("fetched your budgets successfully");
      return res.data;
    } catch (error:any) {
      if(error.response && error.response.data && error.response.data.message){

        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error")
    }
  }
);
export const DeleteBudget = createAsyncThunk(
  "budget/delete",
  async (id: string,{rejectWithValue}) => {
    try {
      const res = await axiosInstance.delete(`/budget/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("deleted your budget successfully");
      return res.data;
    } catch (error:any) {
      if(error.response && error.response.data && error.response.data.message){

        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error")
    }
  }
);
export const UpdateBudget = createAsyncThunk(
  "budget/update",
  async (formdata: any,{rejectWithValue}) => {
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
    } catch (error:any) {
      if(error.response && error.response.data && error.response.data.message){

        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error")
    }
  }
);
export const getprogress = createAsyncThunk(
  "budget/progress",
  async (formdata: { year: number; month: number; category: string },{rejectWithValue}) => {
    try {
      console.log("this is a formdata:", formdata);
      const res = await axiosInstance.post(`/budget/monthly`, formdata, {
        withCredentials: true,
      });
      toast.success("fetched your budget usage successfully");
      return res.data;
    } catch (error:any) {
      if(error.response && error.response.data && error.response.data.message){

        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Unkown Error")
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
        state.isLoading = false;
      })
      .addCase(Getbudgets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Getbudgets.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getprogress.fulfilled, (state, action) => {
        state.RemainingBudget = action?.payload?.remainingbudget;
        state.PercentageUsage = action?.payload?.percentageUsage;
        state.ProgressLoading = false;
      })
      .addCase(getprogress.pending, (state) => {
        state.ProgressLoading = true;
      })
      .addCase(getprogress.rejected, (state) => {
        state.ProgressLoading = false;
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
