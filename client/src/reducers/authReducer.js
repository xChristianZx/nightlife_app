import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_LOGOUT,
} from '../actions/types';

export default function authReducer(
  state = { user: null, isLoggedIn: false, isFetching: false, msg: null },
  action
) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return Object.assign({}, state, { isFetching: true, msg: null });
    case FETCH_USER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: true,
        user: action.payload,
      });
    case FETCH_USER_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        msg: action.error,
      });
    case FETCH_USER_LOGOUT:
      return Object.assign({}, state, {
        isFetching: false,
        isLoggedIn: false,
        msg: null,
        user: null,
      });
    default:
      return state;
  }
}
