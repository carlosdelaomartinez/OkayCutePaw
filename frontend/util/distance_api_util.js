export const fetchUserDistances = (currentUserId) => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${currentUserId}/user_distances`
  });
};

export const createUserDistance = (distanceObject) => {
  return $.ajax({
    method: 'POST',
    url: `api/users/${currentUserId}/user_distances/`,
    data: { distanceObject }
  });
};

export const updateUserDistance = (distanceObject) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/users/${distanceObject.user_id}/user_distances/${distanceObject.distant_user_id}`,
    data: { user_distance: distanceObject }
  });
};

export const fetchDistanceFromApi = (userLocation, currUserLocation) => {
  return $.ajax({
    method: 'GET',
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLocation}&destinations=${currUserLocation}&key=${window.googleAPIKey}`
  })
}
//