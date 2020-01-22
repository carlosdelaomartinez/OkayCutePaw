import { 
  RECEIVE_CURRENT_USER, 
  RECEIVE_USERS, 
  RECEIVE_USER ,
  CLEAR_USERS
} from '../actions/session_actions'

const usersReducer = (state = {}, action) => {

  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_USER: 
      return Object.assign({}, state, { [action.user.id]: action.user });
    case RECEIVE_USERS:
      return Object.assign({}, state, action.users);
    case CLEAR_USERS: 
      return Object.assign({}, {[action.currentUserID]: state[action.currentUserID]})
    default:
      return state;
  }
}

export default usersReducer;