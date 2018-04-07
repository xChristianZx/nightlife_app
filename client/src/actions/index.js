import axios from "axios";
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USER_LOGOUT
} from "./types";

export const fetchData = city => async dispatch => {
  dispatch({ type: FETCH_DATA_REQUEST });
  try {
    const res = await axios.post("/", { location: city });
    dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_DATA_ERROR, error: err });
  }
};

export const fetchUser = user => async dispatch => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const res = await axios.post("/login", user);
    dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_USER_ERROR,
      error: "Incorrect username or password"
    });
  }
};

export const userLogout = user => async dispatch => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const res = await axios.get("/logout", user);
    console.log(res);
    dispatch({ type: FETCH_USER_LOGOUT, payload: res.data.msg });
  } catch (err) {
    dispatch({
      type: FETCH_USER_ERROR,
      error: "There was an error logging out. Please try again"
    });
  }
};
