import React from 'react'


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

    } else {

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
            {this.generateUserList()}
          </div>
        </div>
        
      </div>
    )
  }
}

export default UserIndex;