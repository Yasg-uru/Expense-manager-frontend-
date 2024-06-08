import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import  CreateExpense  from "./pages/CreateExpense";
import GetExpenseDetails from "./pages/GetexpenseDetails";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Signup/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="create-expense" element={<CreateExpense/>}/>
      <Route path="/getexpense" element={<GetExpenseDetails/>}/>
      
    </Routes>
    
    </>
  );
}

export default App;
