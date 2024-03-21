import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoBookmarksOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/contants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getProfile, getotheruser, getuser } from "./redux/userSlice";
import { getAllTweets } from "./redux/tweetSlice";

function LeftSidebar() {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogoutHandeler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      dispatch(getuser(null));
      dispatch(getotheruser(null));
      dispatch(getProfile(null));
      dispatch(getAllTweets(null));
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[20%]">
      <div className="my-4">
        <img
          className="w-[50px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpevfm2P0BtgC9LbXH1n2Xp-oR-iLX8xQTBg&usqp=CAU"
          alt=""
        />
      </div>
      <Link
        to="/"
        className="flex items-center my-2 px-4 py-2 hover:bg-gray-300 rounded-full"
      >
        <div className="w-[24px]">
          <MdHomeFilled size="24px" />
        </div>
        <h1 className="font-bold text-lg ml-2">Home</h1>
      </Link>
      <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-300 rounded-full">
        <div className="w-[24px]">
          <FaSearch size="24px" />
        </div>
        <h1 className="font-bold text-lg ml-2">Explore</h1>
      </div>
      <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-300 rounded-full">
        <div className="w-[24px]">
          <IoIosNotifications size="24px" />
        </div>
        <h1 className="font-bold text-lg ml-2">Notification</h1>
      </div>
      <Link
        to={`/Profile/${user?._id}`}
        className="flex items-center my-2 px-4 py-2 hover:bg-gray-300 rounded-full"
      >
        <div className="w-[24px]">
          <CiUser size="24px" />
        </div>
        <h1 className="font-bold text-lg ml-2">Profile</h1>
      </Link>
      <div className="flex items-center my-2 px-4 py-2 hover:bg-gray-300 rounded-full">
        <div className="w-[24px]">
          <IoBookmarksOutline size="24px" />
        </div>
        <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
      </div>
      <div
        onClick={LogoutHandeler}
        className="flex items-center my-2 px-4 py-2 hover:bg-gray-300 rounded-full"
      >
        <div className="w-[24px]">
          <IoMdLogOut size="24px" />
        </div>
        <h1 className="font-bold text-lg ml-2">Logout</h1>
      </div>
      <button className="px-4 py-2 border-none bg-[#1D9BF0] text-md text-white w-full rounded-full  font-bold">
        Post
      </button>
    </div>
  );
}

export default LeftSidebar;
