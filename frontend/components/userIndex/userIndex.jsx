import React from 'react'
import UserShowCard from '../user/userShowCard';
import UserSnapShot from '../user/User.snapshot';


class UserIndex extends React.Component {
  constructor(props){
    super(props)
    this.generateUserList = this.generateUserList.bind(this);
    this.handleBrowse = this.handleBrowse.bind(this);
    this.browse = 0;
  }
  generateUserList(){
    const {currentUser} = this.props;
    let users = Object.assign({}, this.props.users);
    delete users[currentUser.id];
    if(this.props.sort === 'top-matches'){
      return Object.keys(users)
        .map(id => users[id])
        .sort((a,b) => b.matchPercent - a.matchPercent)
        .slice(0, 20)
        .map((user, i) => <UserShowCard user={user} key={i} />)
    } else {
      return Object.keys(users)
        .map(id => users[id])
        .slice(0, 20)
        .map((user, i) => <UserShowCard user={user} key={i}/>)
    }
    // if (this.props.sort === 'distance') 
    // } else {
    //   let dogs = Object.keys(users).map(id => users[id])
    //   if (dogs.length === 100){
    //     for (let i = 0; i < dogs.length; i++) {
    //       let x = Math.floor(Math.random() * (dogs.length + 1))
    //       let temp = dogs[i]
    //       dogs[i] = dogs[x]
    //       dogs[x] =  temp;
    //     }
    //   }
    //   return dogs.slice(0, 20).map((user, i) => <UserSnapShot user={user} key={i} />)
    // }
  }
  handleBrowse(form){
    return (e) => {
      let slider = e.target.closest('.user-slider-outer').children[1].firstChild 
      let leftBtn = e.target.closest('.user-slider-outer').children[0]
      let rightBtn = e.target.closest('.user-slider-outer').children[3]
      let fade = e.target.closest('.user-slider-outer').children[2]
      if( this.browse === 0 && form === 'right'){
        leftBtn.classList.remove('browse-btn-hide');
        slider.classList.remove('slide0');
        slider.classList.add('slide1');
        this.browse += 1;
      } else if (this.browse === 1 && form === 'right'){
        slider.classList.remove('slide1')
        slider.classList.add('slide2')
        this.browse += 1;
      } else if (this.browse === 2 && form === 'right'){
        slider.classList.remove('slide2')
        slider.classList.add('slide3')
        this.browse += 1;
      } else if (this.browse === 3 && form === 'right'){
        slider.classList.remove('slide3')
        slider.classList.add('slide4')
        fade.classList.remove('fade');
        this.browse += 1;
        rightBtn.classList.add('browse-btn-hide')
      } else if (this.browse === 4 && form === 'left'){
        slider.classList.remove('slide4')
        slider.classList.add('slide3')
        fade.classList.add('fade');
        this.browse -= 1;
        rightBtn.classList.remove('browse-btn-hide')
      } else if (this.browse === 3 && form === 'left') {
        slider.classList.remove('slide3')
        slider.classList.add('slide2')
        this.browse -= 1; 
      } else if (this.browse === 2 && form === 'left') {
        slider.classList.remove('slide2')
        slider.classList.add('slide1')
        this.browse -= 1;
      } else if (this.browse === 1 && form === 'left') {
        leftBtn.classList.add('browse-btn-hide');
        slider.classList.remove('slide1');
        slider.classList.add('slide0');
        this.browse -= 1;
      }
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
              <button className="browse-left browse-btn browse-btn-hide" onClick={this.handleBrowse('left')}>
                <img src={window.leftarrowURL} />
              </button>
              <div className="slider-container">
                <div className='user-slider-inner slide0'>
                  {this.generateUserList()}
                </div>
              </div>
              <div className='browse-fade-border fade'></div>    
              <button className="browse-right browse-btn" onClick={this.handleBrowse('right')}>
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