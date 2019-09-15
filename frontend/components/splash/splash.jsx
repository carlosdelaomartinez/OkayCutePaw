import {Link} from 'react-router-dom'
import React from 'react';
import { clearInterval } from 'timers';
class SplashPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { color: 'color1'}
  }
  componentDidMount(){
    this.colorInterval = setInterval(() => {
      const colorOrder = ['color1', 'color2', 'color3', 'color4']
      let currentColor = this.state.color;
      let nextIdx = colorOrder.indexOf(currentColor) + 1
      let nextColor = colorOrder[nextIdx] !== undefined ? colorOrder[nextIdx] : colorOrder[0];
      this.setState({color: nextColor})
    }, 4000)
  }
  componentWillUnmount(){
    window.clearInterval(this.colorInterval)
  }

  render(){
    return (
      <div className='splash'>
        <div className={`splash-content ${this.state.color}`}>
          <div className='splash-header-container'>
            <div className='splash-header'>
              <div className="splash-header-sub">
                <span className="main-logo logo">okcutepaw</span>
              </div>
              <div className="splash-header-sub">
                <span className="splash-header-span">Have an account?</span>
                <Link to={"/login"} className="splash-signin">Sign in</Link>
              </div>
            </div>

          </div>

          <div className='splash-top'>
            <div className='splash-text'>
              <h3 className=".splash-head-text">DOGS DESERVE</h3>
              <h3 className=".splash-head-text">BETTER</h3>
              <div className="greet-text">They deserve you.On OkCutePaw, dogs are more than just a photo. They have stories to tell and snuggles to share. Find a dog who notices you for who you are, not what you look like. Feed them, care for them be their friend, because they'll always be yours.  Because every dog deserves a home. </div>

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