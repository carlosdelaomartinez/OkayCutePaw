import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => (
  <div className="nav-bar">  
    <div className='left-nav'>
      <Link className='nav-logo-container' to={`/home`}>
        <img className="nav-logo" src={window.mainlogoURL} alt="" />
      </Link>
      <Link className="doubletake-container link-container">
        <img src={window.doubletakeURL} />
        <span>DoubleTake</span>
      </Link>
      <Link className="search-logo-container link-container">
        <img src={window.searchpetURL} />
        <span>Browse</span>
      </Link>
      <Link className="likes-logo-container link-container">
        <img src={window.petpawURL} alt="" />
        <span>Likes</span>
      </Link>
      <Link className="messages-logo-container link-container">
        <img src={window.chatURL} alt="" />
        <span>messages</span>
      </Link>
    </div>
    <div className='right-nav'>
      <Link className="profile"><i className="flaticon-dog"></i>Profile</Link>
      <Link className="personal-profile">Personal Profile links</Link>
    </div>
 
  </div>
)

export default Navbar;