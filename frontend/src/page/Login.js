import React, { useCallback, useState } from "react";
import LoginSignUp from "../assest/login-animation.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../utility/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { authFetch } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleShowPasswordToggle = useCallback(() => {
    setShowPassword((prevValue) => !prevValue);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }, []);

  const handleLogin = useCallback(
    async (payload) => {
      try {
        const res = await authFetch(`/login`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res?.status === 200) {
          return data;
        }

        return null;
      } catch (err) {
        throw err;
      }
    },
    [authFetch]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { email, password } = formData;
      if (email && password) {
        const respond = await handleLogin(formData);

        if (respond && respond?.message) {
          toast(respond?.message);
        } else {
          toast("Unexpected response from the server");
        }
        if (respond && respond.isLogin) {
          setInterval(() => {
            navigate("/");
          }, 1000);
        }
      } else {
        toast("Please enter the required fields");
      }
    },
    [formData, handleLogin, navigate]
  );
  return (
    <div className="p-3 md:p-4 ">
      <div className="w-full max-w-sm bg-white m-auto flex justify-center flex-col p-4">
        {/* <h1 className="text-center text-2xl font-bold ">Sign Up</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img
            src={LoginSignUp}
            alt="error
        "
            className="w-full"
          />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
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
              autoComplete="new-password"
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
          <button
            type="submit"
            className="max-w-[120px] w-full bg-red-500  m-auto rounded-full hover:bg-red-600 cursor-pointer text-white p-2 text-xl text-medium"
          >
            Login
          </button>
        </form>
        <p className="text-left text-base mt-3">
          Don't have account ?{" "}
          <Link className="text-red-500 underline" to={"/signUp"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
