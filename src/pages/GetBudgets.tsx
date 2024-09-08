import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  DeleteBudget,
  Getbudgets,
  UpdateBudget,
  getprogress,
} from "../Redux_toolkit/BudgetSlice";
import { Skeleton } from "@/components/ui/skeleton";

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
import { useAppSelector } from "@/Redux_toolkit/hooks";
import { Loader2 } from "lucide-react";

const GetBudgets: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [editingBudget, setEditingBudget] = useState<string | null>(null);
  const [editedBudget, setEditedBudget] = useState<any>({});
  const [ProgressCard, setProgressCard] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Getbudgets(page) as any);
  }, [dispatch, page]);

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

  const {
    PercentageUsage,
    RemainingBudget,
    isLoading,
    ProgressLoading,
    BudgetArray,
    Totalpages,
  } = useAppSelector((state) => state.budget);
  console.log(
    "this is a precentage usage remaing ",
    PercentageUsage,
    RemainingBudget
  );
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-black p-4 md:p-6">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col p-4 items-center w-full bg-gray-100 dark:bg-black">
      <h1 className="text-center text-2xl font-bold text-green-500 mb-4">
        Get Your Budgets
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        {BudgetArray?.length > 0 &&
          BudgetArray.map((budget: any) => (
            <Card
              key={budget._id}
              className="relative bg-white dark:bg-black text-gray-900 dark:text-gray-100 shadow-lg dark:shadow-black rounded-lg overflow-hidden"
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
                        className="bg-gray-200 dark:bg-black text-gray-900 dark:text-gray-100 p-2 rounded"
                      />
                      <input
                        type="number"
                        name="limit"
                        value={editedBudget.limit}
                        onChange={handleInputChange}
                        className="bg-gray-200 dark:bg-black text-gray-900 dark:text-gray-100 p-2 rounded"
                      />
                      <select
                        name="month"
                        value={editedBudget.month || ""}
                        onChange={handleInputChange}
                        className="bg-gray-200 dark:bg-black text-gray-900 dark:text-gray-100 p-2 rounded"
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
                        className="bg-gray-200 dark:bg-black text-gray-900 dark:text-gray-100 p-2 rounded"
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
                ProgressLoading ? (
                  <div className="relative flex flex-col items-center justify-center p-4 bg-white dark:bg-black rounded-lg shadow-lg">
                    {/* Back button skeleton */}
                    <p className="font-bold text-black dark:text-white text-xl ">...Loading</p>
                    <Skeleton className="absolute left-2 h-8 w-24 rounded-full" />

                    {/* Limit skeleton */}
                    <Skeleton className="h-4 w-36 mt-4" />

                    {/* Remaining Budget skeleton */}
                    <Skeleton className="h-4 w-36 mt-2" />

                    {/* Circular progress skeleton */}
                    <Skeleton className="h-28 w-28 mt-4 rounded-full" />
                  </div>
                ) : (
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
                        text={`${Math.floor(PercentageUsage)}%`}
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
                )
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
      {ProgressCard !== null && BudgetArray.length>10 && (
        <div className="mt-4 border border-green-500 flex justify-center">
          <Button
            onClick={handlePreviousPage}
            disabled={page <= 1}
            className="bg-gray-800 dark:bg-black text-white px-4 py-2 rounded-l"
          >
            «
          </Button>
          <Button className="bg-gray-800 dark:bg-black text-white px-4 py-2">
            Page {page}
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={page === Totalpages}
            className="bg-gray-800 dark:bg-black text-white px-4 py-2 rounded-r"
          >
            »
          </Button>
        </div>
      )}
    </div>
  );
};

export default GetBudgets;
