import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Loader2 } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/Redux_toolkit/hooks";
import { login } from "@/Redux_toolkit/AuthSlice";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const LoginFormSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });
  const { isLoading } = useAppSelector((state) => state.auth);

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully Logged in",
          description: "Logged in successfully. Explore courses and register.",
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: "Error user Login",
          description: error,
          variant: "destructive",
        });
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="w-full max-w-md p-8 bg-white dark:bg-black border-2 border-green-500 rounded-lg text-gray-800 dark:text-white shadow-2xl shadow-gray-600 dark:shadow-gray-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-500">
          Login To Continue
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-800 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                    Your email address.
                  </FormDescription>
                  <FormMessage className="text-red-600 dark:text-red-400 italic font-bold" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-800 dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-gray-500 dark:text-gray-400">
                    Your account password.
                  </FormDescription>
                  <FormMessage className="text-red-600 dark:text-red-400 italic font-bold" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-500 to-indigo-500 text-white font-bold rounded-full shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-800 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-500 hover:underline">
              Register here
            </Link>
          </span>
          <br />
          <span className="text-sm text-gray-800 dark:text-gray-300">
            Forgot your password?{" "}
            <Link
              to="/forgot-password"
              className="text-green-500 hover:underline"
            >
              Click here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
