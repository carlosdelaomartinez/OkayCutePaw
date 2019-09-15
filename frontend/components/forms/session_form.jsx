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
  componentDidMount(){
    
    this.props.resetErrors();
  }

  componentWillUnmount(){

    clearTimeout(this.sTimer2);
    clearTimeout(this.sTimer1);

  }

  handleSubmit(e){
    e.preventDefault();
    let user = this.state;
    this.props.action(user).then(()=>{},() => this.renderErrors());
    
  }

  update(form){
    return (e) => (
      this.setState({[form]: e.target.value})
    )
  }

  handleDemoLogin(){
    
    const demonlogin = () => {
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
        this.props.action(user)
      }, 1500)
    }
    if (this.props.formType !== 'login') {
      this.props.history.push('/login')
      // this.handleDemoLogin()
      setTimeout( () => {
        document.querySelector('.session-demo-button').click()
      }, 50)
      
      
    } else {
      demonlogin();

      } 
  }

  renderErrors() {
    if (this.props.errors.length > 0){
      let container = document.querySelector('.error-container');
      this.sTimer1 = setTimeout(() => {
        if(container){
          container.classList.add('error-slide');
        }       
      }, 1)
      this.sTimer2 = setTimeout(() => {
        if (container){
          container.classList.remove('error-slide');
          this.props.resetErrors();
        }
      }, 2000)
    } 
  }

  render() {
    const formToRender = (this.props.formType === 'Sign up' ? (
      <div className="session-form">
        <label>
          Name
        </label>
        <input type="text" onChange={this.update('name')} placeholder='Name' value={this.state.name} />
        <label>Age
        </label>
        <input type="number" onChange={this.update('age')} placeholder='Age' value={this.state.age} />

        <label>
          Location 
        </label>
        <input type="text" onChange={this.update('location')} placeholder='Location' value={this.state.location} />

      </div>
    ) : '')
    let idx = this.props.errors.length - 1
    let error = this.props.errors[idx]

    return (
      <form className="auth-container" onSubmit={this.handleSubmit} >
        <div className="session-header-container">
          <div className='session-header'>
            <Link to={'/'} className="main-logo logo">
              <img src={window.splashlogoURL} />
            </Link>
            <div className="error-container" >
              <span className='session-error' key={idx}>{error}</span>
            </div>
          </div>
        </div>
        <div className="session-body-container">
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
            <div className="session-form-container">
              <div className="session-form">
                <label>
                  Username

                </label>
                <input type='text' onChange={this.update('username')} placeholder='Username' value={this.state.name} value={this.state.username} />
                <label>
                  Password
                </label>
                <input type='password' onChange={this.update('password')} placeholder='Password' value={this.state.password} />

              </div>
              {formToRender}
              <div className="session-buttons-container">
                <button className="session-type-button"> {this.props.formType === 'login' ? 'Sign in' : 'Sign up'}</button>
                <div className="session-demo-button" onClick={this.handleDemoLogin}>Sign In With Demo User</div>
              </div>
            </div>

          </div>
        </div>
        
      </form>
      )
    }
  }
  
  
  
export default withRouter(SessionForm);