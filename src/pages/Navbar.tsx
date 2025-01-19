import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../Redux_toolkit/AuthSlice";
import ModeToggle from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreditCard, LogIn, LogOut,  User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/Redux_toolkit/hooks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { RiAddBoxLine, RiProgress1Line } from "react-icons/ri";
import { useMediaQuery } from "@uidotdev/usehooks";
const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const { isLoading, name, isLoggedin } = useAppSelector((state) => state.auth);
  const imageurl = useAppSelector((state) => state.auth.imageurl) as string;

  const handleLogout = () => {
    dispatch(Logout())
      .unwrap()
      .then(() => {
        toast({ title: "Logged out successfully", variant: "default" });
        navigate("/Login");
      })
      .catch(() => {
        toast({
          title: "Failed to Logout",
          description: "Error, Please Try again later",
        });
      });
  };

  return (
    <div>
      {!isMobile ? (
        // Desktop Navbar
        <div className="navbar z-10 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 shadow-lg">
          <div className="flex-1">
            <Link
              to="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-500 hover:from-indigo-500 hover:to-green-500 transition-colors duration-300"
            >
              TrackMyExpenses
            </Link>
          </div>

          <div className="flex-none space-x-4">
            <ul className="menu menu-horizontal px-1">
              {/* Navbar Links */}
              <li>
                <Link
                  to="/"
                  className="text-lg font-medium px-4 py-2 rounded-md"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/create-expense"
                  className="text-lg font-medium px-4 py-2 rounded-md"
                >
                  Create Expense
                </Link>
              </li>
              <li>
                <Link
                  to="/create-budget"
                  className="text-lg font-medium px-4 py-2 rounded-md"
                >
                  Create Budget
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/getexpense"
                  className="text-lg font-medium px-4 py-2 rounded-md"
                >
                  Get Expenses
                </Link>
              </li> */}
              <li>
                <Link
                  to="/getbudgets"
                  className="text-lg font-medium px-4 py-2 rounded-md"
                >
                  Get Budgets
                </Link>
              </li>
            </ul>

            {/* Dark/Light Mode Toggle */}
            {ModeToggle({})}

            {/* Sign In / User Avatar */}
            {!isLoggedin ? (
              <Button
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold"
                onClick={() => navigate("/Login")}
              >
                Sign in
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={imageurl} alt="@shadcn" />
                    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" /> Profile
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{isLoading ? "Logging out..." : "Log out"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      ) : (
        // Mobile Tab Bar
        <div className="fixed bottom-0 w-full bg-gray-200 dark:bg-gray-800 flex justify-around py-2 shadow-lg z-50">
          <Link
            to="/"
            className="flex flex-col items-center text-gray-600 dark:text-gray-300"
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/create-expense"
            className="flex flex-col items-center text-gray-600 dark:text-gray-300"
          >
            <CreditCard className="h-6 w-6" />
            <span className="text-xs">Expense</span>
          </Link>
          <Link
            to="/create-budget"
            className="flex flex-col items-center text-gray-600 dark:text-gray-300"
          >
            <RiAddBoxLine className="h-6 w-6" />
            <span className="text-xs flex items-center justify-center">
              Budget
            </span>
          </Link>
          <Link
            to="/getbudgets"
            className="flex flex-col items-center text-gray-600 dark:text-gray-300"
          >
            <RiProgress1Line className="h-6 w-6" />
            <span className="text-xs">Budgets</span>
          </Link>
          {isLoggedin ? (
            <div className="flex flex-col items-center text-gray-600 dark:text-gray-300">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoading ? "Logging out..." : "Log out"}</span>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex flex-col items-center text-gray-600 dark:text-gray-300"
            >
              <LogIn className="h-6 w-6" />
              <span className="text-xs">Login</span>
            </Link>
          )}
          {ModeToggle({})}
        </div>
      )}
    </div>
  );
};

export default Navbar;
