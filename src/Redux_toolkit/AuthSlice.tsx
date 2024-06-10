import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/AuthSlice";
import axios from "axios";
import toast from "react-hot-toast";
import signupinterface from "../interfaces/AuthenticationInterface";
import LoginInterface from "../interfaces/LoginInterface";
import axiosInstance from "../helpers/axiosinstance";
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
export const Logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await axiosInstance.post(
      "/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    toast.success("logged out successfully");
    return res.data;
  } catch (error) {
    toast.error("failed to Logout ");
  }
});
export const UpdatePassword = createAsyncThunk(
  "/auth/updatepassword",
  async (formdata: { currentpassword: string; updatepassword: string }) => {
    try {
      const res = axiosInstance.put("/user/updatepassword", formdata, {
        withCredentials: true,
      });
      toast.success("password updated successfully");
      return (await res).data;
    } catch (error) {
      toast.error("failed to update password");
    }
  }
);
export const forgotpassword = createAsyncThunk(
  "/user/forgotpassword",
  async (email: string) => {
    try {
      const res = await axiosInstance.post(
        "/user/forgotpassword",
        {
          email,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("mail sent successfully");
      return res.data;
    } catch (error) {
      toast.error("failed to sent mail ");
    }
  }
);
export const ResetPassword = createAsyncThunk(
  "/user/reset",
  async (formdata: { token: string | undefined; Password: string }) => {
    try {
      const res = await axiosInstance.post(
        `/user/resetpassword/${formdata.token}`,
        {
          password: formdata.Password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("reset password successfully");
      return res.data;
    } catch (error) {
      toast.error("failed to reset password");
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
      })
      .addCase(Logout.fulfilled, (state, action) => {
        state.isLoggedin = false;
        localStorage.setItem("isLoggedin", "false");
      });
  },
});
export const {} = AuthSlice.actions;
export default AuthSlice.reducer;
