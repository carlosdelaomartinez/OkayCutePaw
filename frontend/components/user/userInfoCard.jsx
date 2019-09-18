import React from 'react';

class UserInfoCard extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='userInfoCard'>
        <div className='userinfo-title'>
          {this.props.title}
        </div>
        <div className='userinfocard-content'>
          <div className='userinfo-text'>
            {this.props.info}
          </div>
          
        </div>
      </div>
    )
  }
}

export default UserInfoCard;