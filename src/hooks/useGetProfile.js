import axios from "axios";
import { USER_API_END_POINT } from "../utils/contants.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "../components/redux/userSlice.js";
const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fatchMyProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/profile/${id}`, {
          withCredentials: true,
        });
        dispatch(getProfile(res.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    fatchMyProfile();
  }, [id]);
};

export default useGetProfile;
