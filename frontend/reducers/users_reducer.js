import { RECEIVE_CURRENT_USER, RECEIVE_USERS } from '../actions/session_actions'

const usersReducer = (state = {}, action) => {

  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    // return { [action.user.id]: action.user }
    case RECEIVE_USERS:
      // let userzips = [];
      // for (let id in action.users){
      //   userzips.push( action.users[id].location)
      // }
      
      // console.log(userzips);
      return Object.assign({}, state, action.users);
    default:
      return state;
  }
}

export default usersReducer;