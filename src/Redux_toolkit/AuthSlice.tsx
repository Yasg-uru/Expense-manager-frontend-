import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../interfaces/AuthSlice";

import toast from "react-hot-toast";

import LoginInterface from "../interfaces/LoginInterface";
import axiosInstance from "../helpers/axiosinstance";
const isValidRole = (role: any): role is "" | "admin" | "user" => {
  return role === "" || role === "admin" || role === "user";
};
const storedRole = localStorage.getItem("role");
const initialState: User = {
  role: isValidRole(storedRole) ? storedRole : "",
  isLoggedin: localStorage.getItem("isLoggedin") === "true" ? true : false,
  imageurl: "",
  email: "",
  name: localStorage.getItem("name") || "",
  isLoading: false,
};

export const register = createAsyncThunk(
  "/auth/register",
  async (formdata: FormData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/user/register`, formdata, {
        withCredentials: true,
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      });

      toast.success("Your account created successfully");
      return res.data;
    } catch (error: any) {
      console.log("this is error in registering :", error);
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
export const login = createAsyncThunk(
  "/auth/login",
  async (formdata: LoginInterface, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", formdata, {
        withCredentials: true,
      });
      toast.success("Logged In successfully");
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
  } catch (error: any) {
    // if(error.response && error.response.data && error.response.data.message){

    //   return rejectWithValue(error.response.data.message);
    // }
    // return rejectWithValue("Unkown Error")
    throw error;
  }
});
export const UpdatePassword = createAsyncThunk(
  "/auth/updatepassword",
  async (
    formdata: { currentpassword: string; updatepassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = axiosInstance.put("/user/updatepassword", formdata, {
        withCredentials: true,
      });
      toast.success("password updated successfully");
      return (await res).data;
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
export const forgotpassword = createAsyncThunk(
  "/user/forgotpassword",
  async (email: string, { rejectWithValue }) => {
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
export const ResetPassword = createAsyncThunk(
  "/user/reset",
  async (
    formdata: { token: string | undefined; Password: string },
    { rejectWithValue }
  ) => {
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
export const Profilechange = createAsyncThunk(
  "auth/profilechange",
  async (profileurl: File, { rejectWithValue }) => {
    try {
      const Formdata = new FormData();
      Formdata.append("profileurl", profileurl);

      const res = await axiosInstance.put("/user/changeProfile", Formdata, {
        withCredentials: true,
      });
      toast.success("changed your profile successfully");
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
export const DeleteAccount = createAsyncThunk("user/delete", async () => {
  try {
    const res = await axiosInstance.delete(`/user/delete`, {
      withCredentials: true,
    });
    toast.success("Your Account deleted successfully");
    return res.data;
  } catch (error) {
    throw error;
  }
});
export const UpdateProfile = createAsyncThunk(
  "/user/update",
  async (name: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        "/user/update",
        {
          name,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("updated your profile successfully");
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
export const GetUserInfo = createAsyncThunk("/user/getinfo", async () => {
  try {
    const res = await axiosInstance.get("/user/userInfo", {
      withCredentials: true,
    });
    toast.success("successfully fecthed users data ");
    return res.data;
  } catch (error) {
    throw error;
  }
});
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.role = action?.payload?.user?.role;
        localStorage.setItem("isLoggedin", "true");
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedin = true;
        state.imageurl = action?.payload?.user?.profileurl;
        state.email = action?.payload?.user?.email;
        state.name = action?.payload?.user?.name;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedin = false;
        localStorage.setItem("isLoggedin", "false");
        localStorage.setItem("role", "");
        state.role = "";
      })
      .addCase(Logout.fulfilled, (state) => {
        state.isLoggedin = false;
        localStorage.setItem("isLoggedin", "false");
        localStorage.setItem("role", "");
        state.isLoading = false;
      })
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Logout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.isLoggedin = true), localStorage.setItem("isLoggedin", "true");
        state.role = action?.payload?.user?.role;
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("name", action?.payload?.user?.name);
        state.imageurl = action?.payload?.user?.profileurl;
        state.email = action?.payload?.user?.email;
        state.name = action?.payload?.user?.name;
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(Profilechange.fulfilled, (state, action) => {
        state.imageurl = action?.payload?.user?.profileurl;
      })
      .addCase(DeleteAccount.fulfilled, (state) => {
        state.role = "";
        localStorage.clear();
        state.isLoggedin = false;
        state.imageurl = "";
        state.email = "";
        state.name = "";
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.role = action?.payload?.user?.role;
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("isLoggedin", "true");
        state.isLoggedin = true;
        state.imageurl = action?.payload?.user?.profileurl;
        state.email = action?.payload?.user?.email;
        state.name = action?.payload?.user?.name;
      })
      .addCase(GetUserInfo.fulfilled, (state, action) => {
        state.role = action?.payload?.user?.role;
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("isLoggedin", "true");
        state.isLoggedin = true;
        state.imageurl = action?.payload?.user?.profileurl;
        state.email = action?.payload?.user?.email;
        state.name = action?.payload?.user?.name;
      });
  },
});
export const {} = AuthSlice.actions;
export default AuthSlice.reducer;
