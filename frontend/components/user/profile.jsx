import React from 'react'
import {connect} from 'react-redux'
import Navbar from '../navbar/navbar'
import {fetchUsers} from '../../actions/session_actions';
import {withRouter} from 'react-router-dom'
import UserInfoCard from './userInfoCard';

const mapStateToProps = state => ({
  users: state.entities.users
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
})

class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        user: {
          name: '', 
          lookingFor: '', 
          distance: '', 
          age: '', 
          human:'',
          gender: '', 
          aboutMe: '', 
          aspirations: '',
          talent: '',
          traits: '',
          needs: '',
          hobbies: '',
          location: ''
      }
    };
    this.generateProfileCardInfo = this.generateProfileCardInfo.bind(this);
  }
  componentDidMount(){
    this.props.fetchUsers()
      .then(() => {
        const { users } = this.props;
        const user = users[parseInt(this.props.match.params.userId)]
        this.setState({user}, ()=> console.log(this.state))
        })
  }
  componentDidUpdate(prevProps){
    if(prevProps.match.url !== this.props.match.url){
      this.props.fetchUsers()
        .then(() => {
          const { users } = this.props;
          const user = users[parseInt(this.props.match.params.userId)]
          this.setState({ user }, () => console.log(this.state))
        })
    }
  }
  generateProfileCardInfo(){
    let cards = [];
    let avoidVals = {
      id: '', 
      username: '', 
      name: '', 
      distance: '', 
      age: '', 
      gender: '', 
      createdAt: '', 
      updatedAt: '', 
      location: '',
      matchPercent: '',
      photoUrl: '',
      lookingFor: '',
      human: ''
    }
    for(let key in this.state.user){
      if(!avoidVals.hasOwnProperty(key)){
        cards.push(<UserInfoCard title={key} info={this.state.user[key]} key={'profile' + key} />)
      }
    }
    return cards
  }
  

  generateAboutMe(){

  }
  
  render(){
    const {users} = this.props;
    const currentUser = users[parseInt(this.props.match.params.userId)]
    return(
      <div className='profile-container'>
        <Navbar border={true}/>
        <div className='profile-info'>
          <div className='profile-banner'>
            <div className='profile-photo-holder'>
              <div className='profile-photo-container'>
                {/* <img src={this.state.user.photoUrl} alt="" /> */}
              </div>
            </div>
            
            <div className='profile-text-container'>
                <div className='profile-name'>
                  {this.state.user.name}
                </div>
                <div className='profile-details'>
                  
                  <div className='age-container info'>
                      {this.state.user.age}
                  </div>
                  <div className='space info'>
                    .
                  </div>
                  <div className='profile-location container'>
                    {this.state.user.location}
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className='profile-content'>
          <div className='question-content'>
            {this.generateProfileCardInfo()}
          </div>
          <div className='important-traits'>

          </div>
        </div>
        
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))