export const RECEIVE_DISTANCE = 'RECEIVE_DISTANCE';
export const RECEIVE_DISTANCES = 'RECEIVE_DISTANCES';
import * as DistAPIutil from '../util/distance_api_util';

const receiveDistance= userPref => ({
  type: RECEIVE_DISTANCE,
  userPref
});

const receiveDistances = userPref => ({
  type: RECEIVE_DISTANCES,
  userPref
});

export const fetchUserDistances = userPref => dispatch => (
  DistAPIutil.fetchUserDistances(userPref)
    .then(distances => dispatch(receiveDistances(distances)))
);

export const updateUserDistance = userPref => dispatch => (
  DistAPIutil.updateUserDistance(userPref)
    .then(distance => dispatch(receiveDistance(distance)))
);

export const createUserDistance = userPref => dispatch => (
  DistAPIutil.createUserDistance(userPref)
    .then(distance => dispatch(receiveDistance(distance)))
);