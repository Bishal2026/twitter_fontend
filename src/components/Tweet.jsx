import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/contants.js";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRrfresh } from "./redux/tweetSlice";
import { timeSince } from "../utils/contants.js";

function Tweet({ tweet }) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const likeAndDisLikeHandeler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        {
          id: user?._id,
        },
        { withCredentials: true }
      );

      dispatch(getRrfresh());

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTweetHandeler = async (id) => {
    try {
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      dispatch(getRrfresh());
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-b border-gray-200 ">
      <div className="flex items-center p-4">
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ23fcNCho0kfz0M6H6VEPVklv8Pm-gGiAoA&usqp=CAU"
          size="50"
          round={true}
        />
        <div className="ml-2 w-full">
          <div className="flex items-center ">
            <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
            <p className=" text-gray-500 text-sm ml-2">{`@${
              tweet?.userDetails[0]?.username
            },${timeSince(tweet?.createdAt)}`}</p>
          </div>
          <div className="">
            <p>{tweet?.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className=" flex items-center">
              <FaRegComment />
              <p>0</p>
            </div>
            <div className=" flex items-center   gap-1 ">
              <div
                onClick={() => likeAndDisLikeHandeler(tweet?._id)}
                className="hover:bg-red-300 hover:rounded-full hover:cursor-pointer"
              >
                <CiHeart />
              </div>

              <p>{tweet?.Like?.length}</p>
            </div>
            <div className=" flex items-center">
              <CiBookmark />
              <p>0</p>
            </div>
            {user?._id === tweet?.userId && (
              <div
                onClick={() => deleteTweetHandeler(tweet?._id)}
                className="flex items-center "
              >
                <div
                  className="   
              hover:bg-red-700 hover:rounded-full hover:cursor-pointer"
                >
                  <MdDeleteOutline />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
