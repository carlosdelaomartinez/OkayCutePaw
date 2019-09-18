import React from 'react';
import {Link} from 'react-router-dom'
class UserShowCard extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const {user} = this.props
    return(
      <Link to={`/users/${user.id}`} className='user-card-container'>
        <div className='user-photo-container'>
          <img className='user-card-photo' src={user.photoUrl} alt="" />
        </div>
        <div className='user-info-container'>
          <div className='user-info'>
            {`${user.name}, ${user.age}`}
          </div>
          <div className='user-location-text'>
            Location holder
            </div>
        </div>
        <div className="match-container">
          <div className={`${user.matchPercent > 89 ? 'green-match' : 'blue-match'} match-percentage`}>
            {`${user.matchPercent.toString().slice(0, 2)}%`}
          </div>
        </div>
        

      </Link>
    )
  }
}

export default UserShowCard