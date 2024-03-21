import React, { useState } from "react";
import axios from "axios";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/contants.js";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getIsActive, getRrfresh } from "./redux/tweetSlice.js";

function CreatePost() {
  const dispatch = useDispatch();

  const [description, setdescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const submitHandeler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRrfresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setdescription("");
  };
  const forYouHandeler = () => {
    dispatch(getIsActive(true));
  };
  const followingHandeler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-[100%] ">
      <div>
        <div className="flex  justify-evenly items-center border-b border-red-300">
          <div
            onClick={forYouHandeler}
            className={`${
              isActive ? "border-b-4 border-blue-600" : "border-transparent"
            }cursor-pointer hover:bg-gray-200 text-center w-full px-3 py-1 `}
          >
            <h2 className=" font-semibold text-lg text-gray-800 mx-8 my-4 ">
              For you
            </h2>
          </div>

          <div
            onClick={followingHandeler}
            className={`${
              !isActive ? "border-b-4  border-blue-600" : "border-transparent"
            }cursor-pointer w-full hover:bg-gray-200 `}
          >
            <h2 className=" font-semibold text-lg text-gray-800 mx-8 my-4 ">
              Following
            </h2>
          </div>
        </div>
      </div>
      <div className="border-b border-red-300 ">
        <div className=" flex items-center p-2">
          <div>
            <Avatar
              src="data:image/jpeg;base64,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"
              size="50"
              round={true}
            />
          </div>
          <input
            value={description}
            onChange={(e) => {
              setdescription(e.target.value);
            }}
            className=" border-none w-full outline-none text-lg ml-2"
            type="text"
            placeholder="What is happening ?!"
          />
        </div>
        <div className="p-2 flex items-center justify-between">
          <CiImageOn size="24px" />

          <button
            onClick={submitHandeler}
            className="px-3 py-1 border-none bg-[#1D9BF0] text-md text-white rounded-full  font-bold"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
