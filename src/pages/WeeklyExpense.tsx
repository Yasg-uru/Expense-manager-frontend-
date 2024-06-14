import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetweeklyExpense } from "../Redux_toolkit/ExpenseSlice";
import RootStateInterface from "../interfaces/RootStateInterface";
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
  const [showgraph, setshowgraph] = useState<boolean>(false);

  useEffect(() => {
    dispatch(GetweeklyExpense({ week, currentpage }) as any);
  }, [week, currentpage, dispatch]);

  const expenseArray = useSelector<RootStateInterface, any[]>(
    (state) => state.expense.ExpenseArray
  );

  const totalPages = useSelector<RootStateInterface, number>(
    (state) => state.expense.TotalPages
  );
  const TotalExpense: any = useSelector<RootStateInterface>(
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

  return (
    <div className="flex flex-col items-center mt-5 gap-2">
      <h1 className="text-center text-green-500 font-bold text-3xl">
        Get Weekly Expense
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 ">
        <button
          onClick={() => handleSubmit(1)}
          className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md "
        >
          First Week
        </button>
        <button
          onClick={() => handleSubmit(2)}
          className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md "
        >
          Second Week
        </button>
        <button
          onClick={() => handleSubmit(3)}
          className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md "
        >
          Third Week
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {expenseArray?.map((expense: any) => (
          <ExpenseCard key={expense._id} expense={expense} />
        ))}
      </div>
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
      <div className="flex flex-col justify-center items-center">
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
        {showgraph && (
          <GetfullweeklyReportByGraph week={week} TotalExpense={TotalExpense} />
        )}
      </div>
    </div>
  );
};

export default WeeklyExpense;
