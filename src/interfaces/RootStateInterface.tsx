import { User } from "./AuthSlice";
import BudgetSliceInterface from "./BudgetsSliceInterface";
import ExpenseInterface from "./ExpenseSliceInterface";

export default interface RootStateInterface {
  auth: User;
  expense: ExpenseInterface;
  budget: BudgetSliceInterface;
}
