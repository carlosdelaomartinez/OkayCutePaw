import React from 'react';
import {connect} from 'react-redux';
import Greeting from './greeting';
import {logoutCurrentUser, logout} from '../../actions/session_actions'

const mapStateToProps = (state) => {
  return {
    currentUser: () =>  state.entities.users[state.session.id].name,
    logoutCurrentUser: () => logoutCurrentUser(),
    loggedIn: Boolean(state.session.id)
  }
}



const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps,mapDispatchToProps)(Greeting)