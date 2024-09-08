import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Getmonthly_Expense_Graph } from "../Redux_toolkit/ExpenseSlice";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
  month: number;
  year: number;
  Totalexpense: number;
}

const GetfullmonthlyReportByGraph: React.FC<Props> = ({
  month,
  year,
  Totalexpense,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Getmonthly_Expense_Graph({ month, year }) as any);
  }, []);
  const ExpenseArray: any = useSelector(
    (state: any) => state.expense.FullWeekExpense
  );

  const expenseSummary = ExpenseArray?.reduce((acc: any, expense: any) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const labels = expenseSummary ? Object.keys(expenseSummary) : [];
  const data = expenseSummary ? Object.values(expenseSummary) : [];
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // Use a semi-transparent red
          "rgba(54, 162, 235, 0.2)", // Use a semi-transparent blue
          // Add more colors if needed
        ],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div className="mt-4 flex flex-col ">
        <p className="text-green-500 ">
          Total Expense of {month}th month {year} is ₹{Totalexpense}
        </p>
        <Pie data={chartData} />
      </div>
    </>
  );
};
export default GetfullmonthlyReportByGraph;
