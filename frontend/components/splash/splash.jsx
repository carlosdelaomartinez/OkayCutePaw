import {Link} from 'react-router-dom'
import React from 'react';
import { clearInterval } from 'timers';
class SplashPage extends React.Component {
  // componentDidMount(){
  //   this.colorInterval = setInterval(() => {
      
  //     const colors = ['color1', 'color2', 'color3', 'color4']
  //     document.querySelector('.splash-content').classList()
  //     const next colo
  //   }, 5000)
  // }
  // componentWillUnmount(){
  //   clearInterval(this.colorInterval)
  // }

  render(){
    return (
      <div className='splash'>
        <div className="splash-content color1">
          <div className='splash-header-container'>
            <div className='splash-header'>
              <div className="splash-header-sub">
                <span>okcutepaw</span>
              </div>
              <div className="splash-header-sub">
                <span>Have an account?</span>
                <Link to={"/login"} className="splash-signin">Sign in</Link>
              </div>
            </div>

          </div>

          <div className='splash-top'>
            <div className='splash-text'>
              <h3>DOGS DESERVE BETTER</h3>
              <div className="greet-text">On OkCutePaw, dogs are more than just a photo. They have stories to tell and snuggles to share. Find a dog based on who you are, not what you look like. Because everyone deserves a pupper</div>

            </div>

            <div className='splash-img'></div>
            <div className='splash-tos-container'>
              <span>By clicking join you do not agree to our terms and conditions</span>
            </div>
            <div className="splash-signup-container">
              <Link to={'/signup'} className="splash-signup">Join OkCutePaw</Link>
            </div>
          </div>


        </div>
        <div className="splash-footer">
          <div className="splash-footer-container">
            <div className="splash-text">
              <span>promotional content</span>
            </div>
            <div className="personal-links">
              <span>links go here</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
} 

export default SplashPage;