import axios from "axios";
import { ADD_CLASS_FAIL, ADD_CLASS_REQUEST, ADD_CLASS_SUCCESS } from "../constants/classConstant";


export const addClass = (name, description) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: ADD_CLASS_REQUEST });
  try {
    const { data } = await axios.post("/api/classes/add", { name, description, userId: userInfo._id }, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });
    dispatch({ type: ADD_CLASS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response.data.message && error.response ? error.response.data.message : error.message;
    dispatch({ type: ADD_CLASS_FAIL, payload: message });
  }
}