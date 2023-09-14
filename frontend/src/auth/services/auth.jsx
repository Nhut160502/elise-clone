import Toast from "../components/Toast";
import { loginFailed, loginStart, loginSuccess } from "../providers/authSlice";
import axios from "../../untils/aixos";
export const apiLoginUser = async (data, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/auth/login", data);
    dispatch(loginSuccess(res));
    navigate("/dashboard");
  } catch (error) {
    console.log(error);
    dispatch(loginFailed(error.response.data));
    Toast("warning", error.response.data.message);
  }
};

// export const apiCheckToken = async (token) => {
//   try {
//     const res = await axios.post("/auth", token);
//   } catch (error) {

//   }
// };
