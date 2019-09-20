import {RECEIVE_DISTANCE, RECEIVE_DISTANCES} from '../actions/distance_actions';

const DistanceReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type){
    case RECEIVE_DISTANCE:
      return Object.assign({}, {[action.distance.id]: action.distance })
    case RECEIVE_DISTANCES:
      return Object.assign({}, state. action.distances)
    default: 
      return state;
  }
};

export default DistanceReducer;