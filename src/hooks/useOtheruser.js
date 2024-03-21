import axios from "axios";
import { USER_API_END_POINT } from "../utils/contants.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getotheruser } from "../components/redux/userSlice.js";
const useOtheruser = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fatchOtheruser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`, {
          withCredentials: true,
        });
        dispatch(getotheruser(res.data.otherUser));
      } catch (error) {
        console.log(error);
      }
    };
    fatchOtheruser();
  }, []);
};

export default useOtheruser;
