import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RootStateInterface from "../interfaces/RootStateInterface";
import { Logout } from "../Redux_toolkit/AuthSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector<RootStateInterface>(
    (state) => state.auth.isLoggedin
  );
  const imageurl = useSelector<RootStateInterface>(
    (state) => state.auth.imageurl
  ) as string;

  const HandleLogout = () => {
    dispatch(Logout() as any);
  };

  return (
    <div className="navbar bg-black text-white">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">TrackMyExpenses</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={`/`} className="hover:bg-gradient-to-r from-green-500 to-indigo-500">Home</Link>
          </li>
          <li>
            <Link to={`/create-expense`} className="hover:bg-gradient-to-r from-green-500 to-indigo-500">Create Expense</Link>
          </li>
          <li>
            <Link to={`/create-budget`} className="hover:bg-gradient-to-r from-green-500 to-indigo-500">Create Budget</Link>
          </li>
          <li>
            <Link to={`/getexpense`} className="hover:bg-gradient-to-r from-green-500 to-indigo-500">Get Expenses</Link>
          </li>
          <li>
            <Link to={`/getbudgets`} className="hover:bg-gradient-to-r from-green-500 to-indigo-500">Get Budgets</Link>
          </li>

          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  {imageurl ? (
                    <img alt="User avatar" src={imageurl} />
                  ) : (
                    <img
                      alt="Default avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black text-white border border-green-500 rounded-box w-52"
              >
                <li>
                  <a
                    onClick={() => navigate("/profile")}
                    className="justify-between"
                  >
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={HandleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-6 rounded-full shadow-md"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-6 rounded-full shadow-md"
                onClick={() => navigate("/register")}
              >
                Signup
              </button>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
