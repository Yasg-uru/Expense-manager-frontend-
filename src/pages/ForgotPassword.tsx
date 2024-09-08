import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useAppDispatch } from "@/Redux_toolkit/hooks";
import { forgotpassword } from "@/Redux_toolkit/AuthSlice";
import { useToast } from "@/hooks/use-toast";

// Zod schema for email validation
const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// Infer type from schema
type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const onSubmit = (data: ForgotPasswordType) => {
    const { email } = data;
    dispatch(forgotpassword(email))
      .unwrap()
      .then(() => {
        toast({
          title: "Reset Password Link sent Successfully",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen bg-black flex flex-cols items-center justify-center">
      <div className="w-full max-w-md p-8 bg-black border-2 border-green-500 rounded-lg text-white shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-500">
          Forgot Password
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
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
              Send Reset Link
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
