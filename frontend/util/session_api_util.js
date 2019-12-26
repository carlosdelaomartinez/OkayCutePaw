export const login = ({ username, password }) => (
  $.ajax({
    method: "POST",
    url: "api/session/",
    data: {
      user: {
        username: username,
        password: password
      }
    }
  })
)

export const logout = () => (
  $.ajax({
    method: "DELETE",
    url: "api/session/"
  })
)


export const signup = (formData) => {

  return $.ajax({
    method: "POST",
    url: "/api/users/",
    data:  formData ,
    contentType: false, 
    processData: false   
  })

}

export const fetchUsers = (userPref) => {
  return $.ajax ({
    method: 'GET',
    url: "/api/users/",
    data: {userPref}
  });
};

export const fetchUser = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  });
}