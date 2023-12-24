import React, { useCallback, useState } from "react";
import LoginSignUp from "../assest/login-animation.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ImageToBase64 } from "../utility/ImageToBase64";
import { toast } from "react-hot-toast";
import { useAuth } from "../utility/useAuth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleShowPasswordToggle = useCallback(() => {
    setShowPassword((prevValue) => !prevValue);
  }, []);
  const handleShowConfirmPassWordToggle = useCallback(() => {
    setConfirmPassword((prevValue) => !prevValue);
  }, []);

  console.log("HI")
  const handleUploadProfileImage = useCallback(async (e) => {
    // console.log("dsfsddf", e.target.files[0]);
    const data = await ImageToBase64(e.target.files[0]);

    setFormData((prevValue) => {
      return {
        ...prevValue,
        image: data,
      };
    });
  }, []);

  const handleChange = useCallback(async (e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }, []);

  const handleRegister = useCallback(
    async (payload) => {
      try {
        const fetchData = await authFetch(
          `/signUp`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          }
        );
        const data = await fetchData.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    [authFetch]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { firstName, email, password, confirmPassword } = formData;
      if (firstName && email && password && confirmPassword) {
        if (password === confirmPassword) {
          const respond = await handleRegister(formData);

          if (respond && respond.message) {
            toast(respond?.message); 
          } else {
            toast("Unexpected response from the server");
          }
          if (respond && respond.isResgistration) {
            navigate("/login");
          }
        } else {
          toast("Passwords do not match");
        }
      } else {
        toast("Please enter the required fields");
      }
    },
    [formData, handleRegister, navigate]
  );

  return (
    <div className="p-3 md:p-4 ">
      <div className="w-full max-w-sm bg-white m-auto flex justify-center flex-col p-4">
        {/* <h1 className="text-center text-2xl font-bold ">Sign Up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img
            src={formData.image ? formData.image : LoginSignUp}
            alt="error"
            className="w-full h-full"
          />
          <label htmlFor="proflieImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type="file"
              id="proflieImage"
              className="hidden"
              accept="image/*"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className=" mt-1 mb-4 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className=" mt-1 mb-4 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            autoComplete="off"
            onChange={handleChange}
            placeholder="Email"
            className=" mt-1 mb-4 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="password"> Password</label>
          <div className="flex px-2 py-1 bg-slate-200 mt-1 mb-4 rounded focus-within:outline focus-within:outline-blue-300 items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              // autoComplete="new-password"
              placeholder="Password"
              name="password"
              className=" w-full bg-slate-200 px-2 py-1 rounded border-none outline-none"
            />
            <span
              className="flex text-xl align-center justify-center cursor-pointer"
              onClick={() => handleShowPasswordToggle(showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 mt-1 mb-4 rounded focus-within:outline focus-within:outline-blue-300 items-center">
            <input
              type={confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="ConfirmPassword"
              className=" w-full bg-slate-200 px-2 py-1 rounded border-none outline-none"
            />
            <span
              className="flex text-xl align-center justify-center cursor-pointer"
              onClick={() => handleShowConfirmPassWordToggle(confirmPassword)}
            >
              {confirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button
            type="submit"
            className="max-w-[120px] w-full bg-red-500  m-auto rounded-full hover:bg-red-600 cursor-pointer text-white p-2 text-xl text-medium"
          >
            Sign Up
          </button>
        </form>
        <p className="text-left text-base mt-3">
          Already Have an account ?{" "}
          <Link className="text-red-500 underline" to={"/login"}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
