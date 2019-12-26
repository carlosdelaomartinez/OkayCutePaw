import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';


const sessionReducer = (state = { user: null, id: null }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, { user: action.user, id: action.user.id })
    case LOGOUT_CURRENT_USER:
      return Object.assign({}, { user: null, id: null })
    default:
      return state;
  }
};

export default sessionReducer;