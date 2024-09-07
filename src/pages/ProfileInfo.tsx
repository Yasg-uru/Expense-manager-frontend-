import { useDispatch, useSelector } from "react-redux";

import RootStateInterface from "../interfaces/RootStateInterface";
import { RiDeleteBin6Line } from "react-icons/ri";
import { User } from "../interfaces/AuthSlice";
import { useEffect, useState } from "react";
import {
  DeleteAccount,
  GetUserInfo,
  Profilechange,
  UpdateProfile,
} from "../Redux_toolkit/AuthSlice";
import { AiFillEdit } from "react-icons/ai";
const ProfileInfo: React.FC = () => {
  const dispatch = useDispatch();

  const { imageurl, email, name, role } = useSelector<RootStateInterface>(
    (state) => state.auth
  ) as User;
  const nameArr = name.split(" ");
  const [Firstname, setFirstname] = useState<string>(nameArr[0]);
  const [Lastname, setLastname] = useState<string>(nameArr[1]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const updateprofile = () => {
    const name = Firstname + " " + Lastname;

    dispatch(UpdateProfile(name) as any);
  };
  const deleteprofile = () => {
    dispatch(DeleteAccount() as any);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const profileurl: File | undefined = event.target.files?.[0];

    setSelectedFile(profileurl);

    console.log("this is a selected file:,", selectedFile);
    if (selectedFile) {
      dispatch(Profilechange(selectedFile) as any);
    }
  };
  useEffect(() => {
    dispatch(GetUserInfo() as any);
  }, [imageurl, name]);
  return (
    
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="flex flex-col gap-1 p-2 h-[50vh] w-[70vw] border-[0.5px] border-green-500 rounded-md">
          <div className="flex justify-between">
            <div className="text-white flex gap-2 p-4 items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                {imageurl ? (
                  <img
                    alt="Profile"
                    src={imageurl}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    alt="Default"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    className="w-full h-full object-cover rounded-full"
                  />
                )}
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 cursor-pointer"
                >
                  <AiFillEdit
                    className="absolute bottom-0 right-0 cursor-pointer"
                    color="grey"
                    size={18}
                  />
                </label>
                <input
                  type="file"
                  id="profileImage"
                  // accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <h1 className="text-green-500 font-bold text-xl">My Profile</h1>
            </div>
            <div onClick={deleteprofile} className="flex gap-2 items-center">
              <RiDeleteBin6Line color="red" size={26} />
              <p className="text-red-500">Delete Account</p>{" "}
            </div>
          </div>
          <div className="grid grid-rows-2 grid-cols-2 gap-4">
            {/* this is for updation in profile */}
            <div className="flex flex-col gap-2">
              <label htmlFor="Email" className="text-lg text-gray-300">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={Firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                placeholder="Enter your email"
                className="text-white border border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Email" className="text-lg text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={Lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                placeholder="Enter your email"
                className="text-white border border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Email" className="text-lg text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="Email"
                value={email}
                placeholder="Enter your email"
                disabled
                className="text-slate-500 border border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Email" className="text-lg text-gray-300">
                Role
              </label>
              <input
                type="text"
                name="role"
                value={role}
                disabled
                className="text-slate-500 border border-gray-700 rounded-md bg-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
              />
            </div>
          </div>
          <button
            onClick={updateprofile}
            className="btn bg-gradient-to-r from-green-500 to-indigo-500 hover:bg-gradient-to-l text-white font-bold py-2 px-4 rounded-full shadow-md w-full mt-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    
  );
};

export default ProfileInfo;
