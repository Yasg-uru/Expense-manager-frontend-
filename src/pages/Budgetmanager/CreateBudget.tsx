import { useDebugValue, useState } from "react";
import CreateBudgetInterface from "../../interfaces/CreateBudgetInterface";
import HomeWrapper from "../HomeWrapper";
import { useDispatch } from "react-redux";
import { createBudget } from "../../Redux_toolkit/BudgetSlice";
const CreateBudget: React.FC = () => {
  const [FormData, SetFormData] = useState<CreateBudgetInterface>({
    category: "",
    limit: 0,
    month: 0,
    year: 0,
  });
  const dispatch = useDispatch();

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(createBudget(FormData) as any);
    SetFormData({
      category: "",
      limit: 0,
      month: 0,
      year: 0,
    });
  };
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    SetFormData({
      ...FormData,
      [name]: value,
    });
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
  // console.log("this is a formdata month:",FormData.month)
  return (
    <HomeWrapper>
      <div className="bg-black min-h-screen w-full flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 p-4 border w-[40vw] rounded-lg shadow-2xl shadow-green-500 "
        >
          <h1 className="text-center text-green-500 font-bold text-2xl">
            Create Budget Form
          </h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-white ">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={FormData.category}
              onChange={handleChange}
              placeholder="Enter the amount"
              className="border w-full text-white border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="limit" className="text-white ">
              Limit
            </label>
            <input
              type="number"
              id="amount"
              name="limit"
              value={FormData.limit}
              onChange={handleChange}
              placeholder="Enter the limit"
              className="border w-full text-white border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="month" className="text-white ">
              Month
            </label>
            {/* <input
              type="text"
              id="month"
              name="month"
              value={FormData.month}
              onChange={handleChange}
              placeholder="Enter the month"
              className="border w-full text-white border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            /> */}
            <select
              id="month-dropdown"
              name="month"
              className="w-52 p-2 text-white border border-gray-300 rounded-md bg-black focus:outline-none focus:border-gray-500 transition-all duration-300 cursor-pointer"
              value={FormData.month || ""}
              onChange={handleChange}
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
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="month" className="text-white ">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={FormData.year}
              onChange={handleChange}
              placeholder="Enter the year"
              className="border w-full text-white border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            />
          </div>
          <button className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md ">
            Create Budget
          </button>
        </form>
      </div>
    </HomeWrapper>
  );
};
export default CreateBudget;
