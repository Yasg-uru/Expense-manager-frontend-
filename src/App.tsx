// import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateExpense from "./pages/CreateExpense";
import GetExpenseDetails from "./pages/GetexpenseDetails";
import CreateBudget from "./pages/Budgetmanager/CreateBudget";
import GetBudgets from "./pages/GetBudgets";

import ResetPasswordForm from "./pages/ResetPasswordForm";
import ProtectedHelper from "./helpers/ProtectedHelper";
import ProfileInfo from "./pages/ProfileInfo";
import Navbar from "./pages/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedHelper allowedrole={["user", "admin"]} />}>
          <Route path="/create-expense" element={<CreateExpense />} />
          <Route path="/" element={<GetExpenseDetails />} />
          <Route path="/create-budget" element={<CreateBudget />} />
          <Route path="/getbudgets" element={<GetBudgets />} />
          <Route path="/profile" element={<ProfileInfo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
