import React from "react";

import ExpenseTrackImage from "../assets/expense_tracking.jpg";
import ExpenseBudgetImage from "../assets/budget_image.jpg";
import ExpenseBudgetReport from "../assets/Report_expense.jpg";
import HomeWrapper from "./HomeWrapper";

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <div className="text-center mb-10">
          <h1 className="text-green-500 font-bold text-4xl mb-4">
            Welcome to Expense Master
          </h1>

          <p className="text-lg text-gray-300">
            Your ultimate solution for managing expenses with ease and
            precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src={ExpenseTrackImage}
              alt="Track Expenses"
              className="mb-4"
            />
            <h2 className="text-xl font-bold text-green-500 mb-2">
              Track Expenses
            </h2>
            <p className="text-gray-300 text-center">
              Keep an eye on your spending with our easy-to-use tracking tools.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
            <img src={ExpenseBudgetImage} alt="Set Budgets" className="mb-4" />
            <h2 className="text-xl font-bold text-green-500 mb-2">
              Set Budgets
            </h2>
            <p className="text-gray-300 text-center">
              Create and manage budgets to save more and spend wisely.
            </p>
          </div>
          <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src={ExpenseBudgetReport}
              alt="Generate Reports"
              className="mb-4"
            />
            <h2 className="text-xl font-bold text-green-500 mb-2">
              Generate Reports
            </h2>
            <p className="text-gray-300 text-center">
              Get detailed reports on your financial activities for better
              insights.
            </p>
          </div>
        </div>

        {/* <div className="text-center">
          <button className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-6 rounded-full shadow-md">
            Get Started Now
          </button>
        </div> */}
      </div>
    </HomeWrapper>
  );
};

export default Home;
