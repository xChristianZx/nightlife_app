import axios from "axios";
import { FETCH_DATA, FETCH_USER } from "./types";

export const fetchData = city => async dispatch => {
  const res = await axios.post("/", { location: city });
  dispatch({ type: FETCH_DATA, payload: res.data });
};

export const fetchUser = user => async dispatch => {
  console.log(user);
  try {
    const res = await axios.post("/login", user);
    dispatch({ type: FETCH_USER, status: "success", payload: res.data });
  } catch (err) {
    dispatch({
      type: FETCH_USER,
      status: "error",
      error: "Incorrect username or password"
    });
  }
};
