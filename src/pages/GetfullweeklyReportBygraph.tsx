import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetGraphweek } from "../Redux_toolkit/ExpenseSlice";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Prop {
  week: number;
  TotalExpense: number;
}

const GetfullweeklyReportByGraph: React.FC<Prop> = ({ week, TotalExpense }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetGraphweek(week) as any);
  }, [dispatch, week]);

  const ExpenseArray: any = useSelector(
    (state: any) => state.expense.FullWeekExpense
  );

  const expenseSummary = ExpenseArray?.reduce((acc: any, expense: any) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const labels = expenseSummary ? Object.keys(expenseSummary) : [];
  const data = expenseSummary ? Object.values(expenseSummary) : [];

  //   const chartData = {
  //     labels: labels,
  //     datasets: [
  //       {
  //         data: data,
  //         backgroundColor: ['#FF6384', '#36A2EB'], // Add more colors if there are more categories
  //         hoverBackgroundColor: ['#FF6384', '#36A2EB']
  //       }
  //     ]
  //   };

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
    <div className=" flex flex-col  items-center justify-center">
      <p className="text-green-500 ">
        Total Expense of week {week} is ₹{TotalExpense}
      </p>
      <Pie data={chartData} />
    </div>
  );
};

export default GetfullweeklyReportByGraph;
