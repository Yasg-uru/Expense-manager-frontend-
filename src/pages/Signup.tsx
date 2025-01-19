import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/Redux_toolkit/hooks";
import { register } from "@/Redux_toolkit/AuthSlice";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

const SignupFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  profileurl: z.any().optional(),
});

type SignupFormType = z.infer<typeof SignupFormSchema>;

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [previewimage, setpreviewimage] = useState<string | null>("");

  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      profileurl: null,
    },
  });

  const onSubmit = (data: SignupFormType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.profileurl) {
      formData.append("profileurl", data.profileurl as Blob);
    }

    dispatch(register(formData))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadimage = e.target.files?.[0];
    if (uploadimage) {
      form.setValue("profileurl", uploadimage);
      const filereader = new FileReader();
      filereader.readAsDataURL(uploadimage);
      filereader.onload = () => {
        setpreviewimage(filereader.result as string);
      };
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white dark:bg-black">
      <div className="w-full max-w-md p-8 bg-white dark:bg-black border-2 border-green-500 rounded-lg text-black dark:text-white shadow-2xl shadow-gray-300 dark:shadow-gray-600">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-500 dark:text-green-400">
          Signup Form
        </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col items-center">
              <label htmlFor="image_uploads" className="cursor-pointer">
                {previewimage ? (
                  <img
                    className="h-24 w-24 rounded-full mx-auto"
                    src={previewimage}
                    alt="preview"
                  />
                ) : (
                  <BsPersonCircle className="h-24 w-24 text-black dark:text-white" />
                )}
              </label>
              <input
                type="file"
                id="image_uploads"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-700 dark:text-gray-300">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-semibold italic text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-700 dark:text-gray-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-semibold italic text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg text-gray-700 dark:text-gray-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create your password"
                      className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-semibold italic text-red-600" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-500 to-indigo-500 text-white font-bold rounded-full shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
