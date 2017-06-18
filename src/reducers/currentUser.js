import {
  SIGN_IN,
  SIGN_OUT,
} from '../actions/currentUser';

const initialState = {}

export default function currentUser(state = initialState, action = {}) {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        user: action.user,
      });
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
