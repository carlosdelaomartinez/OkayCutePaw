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

  render() {
    const formToRender = (this.props.formType === 'signup' ? (
      <div>
        <label>
          Name: 
          <input type="text" onChange={this.update('name')} value={this.state.name}/>
        </label>
        <label>Age
          <input type="number" onChange={this.update('age')} value={this.state.age}/>
        </label>
        <label>
          Location 
          <input type="text" onChange={this.update('location')} value={this.state.location}/>
        </label>
      </div>
    ) : '')

    return (
      <div className="auth-container">
        <div className='login-header'>
          <div className='login-logo'>OkCutePaw</div>
        </div>
        <div className='login-container'>
          <div className="login-header">
            <div>
              <div>
                <Link to={`/`}>{`<`}</Link>
              </div>
            </div>
            <div className="form-type">{this.props.formType}</div>
          </div>
          <div className="icon-holder">
            <i>icone placeholder</i>
          </div>
          <div className="login-form">
            <form>
              <label>Username:
              <input type='text' onChange={this.update('username')} value={this.state.username} />
              </label>
              <label>Password:
              <input type='password' onChange={this.update('password')} value={this.state.password} />
              </label>
              {formToRender}
            </form>
          </div>
          <div className="login-buttons">
            <button onClick={this.handleSubmit}> {this.props.formType}</button>
            <button onClick={this.handleDemoLogin}>Demo User</button>
          </div>
        </div>
      </div>
      )
    }
  }
  
  
  
export default withRouter(SessionForm);