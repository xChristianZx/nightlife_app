import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  VENUE_ADD_USER,
  VENUE_REMOVE_USER,
  VENUE_RSVP_ERROR,
} from '../actions/types';

export default function dataReducer(
  state = { data: null, isFetching: false },
  action
) {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return Object.assign({}, state, { isFetching: true });
    case FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.payload,
      });
    case VENUE_ADD_USER:
      return Object.assign(
        {},
        state,
        { isFetching: false },
        {
          data: state.data.map((item) => {
            if (item.id === action.id) {
              return Object.assign({}, item, {
                usersAttending: [...item.usersAttending, action.user_id],
              });
            }
            return item;
          }),
        }
      );
    case VENUE_REMOVE_USER:
      return Object.assign(
        {},
        state,
        { isFetching: false },
        {
          data: state.data.map((item) => {
            if (item.id === action.id) {
              return Object.assign({}, item, {
                usersAttending: item.usersAttending.filter(
                  (item) => item !== action.user_id
                ),
              });
            }
            return item;
          }),
        }
      );
    case FETCH_DATA_ERROR:
    case VENUE_RSVP_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.error,
      });
    default:
      return state;
  }
}
