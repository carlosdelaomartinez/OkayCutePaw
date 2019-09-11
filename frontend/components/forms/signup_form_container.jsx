import React from 'react';
import {connect} from 'react-redux';
import SessionForm from './session_form';
import {signup, login} from '../../actions/session_actions';
const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
  formType: 'Sign up'
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  action: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user))
})

class CreateUser extends React.Component {


  render() {
    return (
      <SessionForm
        action={this.props.action}
        formType={this.props.formType}
        errors={this.props.errors}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)