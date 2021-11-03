import axios from 'axios'
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConstant"


export const signin = (email, password) => async (dispacth) => {
  dispacth({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    dispacth({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userSigninMyClassroom", JSON.stringify(data));
  } catch (error) {
    const message = error.response.data.message && error.message ? error.response.data.message : error.message;
    dispacth({ type: USER_SIGNIN_FAIL, payload: message });
  }
}