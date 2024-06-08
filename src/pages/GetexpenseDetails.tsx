import { useState } from "react";
import HomeWrapper from "./HomeWrapper";
import WeeklyExpense from "./WeeklyExpense";
import GetMonthlyExpense from "./GetMonthlyExpense";
import GetYearlyExpense from "./GetYearlyExpense";
import GetYearlyExpenseReport from "./GetyearlyExpenseReport";
const GetExpenseDetails: React.FC = () => {
  const [choice, setchoice] = useState<string>("weekly");

  return (
    <HomeWrapper>
      <div className="min-h-screen bg-black p-4">
        <h1 className=" text-green-500 text-3xl font-bold text-center mb-6">
          Get Expenses
        </h1>
        <div className="navbar bg-black border border-green-500 rounded-lg">
          <div className="flex-1">
            <h1 className="btn btn-ghost text-xl text-green-500">
              Select Choice{" "}
            </h1>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a
                  className={
                    choice === "weekly" ? `text-red-500` : `text-green-500`
                  }
                  onClick={() => setchoice("weekly")}
                >
                  Weekly
                </a>
              </li>

              <li>
                <a
                  className={
                    choice === "monthly" ? `text-red-500` : `text-green-500`
                  }
                  onClick={() => setchoice("monthly")}
                >
                  Monthly
                </a>
              </li>
              <li>
                <a
                  className={
                    choice === "yearly" ? `text-red-500` : `text-green-500`
                  }
                  onClick={() => {
                    setchoice("yearly");
                  }}
                >
                  Yearly
                </a>
              </li>
              <li>
                <a
                  className={
                    choice === "yearly-report"
                      ? `text-red-500`
                      : `text-green-500`
                  }
                  onClick={() => {
                    setchoice("yearly-report");
                  }}
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
    </HomeWrapper>
  );
};
export default GetExpenseDetails;
