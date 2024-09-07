import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createBudget } from "../../Redux_toolkit/BudgetSlice";
import { useAppDispatch, useAppSelector } from "@/Redux_toolkit/hooks";
import { Loader2 } from "lucide-react";

// Define the Zod schema for form validation
const CreateBudgetSchema = z.object({
  category: z.string().min(1, "Category is required"),
  limit: z.number().min(1, "Limit must be greater than 0"),
  month: z.number().min(1, "Please select a valid month"),
  year: z.number().min(1, "Please enter a valid year"),
});

type CreateBudgetSchemaType = z.infer<typeof CreateBudgetSchema>;

const CreateBudget: React.FC = () => {
  const dispatch = useAppDispatch();

  const form = useForm<CreateBudgetSchemaType>({
    resolver: zodResolver(CreateBudgetSchema),
    defaultValues: {
      category: "",
      limit: 0,
      month: 0,
      year: 0,
    },
  });

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

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: 10 },
    (_, index) => currentYear + index
  );

  const onSubmit = (data: CreateBudgetSchemaType) => {
    console.log("Form submitted:", data);
    dispatch(createBudget(data));
  };
  const { isLoading } = useAppSelector((state) => state.budget);
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 dark:bg-black">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg border-2 border-green-600  shadow-md dark:bg-black">
        <h1 className="text-center text-green-500 font-bold text-2xl">
          Create Budget Form
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      name="category"
                    >
                      <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 dark:bg-black">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entertainment">
                          Entertainment
                        </SelectItem>
                        <SelectItem value="Bills">Bills</SelectItem>
                        <SelectItem value="Transportation">
                          Transportation
                        </SelectItem>
                        <SelectItem value="Groceries">Groceries</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                    Enter your budget category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Limit
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter limit"
                      className="border-gray-300 dark:border-gray-600 dark:bg-black"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                    Enter the budget limit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Month
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value?.toString() || ""}
                      onValueChange={(value) => field.onChange(Number(value))}
                      name="month"
                    >
                      <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 dark:bg-black">
                        <SelectValue placeholder="Select a month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Months</SelectLabel>
                          {months.map((month) => (
                            <SelectItem
                              key={month.value}
                              value={month.value.toString()}
                            >
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">
                    Year
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={field.value?.toString() || ""}
                      onValueChange={(value) => field.onChange(Number(value))}
                      name="year"
                    >
                      <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 dark:bg-black">
                        <SelectValue placeholder="Select a year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Years</SelectLabel>
                          {yearOptions.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 rounded-full shadow-md"
            >
              {!isLoading ? (
                " Create Budget"
              ) : (
                <Loader2 className="h-6 w-6 animate-spin " />
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBudget;
