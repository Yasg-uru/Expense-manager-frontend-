import BudgetSliceInterface from "./BudgetsSliceInterface";
import ExpenseInterface from "./ExpenseSliceInterface";

export default interface RootStateInterface {
  expense: ExpenseInterface;
  budget: BudgetSliceInterface;
}
