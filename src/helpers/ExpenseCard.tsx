interface expProp {
  expense: any;
}

const ExpenseCard: React.FC<expProp> = ({ expense }) => {
  return (
    <div
      key={expense._id}
      className="card w-full  bg-white dark:bg-black border border-gray-300 dark:border-green-500 shadow-lg transition-colors duration-300"
    >
      <div className="card-body p-4">
        <h2 className="card-title text-black dark:text-green-500">
          Category: {expense.category}
        </h2>
        <p className="text-black dark:text-green-400">
          Description: {expense.description}
        </p>
        <p className="text-black dark:text-green-400">
          Amount: {expense.amount}
        </p>
        <p className="text-black dark:text-green-400">
          Date: {expense.date.slice(0, 10)}
        </p>
        <p className="text-black dark:text-green-400">
          Currency: {expense.currency}
        </p>
      </div>
    </div>
  );
};

export default ExpenseCard;
