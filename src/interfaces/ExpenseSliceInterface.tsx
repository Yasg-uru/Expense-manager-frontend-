export interface expenseInfo {
  _id: string;
  userId: string;
  amount: number;
  category: string;
  date: string; // Date string in ISO 8601 format (e.g., "2024-05-27T00:00:00.000Z")
  description: string;
  recurring: boolean;
  currency: string;
}
interface YearlyExpensesByDay {
  [month: string]: { [day: string]: number };
}

export default interface ExpenseInterface {
  ExpenseArray: expenseInfo[];
  isLoading:boolean;
  
  TotalPages: number;
  TotalExpenses: number;
  FullWeekExpense: expenseInfo[];
  FullYearExpense: YearlyExpensesByDay;
}
