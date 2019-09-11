import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, resetSessionErrors } from '../../actions/session_actions';
const mapStateToProps = (state, ownProps) => ({
  errors: state.errors.session,
  formType: 'login'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  action: (user) => dispatch(login(user)),
  login: user => dispatch(login(user)),
  resetErrors: () => dispatch(resetSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)