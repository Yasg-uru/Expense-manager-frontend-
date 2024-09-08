import { useState } from "react";

import WeeklyExpense from "./WeeklyExpense";
import GetMonthlyExpense from "./GetMonthlyExpense";
import GetYearlyExpense from "./GetYearlyExpense";
import GetYearlyExpenseReport from "./GetyearlyExpenseReport";
import GetDailyExpense from "./GetDailyExpense";

const GetExpenseDetails: React.FC = () => {
  const [choice, setChoice] = useState<string>("daily");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black p-6 flex flex-col items-center transition-colors">
      {/* Header Section */}
      <h1 className="text-gray-800 dark:text-gray-100 text-4xl font-bold mb-10 text-center">
        Expense Tracker
      </h1>

      {/* Navigation Section */}
      <div className="w-auto bg-white dark:bg-gray-700 shadow-2xl rounded-md p-4 flex flex-col items-center transition-colors   shadow-gray-600">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Select View
        </h2>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-full transition ${
              choice === "daily"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-black dark:text-gray-300"
            }`}
            onClick={() => setChoice("daily")}
          >
            Daily
          </button>
          <button
            className={`px-4 py-2 rounded-full transition ${
              choice === "weekly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-black dark:text-gray-300"
            }`}
            onClick={() => setChoice("weekly")}
          >
            Weekly
          </button>
          <button
            className={`px-4 py-2 rounded-full transition ${
              choice === "monthly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-black dark:text-gray-300"
            }`}
            onClick={() => setChoice("monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-full transition ${
              choice === "yearly"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-black dark:text-gray-300"
            }`}
            onClick={() => setChoice("yearly")}
          >
            Yearly
          </button>
          <button
            className={`px-4 py-2 rounded-full transition ${
              choice === "yearly-report"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-black dark:text-gray-300"
            }`}
            onClick={() => setChoice("yearly-report")}
          >
            Year Report
          </button>
        </div>
      </div>

      {/* Expense Details */}
      <div className="mt-10 w-full max-w-2xl">
        {choice === "daily" && <GetDailyExpense />}
        {choice === "weekly" && <WeeklyExpense />}
        {choice === "monthly" && <GetMonthlyExpense />}
        {choice === "yearly" && <GetYearlyExpense />}
        {choice === "yearly-report" && <GetYearlyExpenseReport />}
      </div>
    </div>
  );
};

export default GetExpenseDetails;
