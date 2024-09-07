// import { useDispatch, useSelector } from "react-redux";

// import { useEffect, useState } from "react";
// import {
//   DeleteBudget,
//   Getbudgets,
//   UpdateBudget,
//   getprogress,
// } from "../Redux_toolkit/BudgetSlice";
// import RootStateInterface from "../interfaces/RootStateInterface";

// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// const GetBudgets: React.FC = () => {
//   const [page, setPage] = useState<number>(1);
//   const [editingBudget, setEditingBudget] = useState<string | null>(null);
//   const [editedBudget, setEditedBudget] = useState<any>({});
//   const [ProgressCard, setProgressCard] = useState<string | null>(null);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(Getbudgets(page) as any);
//   }, [dispatch, page]);

//   const Totalpages = useSelector<RootStateInterface>(
//     (state) => state.budget.Totalpages
//   );
//   const BudgetArray: any = useSelector<RootStateInterface>(
//     (state) => state.budget.BudgetArray
//   );

//   const handlePreviousPage = () => {
//     setPage(page - 1);
//   };
//   const handleNextPage = () => {
//     setPage(page + 1);
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

//   function findByValue(value: number) {
//     for (let i = 0; i < months.length; i++) {
//       if (months[i].value === value) {
//         return months[i].label;
//       }
//     }
//     return null;
//   }

//   function handleDelete(id: string) {
//     dispatch(DeleteBudget(id) as any);
//   }

//   function handleUpdateClick(budget: any) {
//     if (editingBudget === budget._id) {
//       // Dispatch update action
//       dispatch(UpdateBudget(editedBudget) as any);
//       setEditingBudget(null);
//       setEditedBudget({});
//     } else {
//       // Enable editing mode
//       setEditingBudget(budget._id);
//       setEditedBudget(budget);
//     }
//   }

//   function handleInputChange(
//     e:
//       | React.ChangeEvent<HTMLInputElement>
//       | React.ChangeEvent<HTMLSelectElement>
//   ) {
//     const { name, value } = e.target;
//     setEditedBudget((prev: any) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   const RemainingBudget = useSelector<RootStateInterface>(
//     (state) => state.budget.RemainingBudget
//   ) as number;
//   const PercentageUsage = useSelector<RootStateInterface>(
//     (state) => state.budget.PercentageUsage
//   ) as number;
//   console.log("this is a percentage usage:", PercentageUsage);
//   return (
//     <div className="bg-black min-h-screen flex flex-col p-2 items-center w-full">
//       <h1 className="text-center text-2xl font-bold text-green-500">
//         Get Your Budgets
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3 w-full">
//         {BudgetArray?.length > 0 &&
//           BudgetArray.map((budget: any) => (
//             <div
//               key={budget._id}
//               className="relative bg-black h-[50vh] w-full sm:max-w-lg m-3 rounded-lg shadow-lg shadow-indigo-300 overflow-hidden mx-auto flex flex-col items-center justify-center text-white p-2"
//             >
//               {ProgressCard === budget._id ? (
//                 <div className=" w-full flex flex-col items-center mb-10 pb-10 ">
//                   <button
//                     onClick={() => {
//                       setProgressCard(null);
//                     }}
//                     className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md w-full mt-1 "
//                   >
//                     Back
//                   </button>
//                   <h1 className="text-white font-bold text-xl">
//                     {budget.category}
//                   </h1>
//                   <p className="text-red-500 font-bold">
//                     Limit: {budget.limit}
//                   </p>
//                   <p className="text-green-500 font-bold">
//                     Remaining Budget : {RemainingBudget}
//                   </p>
//                   <div className="h-28 w-28">
//                     <CircularProgressbar
//                       value={PercentageUsage}
//                       text={`${PercentageUsage}%`}
//                     />
//                   </div>
//                 </div>
//               ) : editingBudget === budget._id ? (
//                 <div className="h-full w-full flex flex-col gap-1">
//                   <input
//                     type="text"
//                     name="category"
//                     value={editedBudget.category}
//                     onChange={handleInputChange}
//                     className="bg-gray-800 text-white p-2 rounded"
//                   />
//                   <input
//                     type="number"
//                     name="limit"
//                     value={editedBudget.limit}
//                     onChange={handleInputChange}
//                     className="bg-gray-800 text-white p-2 rounded mt-2"
//                   />

//                   <div className="flex flex-col gap-1">
//                     <label htmlFor="month" className="text-white ">
//                       Month
//                     </label>

//                     <select
//                       id="month-dropdown"
//                       name="month"
//                       className="w-52 p-2 text-white border border-gray-300 rounded-md bg-black focus:outline-none focus:border-gray-500 transition-all duration-300 cursor-pointer"
//                       value={editedBudget.month || ""}
//                       onChange={handleInputChange}
//                     >
//                       <option value="" disabled>
//                         Select a month
//                       </option>
//                       {months.map((month) => (
//                         <option key={month.value} value={month.value}>
//                           {month.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <input
//                     type="number"
//                     name="year"
//                     value={editedBudget.year}
//                     onChange={handleInputChange}
//                     className="bg-gray-800 text-white p-2 rounded mt-2"
//                   />
//                 </div>
//               ) : (
//                 <div className="flex flex-col gap-1">
//                   <h1 className="text-4xl font-bold tracking-wider">
//                     {budget.category}
//                   </h1>
//                   <div className="flex flex-col items-center gap-2">
//                     <h2 className="text-2xl font-semibold">
//                       Limit:{" "}
//                       <span className="text-emerald-400">{budget.limit}</span>
//                     </h2>
//                     <p className="text-lg font-medium">
//                       {findByValue(budget.month)} {budget.year}
//                     </p>
//                   </div>
//                 </div>
//               )}
//               {ProgressCard !== budget._id && (
//                 <>
//                   <button
//                     onClick={() => {
//                       setProgressCard(
//                         ProgressCard === budget._id ? null : budget._id
//                       );
//                       dispatch(
//                         getprogress({
//                           year: budget.year,
//                           month: budget.month,
//                           category: budget.category,
//                         }) as any
//                       );
//                     }}
//                     className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md w-full mt-1 "
//                   >
//                     Progress
//                   </button>

//                   <div className="absolute bottom-0 w-full border border-green-500 grid grid-cols-2">
//                     <button
//                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 shadow-md shadow-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                       onClick={() => handleDelete(budget._id)}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 shadow-md shadow-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                       onClick={() => handleUpdateClick(budget)}
//                     >
//                       {editingBudget === budget._id ? "Save" : "Update"}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//       </div>
//       {ProgressCard !== null && (
//         <div className="join mt-2 border border-green-500">
//           <button
//             onClick={handlePreviousPage}
//             disabled={page <= 1}
//             className="join-item btn bg-black text-white"
//           >
//             «
//           </button>
//           <button className="join-item btn bg-black text-white">
//             Page {page}
//           </button>
//           <button
//             onClick={handleNextPage}
//             disabled={page === Totalpages}
//             className="join-item btn bg-black text-white"
//           >
//             »
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetBudgets;
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  DeleteBudget,
  Getbudgets,
  UpdateBudget,
  getprogress,
} from "../Redux_toolkit/BudgetSlice";
import RootStateInterface from "../interfaces/RootStateInterface";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GetBudgets: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [editingBudget, setEditingBudget] = useState<string | null>(null);
  const [editedBudget, setEditedBudget] = useState<any>({});
  const [ProgressCard, setProgressCard] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Getbudgets(page) as any);
  }, [dispatch, page]);

  const Totalpages = useSelector<RootStateInterface>(
    (state) => state.budget.Totalpages
  );
  const BudgetArray: any = useSelector<RootStateInterface>(
    (state) => state.budget.BudgetArray
  );

  const handlePreviousPage = () => {
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
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

  function findByValue(value: number) {
    const month = months.find((month) => month.value === value);
    return month ? month.label : null;
  }

  function handleDelete(id: string) {
    dispatch(DeleteBudget(id) as any);
  }

  function handleUpdateClick(budget: any) {
    if (editingBudget === budget._id) {
      // Dispatch update action
      dispatch(UpdateBudget(editedBudget) as any);
      setEditingBudget(null);
      setEditedBudget({});
    } else {
      // Enable editing mode
      setEditingBudget(budget._id);
      setEditedBudget(budget);
    }
  }

  function handleInputChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setEditedBudget((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  const RemainingBudget = useSelector<RootStateInterface>(
    (state) => state.budget.RemainingBudget
  ) as number;
  const PercentageUsage = useSelector<RootStateInterface>(
    (state) => state.budget.PercentageUsage
  ) as number;

  return (
    <div className="min-h-screen flex flex-col p-4 items-center w-full bg-gray-100 dark:bg-gray-900">
      <h1 className="text-center text-2xl font-bold text-green-500 mb-4">
        Get Your Budgets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        {BudgetArray?.length > 0 &&
          BudgetArray.map((budget: any) => (
            <Card
              key={budget._id}
              className="relative bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg dark:shadow-black rounded-lg overflow-hidden"
            >
              <CardHeader>
                <CardTitle>{budget.category}</CardTitle>
                <CardDescription>
                  {editingBudget === budget._id ? (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        name="category"
                        value={editedBudget.category}
                        onChange={handleInputChange}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                      />
                      <input
                        type="number"
                        name="limit"
                        value={editedBudget.limit}
                        onChange={handleInputChange}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                      />
                      <select
                        name="month"
                        value={editedBudget.month || ""}
                        onChange={handleInputChange}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                      >
                        <option value="" disabled>
                          Select a month
                        </option>
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        name="year"
                        value={editedBudget.year}
                        onChange={handleInputChange}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-2 rounded"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <p className="text-2xl font-semibold">
                        Limit:{" "}
                        <span className="text-emerald-500 dark:text-emerald-300">
                          {budget.limit}
                        </span>
                      </p>
                      <p className="text-lg font-medium">
                        {findByValue(budget.month)} {budget.year}
                      </p>
                    </div>
                  )}
                </CardDescription>
              </CardHeader>
              {ProgressCard === budget._id ? (
                <CardContent className="relative flex flex-col items-center justify-center">
                  <Button
                    className="absolute left-2 bg-red-500 dark:bg-red-700 text-white dark:text-gray-100 font-bold rounded-full"
                    onClick={() => setProgressCard(null)}
                  >
                    {"<<"} Back
                  </Button>
                  <p className="text-red-500 dark:text-red-300 font-bold">
                    Limit: {budget.limit}
                  </p>
                  <p className="text-green-500 dark:text-green-300 font-bold">
                    Remaining Budget: {RemainingBudget}
                  </p>
                  <div className="h-28 w-28 mt-4">
                    <CircularProgressbar
                      value={PercentageUsage}
                      text={`${PercentageUsage}%`}
                      styles={{
                        path: {
                          stroke: "#4caf50",
                        },
                        text: {
                          fill: "#4caf50",
                          fontSize: "16px",
                        },
                        trail: {
                          stroke: "#d6d6d6",
                        },
                      }}
                    />
                  </div>
                </CardContent>
              ) : null}
              <CardFooter className="flex justify-between">
                {ProgressCard !== budget._id && (
                  <>
                    <Button
                      onClick={() => {
                        setProgressCard(
                          ProgressCard === budget._id ? null : budget._id
                        );
                        dispatch(
                          getprogress({
                            year: budget.year,
                            month: budget.month,
                            category: budget.category,
                          }) as any
                        );
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md"
                    >
                      Progress
                    </Button>
                    <Button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => handleDelete(budget._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                      onClick={() => handleUpdateClick(budget)}
                    >
                      {editingBudget === budget._id ? "Save" : "Update"}
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
      </div>
      {ProgressCard !== null && (
        <div className="mt-4 border border-green-500 flex justify-center">
          <Button
            onClick={handlePreviousPage}
            disabled={page <= 1}
            className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-l"
          >
            «
          </Button>
          <Button className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2">
            Page {page}
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={page === Totalpages}
            className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-r"
          >
            »
          </Button>
        </div>
      )}
    </div>
  );
};

export default GetBudgets;
