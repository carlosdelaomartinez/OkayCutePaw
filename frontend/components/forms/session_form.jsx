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
      location: '', 
      distance: '', 
      looking_for: '',
      looking_age_lower: 1,
      looking_age_higher: 16,
      gender: '',
      photo: ''
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
    if(this.props.formType === 'login'){
      let user = this.state;
      this.props.action(user).then(() => { }, () => this.renderErrors());
    } else if (this.props.formType === 'Sign up'){
      const formData = new FormData();
      for(let key in this.state){
        formData.append(`user[${key}]`, this.state[key])
      }
      this.props.action(formData).then(() => {}, () => this.renderErrors());
    }
    
    
  }

  update(form){
    if(form !== 'photo'){
      return (e) => (
        this.setState({ [form]: e.target.value })
      )
    } else {
      return (e) => (
        this.setState({ photo: e.currentTarget.files[0]})
      )
    }
    
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
        <div>
          <label>Age
        </label>
          <input type="number" onChange={this.update('age')} placeholder='Age' value={this.state.age} />
          <label>
            Gender
              </label>
          <select onChange={this.update('gender')}>
            <option value="MALE" >Male</option>
            <option value="FEMALE" >Female</option>
          </select>
        </div>


        <label>
          Location
        </label>
        <input type="text" onChange={this.update('location')} placeholder='Location' value={this.state.location} /> 
        <div className="looking">
          <div className="looking-row">
            <label>
              Looking for
              </label>
            <select onChange={this.update('looking_for')}>
                <option value="MALE" >Male</option>
                <option value="FEMALE" >Female</option>
                <option value="ALL" >ALL</option>
          </select>
            
            <label >
              Within
            
            <select onChange={this.update('distance')}>
              <option value="10" >10</option>
              <option value="20" >20</option>
              <option value="50" >50</option>
              <option value="100" >100</option>
              <option value="500" >500</option>
              <option value="1000" >1000</option>

            </select>
            </label>
            Miles
          </div>
          <div className="looking-row">
            <label >
              Ages
            </label>
            <input type="number" 
              className="age-range" 
              onChange={this.update('looking_age_lower')} 
              value={this.state.looking_age_lower}
            />
            to
           <input 
            type="number" 
            className="age-range" 
            onChange={this.update('looking_age_higher')} 
            value={this.state.looking_age_higher}
          />
          </div>      
          <input type="file" onChange={this.update('photo')} />
    
        </div>

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