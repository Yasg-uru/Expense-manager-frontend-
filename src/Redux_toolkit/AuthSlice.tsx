import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/AuthSlice";
import axios from "axios";
import toast from "react-hot-toast";
import signupinterface from "../interfaces/AuthenticationInterface";
import LoginInterface from "../interfaces/LoginInterface";
const initialState: User = {
  role: "",
  isLoggedin: localStorage.getItem("isLoggedin") === "true" || false,
};
export const register = createAsyncThunk(
  "/auth/register",
  async (formdata: signupinterface) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/user/register`,
        formdata,
        {
          withCredentials: true,
        }
      );
      toast.success("your account created successfully");
      return res.data;
    } catch (error) {
      toast.error("error is occured");
    }
  }
);
export const login = createAsyncThunk(
  "/auth/login",
  async (formdata: LoginInterface) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/login",
        formdata,
        {
          withCredentials: true,
        }
      );
      toast.success("Logged In successfully");
      return res.data;
    } catch (error) {
      toast.error("Error is occured in Login");
    }
  }
);
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.role = action?.payload?.user?.role;
        localStorage.setItem("isLoggedin", "true");
        state.isLoggedin = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.isLoggedin = true), localStorage.setItem("isLoggedin", "true");
        state.role = action?.payload?.user?.role;
      });
  },
});
export const {} = AuthSlice.actions;
export default AuthSlice.reducer;
