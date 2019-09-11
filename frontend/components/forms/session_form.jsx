import React from 'react'
import {Link, withRouter} from 'react-router-dom'
class SessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.formType === 'login' ? {
      username: '', password: ''
    } : {
      username: '', 
      password: '',
      name: '', 
      age: '',
      location: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  };

  handleSubmit(e){
    e.preventDefault();
    let user = this.state;
    this.props.action(user);
  }

  update(form){
    return (e) => (
      this.setState({[form]: e.target.value})
    )
  }

  handleDemoLogin(){
    if(this.props.formType != 'login'){
      this.props.history.push('/login')
      // this.handleDemoLogin()
    } else {
      this.setState({ username: '', password: '' })
      let un = 'thoreo'.split('')
      let pass = '123456'.split('')
      for (let i = 0; i < un.length; i++) {
        setTimeout(() => {
          this.setState({
            username: this.state.username + un[i],
            password: this.state.password + pass[i]
          });
        }, 1000)

      }
      setTimeout(() => {
        let user = this.state;
        this.props.login(user)
      }, 1500)
    }
  }

  renderErrors() {
    if (this.props.errors.length > 0){
      console.log(this.props.errors)
      let idx = this.props.errors.length - 1
      let error = this.props.errors[idx]
      return <li key={idx}>{error}</li>
    } 
  }

  render() {
    const formToRender = (this.props.formType === 'Sign up' ? (
      <form className="session-form">
        <label>
          Name:      
        </label>
        <input type="text" onChange={this.update('name')} placeholder='Name' value={this.state.name} />
        <label>Age
        </label>
        <input type="number" onChange={this.update('age')} placeholder='Age' value={this.state.age} />

        <label>
          Location 
        </label>
        <input type="text" onChange={this.update('location')} placeholder='Location' value={this.state.location} />

      </form>
    ) : '')

    return (
      <div className="auth-container">
        <div className="auth-errors">
          {this.renderErrors()}
        </div>
        <div className='session-header'>
          <div className='session-logo'>okcutepaw</div>
        </div>
        <div className="session-form-header">
          
          <div className="return-link">
              <Link to={`/`}>{`<`}</Link>
          </div>
          <div className="form-type-container">
            <div className="form-type">{this.props.formType === 'login' ? 'Sign in' : 'Sign up'}</div>
          </div>
        </div>
        <div className='session-container'>
          <div className="icon-holder">
            <i>🐕</i>
          </div>
          <div>
            <form className="session-form">
              <label>Username:</label>
              <input type='text' onChange={this.update('username')} placeholder='Username' value={this.state.name} value={this.state.username} />             
              <label>Password:</label>
              <input type='password' onChange={this.update('password')} placeholder='Password' value={this.state.password} />             
             
            </form>
            {formToRender}
          </div>
          <div className="session-buttons-container">
            <button onClick={this.handleSubmit}> {this.props.formType}</button>
            <button onClick={this.handleDemoLogin}>Demo User</button>
          </div>
        </div>
      </div>
      )
    }
  }
  
  
  
export default withRouter(SessionForm);