import React from 'react';
import { Link } from 'react-router-dom'
class UserSnapShot extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { user } = this.props
    return (
      <Link to={`/users/${user.id}`} className='user-card-container'>
        <div className='user-photo-container'>
          <img className='user-card-photo' src={user.photoUrl} alt="" />
        </div>
        <div className='user-info-container'>
          <div className='user-info'>
            {`${user.name}`}
          </div>
          <div className='user-snapshot-text'>
            {`"${user.aboutMe}"`}
          </div>
        </div>


      </Link>
    )
  }
}

export default UserSnapShot;