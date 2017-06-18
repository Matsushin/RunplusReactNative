import { combineReducers } from 'redux';

import currentUser from './currentUser';
import signupModal from './signupModal';

export default combineReducers({
  currentUser,
  signupModal,
});
