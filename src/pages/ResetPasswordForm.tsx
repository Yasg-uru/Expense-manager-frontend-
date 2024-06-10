import { useState } from "react";
import HomeWrapper from "./HomeWrapper";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { ResetPassword } from "../Redux_toolkit/AuthSlice";
import { useParams } from "react-router-dom";
const ResetPasswordForm: React.FC = () => {
  const [Password, setPassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const dispatch = useDispatch();
  const { token } = useParams();

  const HandleFormSubmit = (event: any) => {
    event.preventDefault();
    if (Password !== confirmPassword) {
      toast.error("please enter correct password");

      return;
    }
    dispatch(ResetPassword({ token, Password }) as any);
  };
  return (
    <HomeWrapper>
      <div className="min-h-screen bg-black flex flex-cols items-center justify-center">
        <form
          className="flex flex-col gap-4 justify-center items-center text-white p-8 rounded-lg shadow-lg bg-black border-2 border-green-500"
          onSubmit={HandleFormSubmit}
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-green-500">
            Reset Password
          </h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-lg text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="name"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Type your new Password"
              className="border border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmpassword" className="text-lg text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(event) => {
                setconfirmPassword(event.target.value);
              }}
              placeholder="Enter your email"
              className="border border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md w-full"
          >
            Reset Passsword
          </button>
        </form>
      </div>
    </HomeWrapper>
  );
};
export default ResetPasswordForm;
