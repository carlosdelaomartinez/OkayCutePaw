import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { logout } from '../../actions/session_actions'
import {toggleModal} from '../../actions/ui_actions'
const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id],
  currentModal: state.ui.currentModal
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  toggleModal: modalName => dispatch(toggleModal(modalName))
})

const handleClick = (e) => {
  e.preventDefault;
  // let target = document.querySelector('#nav-menu').classList;
  let downArrow = document.querySelector('.arrowdown').classList;
  let upArrow = document.querySelector('.arrowup').classList;
  if (upArrow[2] === 'hide-nav-item') {
    // target.remove('hide-nav-item')
    upArrow.remove('hide-nav-item')
    downArrow.add('hide-nav-item')


  } else {
    // target.add('hide-nav-item')
    upArrow.add('hide-nav-item')
    downArrow.remove('hide-nav-item')
   
  }
}


 const Navbar = (props) => (
  <div className={`nav-bar ${props.border ? 'border-bottom': ''}`}>  
    <div className='left-nav'>
      <Link className='nav-logo-container' to={`/home`}>
        <img className="nav-logo" src={window.mainlogoURL} alt="" />
      </Link>
      {/* <Link className="doubletake-container link-container" to={'#'}>
        <img src={window.doubletakeURL} />
        <span>DoubleTake</span>
      </Link> */}
      <Link className="search-logo-container link-container" to={'/search'}>
        <img src={window.searchpetURL} />
        <span>Browse</span>
      </Link>
      {/* <Link className="likes-logo-container link-container" to={'#'}>
        <img src={window.petpawURL} alt="" />
        <span>Likes</span>
      </Link> */}
      {/* <Link className="messages-logo-container link-container" to={'#'}>
        <img src={window.chatURL} alt="" />
        <span>messages</span>
      </Link> */}
    </div>
    <div className='right-nav'>
       <div className='profile-handler' onClick={() => props.toggleModal('nav-menu')}>
        <div className="nav-profile link-container" onClick={handleClick}>
          <img className='nav-profile-img' src={props.currentUser.photoUrl} alt="" />
           <div className="nav-username">
            {props.currentUser.name}
           </div>
          <div className="arrow-icons">
            <img className='menu-arrow arrowup hide-nav-item' src={window.arrupURL} alt="" />
            <img className='menu-arrow arrowdown' src={window.arrdownURL} alt="" />

          </div>
        </div>
        {props.currentModal === 'nav-menu' ? (
           <div id='nav-menu' className=''>
             <Link to={`/users/${props.currentUser.id}`} className='nav-menu-item'>Profile</Link>
             <div onClick={() => (props.logout().then(localStorage.removeItem('user')))} className='nav-menu-item nav-sign-out'>Sign Out</div>
           </div>
         ) : (<div className='hide-nav-item'></div>)}
        
      </div>

      <a href="https://github.com/carlosdelaomartinez" className="link-container nav-git pro-link">
        <img className='personal-link' src={window.ghURL} alt="" />
      </a>
      <a href="https://www.linkedin.com/in/carlos-delao-04619017/" className="link-container nav-linkedin pro-link">
        <img className='personal-link' src={window.liURL} alt="" />
      </a>
    </div>
 
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);