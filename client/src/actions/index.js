import axios from "axios";
import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_ERROR,
  FETCH_USER_SUCCESS,
  FETCH_USER_LOGOUT,
  VENUE_ADD_USER,
  VENUE_REMOVE_USER,
  VENUE_RSVP_ERROR
} from "./types";

export const fetchData = city => async dispatch => {
  dispatch({ type: FETCH_DATA_REQUEST });
  try {
    const res = await axios.get(`/venue/${city}`);
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
    dispatch({ type: FETCH_USER_LOGOUT });
  } catch (err) {
    dispatch({
      type: FETCH_USER_ERROR,
      error: "There was an error logging out. Please try again"
    });
  }
};

export const registerUser = user => async dispatch => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const res = await axios.post("/register", user);
    dispatch({ type: FETCH_USER_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_USER_ERROR,
      error: err.response.data.message
    });
  }
};

export const venueAddUser = newAttendee => async dispatch => {
  try {
    await axios.post("/venue/user", newAttendee);
    dispatch({
      type: VENUE_ADD_USER,
      id: newAttendee.yelp_id,
      user_id: newAttendee._user
    });
  } catch (err) {
    dispatch({ type: VENUE_RSVP_ERROR, error: err });
  }
};

export const venueRemoveUser = user => async dispatch => {
  try {
    await axios.put("/venue/user", user);
    dispatch({
      type: VENUE_REMOVE_USER,
      id: user.yelp_id,
      user_id: user._user
    });
  } catch (err) {
    dispatch({ type: VENUE_RSVP_ERROR, error: err });
  }
};
