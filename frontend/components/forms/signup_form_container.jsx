import React from 'react';
import {connect} from 'react-redux';
import SessionForm from './session_form';
import {signup, login, resetSessionErrors} from '../../actions/session_actions';
const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
  formType: 'Sign up'
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  action: (user) => dispatch(signup(user)),
  login: user => dispatch(login(user)),
  resetErrors: () => dispatch(resetSessionErrors())
})


export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)