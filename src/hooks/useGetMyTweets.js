import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/contants.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets } from "../components/redux/tweetSlice.js";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh, isActive } = useSelector((store) => store.tweet);
  const fatchMyTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweet/${id}`, {
        withCredentials: true,
      });
      dispatch(getAllTweets(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };
  const followintTweet = async () => {
    try {
      const res = await axios.get(
        `${TWEET_API_END_POINT}/followingtweet/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getAllTweets(res.data.tweets));
      // dispatch(getRrfresh());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isActive) {
      fatchMyTweets();
    } else {
      followintTweet();
    }
  }, [isActive, refresh]);
};

export default useGetMyTweets;
