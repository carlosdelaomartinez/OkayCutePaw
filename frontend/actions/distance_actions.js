export const RECEIVE_DISTANCE = 'RECEIVE_DISTANCE';
export const RECEIVE_DISTANCES = 'RECEIVE_DISTANCES';
import * as DistAPIutil from '../util/distance_api_util';

const receiveDistance= distance => ({
  type: RECEIVE_DISTANCE,
  distance
});

const receiveDistances = distances => ({
  type: RECEIVE_DISTANCES,
  distances
});

export const fetchUserDistances = currentUserId => dispatch => (
  DistAPIutil.fetchUserDistances(currentUserId)
    .then(distances => dispatch(receiveDistances(distances)))
);

export const updateUserDistance = distanceObject => dispatch => (
  DistAPIutil.updateUserDistance(distanceObject)
    .then(distance => dispatch(receiveDistance(distance)))
);

export const createUserDistance = distanceObject => dispatch => (
  DistAPIutil.createUserDistance(distanceObject)
    .then(distance => dispatch(receiveDistance(distance)))
);