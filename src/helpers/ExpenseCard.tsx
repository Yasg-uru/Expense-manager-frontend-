// import ExpenseCardInterface from "../interfaces/ExpenseCardInterface";
interface expProp {
  expense: any;
}
const ExpenseCard: React.FC<expProp> = ({ expense }) => {
  return (
    <div
      key={expense._id}
      className="card w-[60vw] bg-black border border-green-500 shadow-xl"
    >
      <div className="card-body">
        <h2 className="card-title text-green-500">
          Category : {expense.category}
        </h2>
        <p className="text-green-500">Description : {expense.description}</p>
        <p className="text-green-500">Amount : {expense.amount}</p>
        <p className="text-green-500">Date : {expense.date.slice(0, 10)}</p>
        <p className="text-green-500">
          Currency : {expense.currency.slice(0, 10)}
        </p>
      </div>
    </div>
  );
};
export default ExpenseCard;
