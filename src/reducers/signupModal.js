import {
  SIGNUP_MODAL_ON,
  SIGNUP_MODAL_OFF,
} from '../actions/signupModal';

const initialState = {
  visible: true,
};

export default function signupModal(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP_MODAL_ON:
      return Object.assign({}, state, {
        visible: true,
      });
    case SIGNUP_MODAL_OFF:
      return Object.assign({}, state, {
        visible: false,
      });
    default:
      return state;
  }
}
