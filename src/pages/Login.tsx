import { useState } from "react";
import HomeWrapper from "./HomeWrapper";
import LoginInterface from "../interfaces/LoginInterface";
import { useDispatch } from "react-redux";
import { forgotpassword, login } from "../Redux_toolkit/AuthSlice";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginInterface>({
    email: "",
    password: "",
  });
  const [isResetPassword, setisResetPassword] = useState<boolean>(false);
  const [Email, setEmail] = useState<string>("");

  const HandleFormDataEntry = (event: any) => {
    const { name, value } = event.target;
    if (name === "Email") {
      setEmail(value);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const HandleFormSubmit = (event: any) => {
    event.preventDefault();
    if (!isResetPassword) {
      dispatch(login(formData) as any);
      navigate("/");
    } else {
      dispatch(forgotpassword(Email) as any);
    }
  };
  const ToggleResetpassword = () => {
    setisResetPassword(!isResetPassword);
  };
  return (
    <HomeWrapper>
      <div className="h-screen flex justify-center items-center bg-black">
        <form
          className="flex flex-col gap-4 justify-center items-center text-white p-8 rounded-lg shadow-lg bg-black border-2 border-green-500"
          onSubmit={HandleFormSubmit}
        >
          {!isResetPassword ? (
            <>
              <h1 className="text-3xl font-bold text-center mb-6 text-green-500">
                Login Form
              </h1>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-lg text-gray-300">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={HandleFormDataEntry}
                  placeholder="Enter your email"
                  className="border border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-lg text-gray-300">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={HandleFormDataEntry}
                  placeholder="Create your password"
                  className="border border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-center mb-6 text-green-500">
                Reset Password Form
              </h1>

              <div className="flex flex-col gap-2">
                <label htmlFor="Email" className="text-lg text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={Email}
                  onChange={HandleFormDataEntry}
                  placeholder="Enter your email"
                  className="border border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md w-full"
          >
            {!isResetPassword ? "Login" : "send Mail"}
          </button>
          <p
            onClick={ToggleResetpassword}
            className="text-green-500 font-bold cursor-pointer"
          >
            {!isResetPassword ? "Forgot Password" : "Back To Login"}
          </p>
        </form>
      </div>
    </HomeWrapper>
  );
};

export default Login;
