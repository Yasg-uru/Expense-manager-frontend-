import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreateExpense from "./pages/CreateExpense";
import GetExpenseDetails from "./pages/GetexpenseDetails";
import CreateBudget from "./pages/Budgetmanager/CreateBudget";
import GetBudgets from "./pages/GetBudgets";
import { ResetPassword } from "./Redux_toolkit/AuthSlice";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import ProtectedHelper from "./helpers/ProtectedHelper";
import ProfileInfo from "./pages/ProfileInfo";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedHelper allowedrole={["user","admin"]}/>}>
        <Route path="create-expense" element={<CreateExpense />} />
        <Route path="/getexpense" element={<GetExpenseDetails />} />
        <Route path="/create-budget" element={<CreateBudget />} />
        <Route path="getbudgets" element={<GetBudgets />} />
        <Route path="/profile" element={<ProfileInfo/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
