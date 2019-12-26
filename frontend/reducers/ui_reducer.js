import {
  TOGGLE_MODAL
} from '../actions/ui_actions';

const UIReducer = (state = {currentModal: null}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case TOGGLE_MODAL:
      return state.currentModal === action.modal ?
        (Object.assign({}, {currentModal: null})) : 
        (Object.assign({}, {currentModal: action.modal} ))
    default: 
    return state;
  }
}

export default UIReducer;