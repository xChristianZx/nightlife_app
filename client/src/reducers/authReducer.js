import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  switch (action.status) {
    case "success":
      return action.payload;
    case "error":
      return action.error;
    default:
      return state;
  }
}
