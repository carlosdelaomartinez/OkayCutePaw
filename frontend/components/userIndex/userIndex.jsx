import React from 'react';
import UserShowCard from '../user/userShowCard'
import Navbar from '../navbar/navbar';
import GreetingContainer from '../greeting/greeting_container';
class UsersIndex extends React.Component {

  render(){
    return(
      <div>
        <div className='nav-bar-container'>
          <Navbar />
          <GreetingContainer />
        </div>
        <span>This is User Index</span>
      </div>
    )
  }

}


export default UsersIndex