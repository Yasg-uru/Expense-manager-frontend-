export default interface CreateExpenseInterface {
    amount: number;
    category: string;
    date: Date;
    description: string;
    recurring: boolean;
    currency: string;
  }