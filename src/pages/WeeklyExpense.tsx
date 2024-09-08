import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetweeklyExpense } from "../Redux_toolkit/ExpenseSlice";

import toast from "react-hot-toast";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import GetfullweeklyReportByGraph from "./GetfullweeklyReportBygraph";
import ExpenseCard from "../helpers/ExpenseCard";
import { useAppSelector } from "@/Redux_toolkit/hooks";

// Register the components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyExpense: React.FC = () => {
  const dispatch = useDispatch();
  const [week, setWeek] = useState<number>(1);
  const [currentpage, setcurrentpage] = useState<number>(1);

  useEffect(() => {
    dispatch(GetweeklyExpense({ week, currentpage }) as any);
  }, [week, currentpage]);

  const expenseArray = useAppSelector((state) => state.expense.ExpenseArray);

  const totalPages = useAppSelector((state) => state.expense.TotalPages);
  const TotalExpense: any = useAppSelector(
    (state) => state.expense.TotalExpenses
  );
  const handleNextPage = () => {
    if (currentpage === totalPages) {
      toast.error("Next page not exist!");
      return;
    }
    setcurrentpage(currentpage + 1);
  };

  const handlePreviousPage = () => {
    if (currentpage > 1) {
      setcurrentpage(currentpage - 1);
    }
  };

  const handleSubmit = (weekNumber: number) => {
    setWeek(weekNumber);
    setcurrentpage(1);
  };
  // const { isLoading } = useAppSelector((state) => state.expense);
  // if (isLoading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-4 md:p-6">
  //       <Loader2 className="h-10 w-10 animate-spin" />
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col items-center mt-5 gap-2">
      <h1 className="text-center text-green-500 font-bold text-3xl">
        Get Weekly Expense
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 ">
        <button
          onClick={() => handleSubmit(1)}
          className={`${
            week !== 1
              ? "bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l"
              : "bg-gradient-to-r from-red-500 to-orange-500 hover:bg-gradient-to-l"
          } btn  text-white font-bold py-2 px-4 rounded-full shadow-md `}
        >
          First Week
        </button>
        <button
          onClick={() => handleSubmit(2)}
          className={`${
            week !== 2
              ? "bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l"
              : "bg-gradient-to-r from-red-500 to-orange-500 hover:bg-gradient-to-l"
          } btn  text-white font-bold py-2 px-4 rounded-full shadow-md `}
        >
          Second Week
        </button>
        <button
          onClick={() => handleSubmit(3)}
          className={`${
            week !== 3
              ? "bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l"
              : "bg-gradient-to-r from-red-500 to-orange-500 hover:bg-gradient-to-l"
          } btn  text-white font-bold py-2 px-4 rounded-full shadow-md `}
        >
          Third Week
        </button>
      </div>

      {expenseArray.length > 0 && (
        <GetfullweeklyReportByGraph week={week} TotalExpense={TotalExpense} />
      )}

      <div className="flex flex-col gap-1">
        {expenseArray.length > 0 ? (
          expenseArray.map((expense: any) => (
            <ExpenseCard key={expense._id} expense={expense} />
          ))
        ) : (
          <p className="text-red-600 font-bold text-md mt-5">
            No Expense For This Week
          </p>
        )}
      </div>
      {expenseArray.length > 0 && (
        <div className="join bg-black border border-green-500">
          <button
            disabled={currentpage <= 1}
            onClick={handlePreviousPage}
            className="join-item btn text-white bg-black hover:border-green-500"
          >
            «
          </button>
          <button className="join-item btn text-white bg-black hover:border-green-500">
            Page {currentpage}
          </button>
          <button
            disabled={currentpage === totalPages}
            onClick={handleNextPage}
            className="join-item btn text-white bg-black hover:border-green-500"
          >
            »
          </button>
        </div>
      )}
      {/* <div className="flex flex-col justify-center items-center">
        {expenseArray?.length !== 0 && (
          <button
            onClick={() => {
              setshowgraph(!showgraph);
            }}
            className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md "
          >
            {showgraph === false
              ? " Show Full Week Report By Graph"
              : "Close Full Week Report By Graph"}
          </button>
        )}
      </div> */}
    </div>
  );
};

export default WeeklyExpense;
