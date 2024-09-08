import ExpenseCard from "@/helpers/ExpenseCard";
import { useToast } from "@/hooks/use-toast";
import { GetDailyExpenses } from "@/Redux_toolkit/ExpenseSlice";
import { useAppDispatch, useAppSelector } from "@/Redux_toolkit/hooks";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const GetDailyExpense: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());

  const { ExpenseArray, TotalExpenses, isLoading } = useAppSelector(
    (state) => state.expense
  );

  useEffect(() => {
    dispatch(GetDailyExpenses(date))
      .unwrap()
      .then(() => {
        toast({
          title: "Fetched successfully your daily expense",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  }, [date]);

  const HandlePrevDate = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const HandleNextDate = () => {
    const today = new Date();
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      if (newDate > today) {
        toast({
          title: "You can't select a future date",
          variant: "destructive",
        });
        return prevDate;
      }
      return newDate;
    });
  };
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-4 md:p-6">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-black p-4 md:p-6">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Daily Expense Tracker
      </h1>

      {/* Date Display and Navigation */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <button
          onClick={HandlePrevDate}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Prev Day
        </button>
        <p className="text-lg sm:text-xl font-medium text-gray-800 dark:text-white">
          {date.toDateString()}
        </p>
        <button
          onClick={HandleNextDate}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Next Day
        </button>
      </div>

      {/* Expense Information */}
      <div className="w-full max-w-lg bg-white dark:bg-black shadow-lg rounded-md p-4 md:p-6 mb-6">
        <p className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
          Total Expenses:{" "}
          <span className="text-green-600 dark:text-green-400">
            {TotalExpenses}
          </span>
        </p>

        <ul className="space-y-4">
          {ExpenseArray.length > 0 ? (
            ExpenseArray.map((expense) => (
              <ExpenseCard key={expense._id} expense={expense} />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No expenses for this date.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default GetDailyExpense;
