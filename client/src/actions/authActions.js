import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/auth";
import { LOGIN_FAIL } from "../constants/auth";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem("currentUser", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register =
  (email, password, passwordVerify, name) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
      const { data } = await axios.post("http://localhost:5000/register", {
        email,
        name,
        password,
        passwordVerify,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
    }
  };

export const logout = () => async (dispatch) => {
  await axios.get("http://localhost:5000/logout");
  localStorage.removeItem("currentUser");
  dispatch({ type: LOGOUT, payload: {} });
};
