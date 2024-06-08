export default interface ExpenseCardInterface {
    _id: string;
    category: string;
    description: string;
    amount: number;
    date: string;
    currency: string;
    userId:string;
    recurring:boolean;
  }