import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetFullYearReport } from "../Redux_toolkit/ExpenseSlice";
import RootStateInterface from "../interfaces/RootStateInterface";
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip);
const GetYearlyExpenseReport: React.FC = () => {
  const dispatch = useDispatch();
  const [isopen, setisopen] = useState<boolean>(false);

  const currentyear = new Date();
  const [year, setyear] = useState<number>(currentyear.getFullYear());
  const [choice, setChoice] = useState<"Pie" | "Bar" | "default">("default");
  const toggleOpen = () => {
    setisopen(!isopen);
  };
  const handlesubmit = () => {
    dispatch(GetFullYearReport(year) as any);
  };
  const handlechage = (event: any) => {
    const value = event.target.value;
    const Year = parseInt(value);
    setyear(Year);
  };
  const yearlyExpensesByDay = useSelector<RootStateInterface>(
    (state) => state.expense.FullYearExpense
  );

  const calculateMonthlyTotals = (expensesByDay: any) => {
    const monthlyTotals: any = {};
    for (const month in expensesByDay) {
      monthlyTotals[month] = Object.values(expensesByDay[month]).reduce(
        (sum: number, expense: any) => sum + expense,
        0
      );
    }
    return monthlyTotals;
  };

  const monthlyTotals = calculateMonthlyTotals(yearlyExpensesByDay);
  const chartData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyTotals),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(99, 132, 132, 0.2)",
          "rgba(186, 85, 211, 0.2)",
          "rgba(128, 128, 128, 0.2)",
          "rgba(148, 0, 211, 0.2)",
          "rgba(77, 144, 254, 0.2)",
          "rgba(0, 191, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(99, 132, 132, 1)",
          "rgba(186, 85, 211, 1)",
          "rgba(128, 128, 128, 1)",
          "rgba(148, 0, 211, 1)",
          "rgba(77, 144, 254, 1)",
          "rgba(0, 191, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const width = 3000,
    height = 3000;
  interface MyPieChartOptions extends ChartOptions<"pie"> {
    height: number;
    width: number;
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-green-500 font-bold text-3xl">Full Year Report</h1>
      <button
        onClick={toggleOpen}
        className="btn w-full bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md"
      >
        {isopen ? "Close Year Input" : "Enter Year"}
      </button>
      {isopen && (
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="year" className="text-lg text-gray-300">
              Year
            </label>

            <div className="flex gap-2">
              <input
                type="number"
                name="year"
                value={year}
                onChange={handlechage}
                placeholder="Enter Year"
                className="border w-[15vw] text-white border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                required
              />
              <button
                onClick={handlesubmit}
                className="btn w-full bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center text-white w-full"></div>
      <h1 className="text-red-500 underline font-bold text-3xl mt-3">
        Bar Chart Of Your Expense
      </h1>
      <Bar data={chartData} className="mt-10" />
      <h1 className="text-red-500 underline font-bold text-3xl mt-10">
        Pie Chart Of Your Expense
      </h1>
      <Pie
        data={chartData}
        className="mt-2"
        options={
          {
            height,
            width,
          } as MyPieChartOptions
        }
      />
    </div>
  );
};
export default GetYearlyExpenseReport;
