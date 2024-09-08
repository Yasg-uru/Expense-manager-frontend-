// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import MonthlyInterface from "../interfaces/MonthlyExpenseInterface";
// import { Getmonthly_Expense } from "../Redux_toolkit/ExpenseSlice";
// import RootStateInterface from "../interfaces/RootStateInterface";
// import ExpenseCard from "../helpers/ExpenseCard";
// import GetfullmonthlyReportByGraph from "./GetfullmonthlyReportByGraph";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// const GetMonthlyExpense: React.FC = () => {
//   const dispatch = useDispatch();
//   const date = new Date();
//   const currentyear: number = date.getFullYear();

//   const [formdata, setformdata] = useState<MonthlyInterface>({
//     year: currentyear,
//     month: 1,
//     page: 1,
//   });
//   const [showgraph, setshowgraph] = useState<boolean>(false);

//   const handlechange = (event: any) => {
//     const { name, value } = event.target;
//     setformdata({
//       ...formdata,
//       [name]: value,
//     });
//   };
//   const handlesearch = () => {
//     dispatch(Getmonthly_Expense(formdata) as any);
//   };
//   const expenseArray = useSelector<RootStateInterface, any[]>(
//     (state) => state.expense.ExpenseArray
//   );
//   const totalPages = useSelector<RootStateInterface, number>(
//     (state) => state.expense.TotalPages
//   );
//   const TotalExpense: any = useSelector<RootStateInterface>(
//     (state) => state.expense.TotalExpenses
//   );
//   const handlePreviousPage = () => {
//     setformdata({
//       ...formdata,
//       page: formdata.page - 1,
//     });
//     dispatch(Getmonthly_Expense(formdata) as any);
//   };
//   const handleNextPage = () => {
//     setformdata({
//       ...formdata,
//       page: formdata.page + 1,
//     });
//     dispatch(Getmonthly_Expense(formdata) as any);
//   };

//   const months = [
//     { value: 1, label: "January" },
//     { value: 2, label: "February" },
//     { value: 3, label: "March" },
//     { value: 4, label: "April" },
//     { value: 5, label: "May" },
//     { value: 6, label: "June" },
//     { value: 7, label: "July" },
//     { value: 8, label: "August" },
//     { value: 9, label: "September" },
//     { value: 10, label: "October" },
//     { value: 11, label: "November" },
//     { value: 12, label: "December" },
//   ];
//   console.log("this is a month", formdata.month);
//   console.log("this is a year:", formdata.year);
//   return (
//     <div className="flex flex-col items-center mt-5">
//       <h1 className="text-center text-green-500 font-bold text-3xl">
//         Get Monthly Expense
//       </h1>
//       {/* <div className="w-full flex flex-col sm:flex-row items-center border border-red-500 gap-4 px-10">
//         <div className="flex flex-col items-start m-4">
//           <label
//             htmlFor="month-dropdown"
//             className="mb-2 text-lg font-medium text-white"
//           >
//             Select a Month:
//           </label>
//           <select
//             id="month-dropdown"
//             name="month"
//             className="w-52 p-2 text-white border border-gray-300 rounded-md bg-black focus:outline-none focus:border-gray-500 transition-all duration-300 cursor-pointer"
//             value={formdata.month || ""}
//             onChange={handlechange}
//           >
//             <option value="" disabled>
//               Select a month
//             </option>
//             {months.map((month) => (
//               <option key={month.value} value={month.value}>
//                 {month.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex flex-col gap-2 w-full">
//           <label htmlFor="year" className="text-lg text-gray-300">
//             Year
//           </label>

//           <input
//             type="text"
//             id="amount"
//             name="year"
//             // value={formData.amount}
//             // onChange={handlechange}
//             placeholder="Enter the amount"
//             className="border w-[15vw] text-white border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
//             required
//           />
//         </div>

//         <div className="flex flex-col gap-2 m-4">
//           <button
//             onClick={handlesearch}
//             className="btn w-full bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md"
//           >
//             Search
//           </button>
//         </div>
//       </div> */}
//       <div className="w-full flex flex-col sm:flex-row items-center border border-red-500 gap-4 px-4 sm:px-10">
//         {/* <div className="flex flex-col items-start m-2 sm:m-4">
//           <label
//             htmlFor="month-dropdown"
//             className="mb-2 text-lg font-medium text-white"
//           >
//             Select a Month:
//           </label>
//           <select
//             id="month-dropdown"
//             name="month"
//             onChange={handlechange}
//             className="w-full sm:w-[15vw] p-2 text-white border border-gray-300 rounded-md bg-black focus:outline-none focus:border-gray-500 transition-all duration-300 cursor-pointer"
//           >
//             <option value="" disabled>
//               Select a month
//             </option>
//             {months.map((month) => (
//               <option key={month.value} value={month.value}>
//                 {month.label}
//               </option>
//             ))}
//           </select>
//         </div> */}
//         <Select onValueChange={}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Select a month" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               <SelectLabel>Months</SelectLabel>
//               {months.map((month) => (
//                 <SelectItem key={month.value} value={month.value.toString()}>
//                   {month.label}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//         <div className="flex flex-col gap-2 w-full sm:w-auto">
//           <label htmlFor="year" className="text-lg text-gray-300">
//             Year
//           </label>
//           <input
//             type="text"
//             id="amount"
//             name="year"
//             onChange={handlechange}
//             placeholder="Enter the amount"
//             className="border w-full sm:w-[15vw] text-white border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
//             required
//           />
//         </div>
//         <div className="flex flex-col w-full gap-2 m-2 sm:m-4">
//           <button
//             onClick={handlesearch}
//             className="btn w-full bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="flex mt-12 flex-col gap-1 w-full">
//         {expenseArray?.map((expense: any) => (
//           <ExpenseCard key={expense._id} expense={expense} />
//         ))}
//       </div>
//       <div className="join bg-black border border-green-500">
//         <button
//           disabled={formdata.page <= 1}
//           onClick={handlePreviousPage}
//           className="join-item btn text-white bg-black hover:border-green-500"
//         >
//           «
//         </button>
//         <button className="join-item btn text-white bg-black hover:border-green-500">
//           Page {formdata.page}
//         </button>
//         <button
//           disabled={formdata.page === totalPages}
//           onClick={handleNextPage}
//           className="join-item btn text-white bg-black hover:border-green-500"
//         >
//           »
//         </button>
//       </div>
//       <div className="flex flex-col justify-center items-center">
//         {expenseArray?.length !== 0 && (
//           <button
//             onClick={() => {
//               setshowgraph(!showgraph);
//             }}
//             className="btn mt-5 bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md "
//           >
//             {showgraph === false
//               ? " Show Full Week Report By Graph"
//               : "Close Full Week Report By Graph"}
//           </button>
//         )}
//         {showgraph && (
//           <GetfullmonthlyReportByGraph
//             month={formdata.month}
//             year={formdata.year}
//             Totalexpense={TotalExpense}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
// export default GetMonthlyExpense;
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MonthlyInterface from "../interfaces/MonthlyExpenseInterface";
import { Getmonthly_Expense } from "../Redux_toolkit/ExpenseSlice";
import RootStateInterface from "../interfaces/RootStateInterface";
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

const GetMonthlyExpense: React.FC = () => {
  const dispatch = useDispatch();
  const date = new Date();
  const currentYear: number = date.getFullYear();

  const [formdata, setFormdata] = useState<MonthlyInterface>({
    year: currentYear,
    month: 1,
    page: 1,
  });
  const [showGraph, setShowGraph] = useState<boolean>(false);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

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

  const expenseArray = useSelector<RootStateInterface, any[]>(
    (state) => state.expense.ExpenseArray
  );
  const totalPages = useSelector<RootStateInterface, number>(
    (state) => state.expense.TotalPages
  );
  const TotalExpense: any = useSelector<RootStateInterface>(
    (state) => state.expense.TotalExpenses
  );

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
          <Select onValueChange={handleMonthChange}>
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
          <Select onValueChange={handleYearChange}>
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

      <div className="flex mt-12 flex-col gap-1 w-full">
        {expenseArray?.map((expense: any) => (
          <ExpenseCard key={expense._id} expense={expense} />
        ))}
      </div>

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
          disabled={formdata.page === totalPages}
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
              setShowGraph(!showGraph);
            }}
            className="btn mt-5 bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md "
          >
            {showGraph === false
              ? " Show Full Month Report By Graph"
              : "Close Full Month Report By Graph"}
          </button>
        )}
        {showGraph && (
          <GetfullmonthlyReportByGraph
            month={formdata.month}
            year={formdata.year}
            Totalexpense={TotalExpense}
          />
        )}
      </div>
    </div>
  );
};

export default GetMonthlyExpense;
