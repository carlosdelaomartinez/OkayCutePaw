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


export const signup = (user) => {

  return $.ajax({
    method: "POST",
    url: "/api/users/",
    data: { user }
  })

}

export const fetchUsers = () => {
  return $.ajax ({
    method: 'GET',
    url: "/api/users/"
  });
};

export const fetchUser = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  });
}

