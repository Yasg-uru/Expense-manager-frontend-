
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch } from "react-redux";
import { ResetPassword } from "../Redux_toolkit/AuthSlice";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Zod schema for form validation
const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Infer type from schema
type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordForm: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const { toast } = useToast();

  const form = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordType) => {
    dispatch(ResetPassword({ token, Password: data.password }) as any)
      .unwrap()
      .then(() =>
        toast({
          title: "Reset Password Successfully",
        })
      )
      .catch(() =>
        toast({
          title: "Error in Password Reset",
          variant: "destructive",
        })
      );
  };

  return (
    <div className="min-h-screen bg-black flex flex-cols items-center justify-center">
      <div className="w-full max-w-md p-8 bg-black border-2 border-green-500 rounded-lg text-white shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-500">
          Reset Password
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="bg-black border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-semibold italic text-red-600" />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-300">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className="bg-black border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-semibold italic text-red-600" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-500 to-indigo-500 text-white font-bold rounded-full shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
