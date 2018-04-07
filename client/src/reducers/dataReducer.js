import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR
} from "../actions/types";

export default function(state = { data: null, isFetching: false }, action) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload
      });
    case FETCH_DATA_ERROR:
      return Object.assign({}, state, { isFetching: true, data: action.error });
    default:
      return state;
  }
}
