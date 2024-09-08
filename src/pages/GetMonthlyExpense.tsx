import { useState } from "react";
import { useDispatch } from "react-redux";
import MonthlyInterface from "../interfaces/MonthlyExpenseInterface";
import { Getmonthly_Expense } from "../Redux_toolkit/ExpenseSlice";

import ExpenseCard from "../helpers/ExpenseCard";
import GetfullmonthlyReportByGraph from "./GetfullmonthlyReportByGraph";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/Redux_toolkit/hooks";


const GetMonthlyExpense: React.FC = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const currentYear: number = date.getFullYear();

  const [formdata, setFormdata] = useState<MonthlyInterface>({
    year: currentYear,
    month: date.getMonth() + 1,
    page: 1,
  });
  // const [showGraph, setShowGraph] = useState<boolean>(false);

  // const handleChange = (event: any) => {
  //   const { name, value } = event.target;
  //   setFormdata({
  //     ...formdata,
  //     [name]: value,
  //   });
  // };

  const handleMonthChange = (value: string) => {
    setFormdata({
      ...formdata,
      month: parseInt(value),
    });
  };

  const handleYearChange = (value: string) => {
    setFormdata({
      ...formdata,
      year: parseInt(value),
    });
  };

  const handleSearch = (event: any) => {
    event.preventDefault();

    dispatch(Getmonthly_Expense(formdata) as any);
  };

  
const {TotalExpenses,TotalPages ,ExpenseArray}=useAppSelector((state)=>state.expense)
  const handlePreviousPage = () => {
    setFormdata({
      ...formdata,
      page: formdata.page - 1,
    });
    dispatch(Getmonthly_Expense(formdata) as any);
  };

  const handleNextPage = () => {
    setFormdata({
      ...formdata,
      page: formdata.page + 1,
    });
    dispatch(Getmonthly_Expense(formdata) as any);
  };

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const years = Array.from({ length: 10 }, (_, i) => currentYear - i).map(
    (year) => ({
      value: year,
      label: year.toString(),
    })
  );

  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-center text-green-500 font-bold text-3xl">
        Get Monthly Expense
      </h1>

      <form
        onSubmit={handleSearch}
        className="w-full flex flex-col sm:flex-row items-center bg-gray-700 shadow-2xl shadow-gray-500 gap-4 px-4 sm:px-10 rounded-lg"
      >
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <Select onValueChange={handleMonthChange} defaultValue={formdata.month.toString()}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Month</SelectLabel>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <Select onValueChange={handleYearChange} defaultValue={formdata.year.toString()}>
            <SelectTrigger className="w-[180px]">
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

        <div className="flex flex-col w-full sm:w-auto gap-2 m-2 sm:m-4">
          <Button
            type="submit"
            className="btn w-full bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-6 rounded-full shadow-md"
          >
            Search
          </Button>
        </div>
      </form>
      {ExpenseArray.length > 0 && (
        <GetfullmonthlyReportByGraph
          month={formdata.month}
          year={formdata.year}
          Totalexpense={TotalExpenses}
        />
      )}

      <div className="flex mt-12 flex-col gap-1 w-full">
        {ExpenseArray.length > 0 ? (
          ExpenseArray.map((expense: any) => (
            <ExpenseCard key={expense._id} expense={expense} />
          ))
        ) : (
          <p className="font-semibold text-red-600">
            No expenses for this month.
          </p>
        )}
      </div>

      {ExpenseArray.length > 0 && (
        <div className="join bg-black border border-green-500">
          <button
            disabled={formdata.page <= 1}
            onClick={handlePreviousPage}
            className="join-item btn text-white bg-black hover:border-green-500"
          >
            «
          </button>
          <button className="join-item btn text-white bg-black hover:border-green-500">
            Page {formdata.page}
          </button>
          <button
            disabled={formdata.page === TotalPages}
            onClick={handleNextPage}
            className="join-item btn text-white bg-black hover:border-green-500"
          >
            »
          </button>
        </div>
      )}
    </div>
  );
};

export default GetMonthlyExpense;
