import React from 'react'
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
      <div>
        <header>{this.props.formType}</header>
        <form>
          <label>Username:
            <input type='text' onChange={this.update('username')} value={this.state.username}/>
          </label>
          <label>Password:
            <input type='password' onChange={this.update('password')} value={this.state.password} />
          </label>
          {formToRender}
          <button onClick={this.handleSubmit}> {this.props.formType}</button>
        </form>
      </div>
    )
  }
}



export default SessionForm;