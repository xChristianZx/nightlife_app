import axios from "axios";
import { FETCH_DATA } from "./types";

export const fetchData = city => async dispatch => {
  const res = await axios.post("/", { location: city });
  dispatch({ type: FETCH_DATA, payload: res.data });
};
