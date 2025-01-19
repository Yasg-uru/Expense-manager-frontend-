import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux_toolkit/hooks";
import { Createexpense } from "../Redux_toolkit/ExpenseSlice";
import CreateExpenseInterface from "../interfaces/CreateExpenseInterface";
import { Loader2 } from "lucide-react";

const CreateExpense: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.expense);
  const [formData, setFormdata] = useState<CreateExpenseInterface>({
    amount: 0,
    category: "",
    date: new Date(),
    description: "",
    recurring: false,
    currency: "",
  });
  const [showOtherCategory, setShowOtherCategory] = useState<boolean>(false);
  const [otherCategory, setOtherCategory] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    if (name === "category") {
      if (value === "Other") {
        setShowOtherCategory(true);
        setFormdata({ ...formData, category: "" }); // Reset category when "Other" is selected
      } else {
        setShowOtherCategory(false);
        setFormdata({ ...formData, category: value });
      }
    } else {
      setFormdata({ ...formData, [name]: value });
    }
  };

  const handleOtherCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherCategory(event.target.value);
    setFormdata({ ...formData, category: event.target.value }); // Keep category updated
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(Createexpense(formData));
    setFormdata({
      amount: 0,
      category: "",
      date: new Date(),
      description: "",
      recurring: false,
      currency: "",
    });
    setShowOtherCategory(false);
    setOtherCategory("");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-4 justify-center items-center text-gray-900 dark:text-gray-100 p-8 rounded-lg shadow-lg bg-white dark:bg-black border-2 border-green-500 dark:border-green-400 max-w-sm"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-green-500">
          Create Expense
        </h1>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="amount" className="text-lg">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter the amount"
            className="border w-full border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="category" className="text-lg">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={showOtherCategory ? "Other" : formData.category}
            onChange={handleChange}
            className="border w-full border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
          >
            <option value="">Select a Category</option>
            <option value="Groceries">Groceries</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Transportation">Transportation</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {showOtherCategory && (
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="anothercategory" className="text-lg">
              Another Category
            </label>
            <input
              type="text"
              id="anothercategory"
              name="category"
              value={otherCategory}
              onChange={handleOtherCategoryChange}
              placeholder="Enter the category"
              className="border w-full border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              required
            />
          </div>
        )}

        <div className="flex w-full flex-col gap-2">
          <label htmlFor="date" className="text-lg">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            className="border w-full border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter the description"
            className="border w-full border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            required
          />
        </div>

        <button
          type="submit"
          className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md w-full"
        >
          {isLoading ? <Loader2 className="h-6 w-6 mr-2" /> : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default CreateExpense;
