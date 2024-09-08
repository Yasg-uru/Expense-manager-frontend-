
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetFullYearReport } from "../Redux_toolkit/ExpenseSlice";
import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/Redux_toolkit/hooks";

ChartJS.register(ArcElement, Tooltip);

const date = new Date();
const currentYear: number = date.getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i).map(
  (year) => ({
    value: year,
    label: year.toString(),
  })
);

const GetYearlyExpenseReport: React.FC = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFullYearReport(year) as any);
  }, [year]);

  const handleYearChange = (value: string) => {
    setYear(parseInt(value));
  };

  const yearlyExpensesByDay = useAppSelector(
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
    <div className="flex flex-col items-center mt-5 px-4">
      <h1 className="text-green-500 font-bold text-2xl sm:text-3xl mb-2">
        Full Year Report
      </h1>

      {/* Year selector */}
      <div className="flex items-center gap-2 w-full max-w-xs">
        <Select onValueChange={handleYearChange} defaultValue={year.toString()}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year.value} value={year.value.toString()}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Bar chart */}
      <div className="flex flex-col items-center w-full mt-10">
        <h1 className="text-red-500 underline font-bold text-2xl sm:text-3xl">
          Bar Chart Of Your Expenses
        </h1>
        <Bar
          data={chartData}
          className="mt-4 w-[95vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw]"
        />
      </div>

      {/* Pie chart */}
      <div className="flex flex-col items-center w-full mt-10">
        <h1 className="text-red-500 underline font-bold text-2xl sm:text-3xl">
          Pie Chart Of Your Expenses
        </h1>
        <Pie
          data={chartData}
          className="mt-4 w-[95vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw]"
          options={
            {
              height,
              width,
            } as MyPieChartOptions
          }
        />
      </div>
    </div>
  );
};

export default GetYearlyExpenseReport;
