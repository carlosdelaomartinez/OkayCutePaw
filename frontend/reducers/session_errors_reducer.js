import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, RESET_ERRORS } from '../actions/session_actions';

const SesionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return state.concat(action.errors);
    case RECEIVE_CURRENT_USER || RESET_ERRORS:
      return [];
    default:
      return state;
  }

};

export default SesionErrorsReducer;