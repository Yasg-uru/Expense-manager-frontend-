import { useState } from "react";

import WeeklyExpense from "./WeeklyExpense";
import GetMonthlyExpense from "./GetMonthlyExpense";
import GetYearlyExpense from "./GetYearlyExpense";
import GetYearlyExpenseReport from "./GetyearlyExpenseReport";
const GetExpenseDetails: React.FC = () => {
  const [choice, setchoice] = useState<string>("weekly");

  return (
 
      <div className="min-h-screen bg-black p-4">
        <h1 className=" text-green-500 text-3xl font-bold text-center mb-6">
          Get Expenses
        </h1>

        <div className="navbar bg-black border border-green-500 rounded-lg flex flex-col sm:flex-row">
          <div className="flex-1 text-center sm:text-left">
            <h1 className="btn btn-ghost text-xl text-green-500">
              Select Choice
            </h1>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1 flex flex-wrap justify-center sm:justify-end">
              <li>
                <a
                  className={`text-green-500 ${
                    choice === "weekly" ? "text-red-500" : ""
                  }`}
                  onClick={() => setchoice("weekly")}
                >
                  Weekly
                </a>
              </li>
              <li>
                <a
                  className={`text-green-500 ${
                    choice === "monthly" ? "text-red-500" : ""
                  }`}
                  onClick={() => setchoice("monthly")}
                >
                  Monthly
                </a>
              </li>
              <li>
                <a
                  className={`text-green-500 ${
                    choice === "yearly" ? "text-red-500" : ""
                  }`}
                  onClick={() => setchoice("yearly")}
                >
                  Yearly
                </a>
              </li>
              <li>
                <a
                  className={`text-green-500 ${
                    choice === "yearly-report" ? "text-red-500" : ""
                  }`}
                  onClick={() => setchoice("yearly-report")}
                >
                  Full Year Report
                </a>
              </li>
            </ul>
          </div>
        </div>

        {(choice === "weekly" && <WeeklyExpense />) ||
          (choice === "monthly" && <GetMonthlyExpense />) ||
          (choice === "yearly" && <GetYearlyExpense />) ||
          (choice === "yearly-report" && <GetYearlyExpenseReport />)}
      </div>
  );
};
export default GetExpenseDetails;
