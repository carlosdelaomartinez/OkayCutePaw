export const fetchUserDistances = (userPref) => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${userPref.id}/user_distances`,
    data: {userPref}
  });
};


export const createUserDistance = (userPref) => {
  return $.ajax({
    method: 'POST',
    url: `api/users/${userPref.id}/user_distances/`,
    data: {userPref}
  });
};

export const updateUserDistance = (userPref) => {
  return $.ajax({
    method: 'PATCH',
    url: `api/users/${userPref.id}/user_distances/`,
    data: { userPref }
  });
};

//