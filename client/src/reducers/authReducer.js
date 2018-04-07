import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from "../actions/types";

export default function(state = { user: null, isFetching: false }, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.payload
      });
    case FETCH_USER_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.error
      });
    default:
      return state;
  }
}
