import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/contants.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getuser } from "./redux/userSlice.js";

function Login() {
  const [isLogin, setisLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const loginSignupHandeler = () => {
    setisLogin(!isLogin);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandeler = async (e) => {
    e.preventDefault();
    // console.log(name, email, username, password);
    if (isLogin) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log(res);
        dispatch(getuser(res?.data?.user));
        console.log(res);
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    } else {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          {
            name,
            email,
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log(res);
        if (res.data.success) {
          setisLogin(true);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[80%] h-screen  flex items-center justify-center">
      <div className="w-[50%]">
        <img
          className="ml-5 w-[580px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpevfm2P0BtgC9LbXH1n2Xp-oR-iLX8xQTBg&usqp=CAU"
          alt=""
        />
      </div>
      <div className="">
        <h1 className="text-5xl font-bold mb-5">Happening now</h1>
        <p className="font-bold">Join today.</p>
        <form onSubmit={submitHandeler} className=" flex flex-col">
          {!isLogin && (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="outline-none border-none
          p-4 mx-2 my-1"
                placeholder="username"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="outline-none border-none
          p-4 mx-2 my-1"
                placeholder="Name"
              />
            </>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="outline-none border-none
          p-4 mx-2 my-1"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="outline-none 
           p-4 mx-2 my-1 rounded-full "
            type="password"
            placeholder="password"
          />
          <button
            className=" bg-[#1D9BF0] w-full px-4 
          py-3 rounded-full border-none text-white text-lg"
          >
            {isLogin ? "Login" : "create Account"}
          </button>
          <h1 className="ml-2 my-2">
            {isLogin ? "Don`t any account !!" : "Already Have a Account ?"}
            <span
              onClick={loginSignupHandeler}
              className="font-bold ml-2 cursor-pointer"
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </h1>
        </form>
      </div>
    </div>
  );
}

export default Login;
