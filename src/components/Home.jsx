import React, { useEffect } from "react";
import LeftSidebar from "./LeftSideBar";
import RightSidebar from "./RightSideBar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtheruser from "../hooks/useOtheruser";
import { useSelector } from "react-redux";
import useGetMyTweets from "../hooks/useGetMyTweets";

function Home() {
  const { user, otherUser } = useSelector((store) => store.user);

  useOtheruser(user?._id);
  useGetMyTweets(user?._id);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex mx-auto w-[80%] justify-between">
      <LeftSidebar />
      <Outlet />
      <RightSidebar otherUser={otherUser} />
    </div>
  );
}

export default Home;
