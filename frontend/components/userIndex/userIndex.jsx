import React from 'react'
import UserShowCard from '../user/userShowCard';


class UserIndex extends React.Component {
  constructor(props){
    super(props)
    this.generateUserList = this.generateUserList.bind(this);
  }
  generateUserList(){
    const {currentUser} = this.props;
    let users = Object.assign({}, this.props.users);
    delete users[currentUser.id];
    if(this.props.sort === 'top-matches'){
      return Object.keys(users)
        .map(id => users[id])
        .sort((a,b) => b.matchPercent - a.matchPercent)
        .slice(0, 14)
        .map(user => <UserShowCard user={user} />)
    } else {
      return Object.keys(users)
        .map(id => users[id])
        .slice(0, 14)
        .map((user, i) => <UserShowCard user={user} key={i}/>)
    }
  }

  render(){
    return (
      <div className='user-discovery'>
        <div className='user-discovery-content'>
          <div className='user-disc-title'>
            <span>{this.props.title}</span>
          </div>  
          <div className='user-discovery-content-row'>
            <div className='user-slider-outer'>
              <button className="browse-left browse-btn" >
                <img src={window.leftarrowURL} />
              </button>
              <div className="slider-container">
                <div className='user-slider-inner'>
                  {this.generateUserList()}
                </div>
              </div>
                    
              <button className="browse-right browse-btn">
                <img src={window.rightarrowURL} alt="" />
              </button>          

            </div>
              
          </div>
        </div>
        
      </div>
    )
  }
}

export default UserIndex;