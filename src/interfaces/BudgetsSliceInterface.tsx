interface Budget {
  _id: string;
  userId: string;
  category: string;
  limit: number;
  month: number;
  year: number;
  alertThreshold: number;
  actualSpent: number;

  __v?: number; // Optional property for Mongoose versioning
}
export default interface BudgetSliceInterface {
  BudgetArray: Budget[];
  Totalpages:number;
  RemainingBudget:number;
  PercentageUsage:number;
  isLoading:boolean;
  ProgressLoading:boolean;
}
