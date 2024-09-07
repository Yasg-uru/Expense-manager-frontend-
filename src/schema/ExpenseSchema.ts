import {z} from "zod"
export const createExpenseSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be greater than zero"),
  category: z.string().min(1, "Category is required"),
  date: z
    .string()
    .min(1, "Date is required")
    ,
  description: z.string().min(1, "Description is required"),
 
});
