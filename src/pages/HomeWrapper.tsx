import { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RootStateInterface from "../interfaces/RootStateInterface";
import { GetUserInfo, Logout } from "../Redux_toolkit/AuthSlice";

const HomeWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const isLoggedIn = useSelector<RootStateInterface>(
    (state) => state.auth.isLoggedin
  );
  const HandleLogout = () => {
    dispatch(Logout() as any);
  };
  const imageurl = useSelector<RootStateInterface>(
    (state) => state.auth.imageurl
  ) as string;
  console.log("this is a is loggedin:", isLoggedIn);
  // useEffect(() => {
  //   dispatch(GetUserInfo() as any);
  // }, [imageurl]);
  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer">
            <FaBars size={45} color="white" />
          </label>
          {children} {/* Render children prop here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 w-80 min-h-full bg-black text-base-content ">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            >
              <RxCross1 color="white" size={25} className="close sidebar" />
            </label>

            <li className="hover:bg-gradient-to-r from-green-500 to-indigo-500 ">
              <Link to={`/`} className="text-white">
                Home{" "}
              </Link>
            </li>
            <li className="hover:bg-gradient-to-r from-green-500 to-indigo-500 ">
              <Link to={`/create-expense`} className="text-white">
                Create Expense
              </Link>
            </li>
            <li className="hover:bg-gradient-to-r from-green-500 to-indigo-500 ">
              <Link to={"/create-budget"} className="text-white">
                Create Budget{" "}
              </Link>
            </li>
            <li className="hover:bg-gradient-to-r from-green-500 to-indigo-500 ">
              <Link to={`/getexpense`} className="text-white">
                Get Expenses{" "}
              </Link>
            </li>
            <li className="hover:bg-gradient-to-r from-green-500 to-indigo-500 ">
              <Link to={`/getbudgets`} className="text-white">
                Get Budgets{" "}
              </Link>
            </li>

            {isLoggedIn === false ? (
              <div className="flex flex-col gap-2 h-11 w-full mt-5">
                <button
                  className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-6 rounded-full shadow-md"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
                <button
                  className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-6 rounded-full shadow-md"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Signup
                </button>
              </div>
            ) : (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {imageurl ? (
                      <img alt="nothing" src={imageurl} />
                    ) : (
                      <img
                        alt="Tailwind CSS Navbar component"
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
                      onClick={() => {
                        navigate("/profile");
                      }}
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
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HomeWrapper;

// Signup component
