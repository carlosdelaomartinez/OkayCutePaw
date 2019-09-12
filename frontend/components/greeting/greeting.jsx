import React from 'react';
import { Link } from 'react-router-dom'


const Greeting = (props) => {
  if(props.loggedIn){
    return (
      <div>
       <h1>Welcome {props.currentUser}</h1>
        <button onClick={props.logout}>Log Out</button>
      </div>
      )
  } else {
    return (
      <div>
        <Link className='btn' to='/signup'>Sign up</Link>
        <Link className='btn' to='/login'>Login </Link>
      </div>
    )
  }
}
  


export default Greeting;