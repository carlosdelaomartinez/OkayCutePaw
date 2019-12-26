export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_ERRORS'
export const RESET_ERRORS = 'RESET_ERRORS';
export const CLEAR_USERS = 'CLEAR_USERS';
import * as APIUtil from '../util/session_api_util';


export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});

export const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const resetErrors = (reset = []) => ({
  type: RESET_ERRORS,
  reset
});

export const clearUsers = currentUser => ({
  type: CLEAR_USERS,
  currentUser
});

export const resetSessionErrors = () => dispatch => (
  dispatch(resetErrors())
)

export const login = (user) => dispatch => (
  APIUtil.login(user)
    .then(user => dispatch(receiveCurrentUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
  APIUtil.logout().then(() => dispatch(logoutCurrentUser()),
  errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const signup = (user) => dispatch => (
  APIUtil.signup(user)
    .then(user => dispatch(receiveCurrentUser(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const fetchUsers = (userPref) => dispatch => (
  APIUtil.fetchUsers(userPref)
    .then(users => dispatch(receiveUsers(users)),
    errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const fetchUser = id => dispatch => (
  APIUtil.fetchUser(id)
    .then(user => dispatch(receiveUser(user)),
  errors => dispatch(receiveErrors(errors.responseJSON)))
)

export const clearOtherUsers = currentUser => dispatch => (
  dispatch(clearUsers(currentUser))
)
