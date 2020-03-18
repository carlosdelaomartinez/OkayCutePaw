import React from 'react'
import {connect} from 'react-redux'
import Navbar from '../navbar/navbar'
import {fetchUsers, fetchUser, clearOtherUsers} from '../../actions/session_actions';
import {withRouter} from 'react-router-dom'
import UserInfoCard from './userInfoCard';
import UserDetails from './user_details.jsx'
import {toggleModal} from '../../actions/ui_actions';

const mapStateToProps = state => ({
  users: state.entities.users,
  currentUserId: state.session.id
});

const mapDispatchToProps = dispatch => ({
  fetchUser: (id) => dispatch(fetchUser(id)),
  resetUsers: (currentUserId) => dispatch(clearOtherUsers(currentUserId))
});

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
    this.generateDetails = this.generateDetails.bind(this);
  }
  componentDidMount(){
    window.scrollBy(0, -1000000)
    // this.props.fetchUsers()
    //   .then(() => {
    //     const { users } = this.props;
    //     const user = users[parseInt(this.props.match.params.userId)]
    //     this.setState({user})
    //     })
    // const {users} = this.props;
    // const user = users[parseInt(this.props.match.params.userId)]
    this.props.fetchUser(this.props.match.params.userId)
      .then(() => {
        const {users} = this.props;
        const user = users[parseInt(this.props.match.params.userId)]
       this.setState({user})
      })
    // this.setState({user})
  }
  componentDidUpdate(prevProps){
    if(prevProps.match.url !== this.props.match.url){
      this.props.fetchUser(this.props.match.params.userId)
        .then(() => {
          const { users } = this.props;
          const user = users[parseInt(this.props.match.params.userId)]
          this.setState({ user })
        })
    }
  }
  componentWillUnmount(){
    this.props.resetUsers(this.props.currentUserId);
  }
  generateProfileCardInfo(){
    let cards = [];
    let userDetails = {
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
      if(!userDetails.hasOwnProperty(key)){
        cards.push(<UserInfoCard title={key} info={this.state.user[key]} key={'profile' + key} />)
      }
    }
    return cards
  }
  

  generateDetails(){
    let details1 = (<UserDetails key={'deets1'} details={['Dog', 'Lovable', 'Huggable', 'zoom']} />)
    //Ideally the bonus details will be dynamically filled in
    let details2 = (<UserDetails key={'deets2'} details={['Speaks Food', 'Attended University']} bonus={['Breed', 'Politics', 'Religion']}/> )
    return [details1, details2]

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
                <img src={this.state.user.photoUrl} alt="" />
              </div>
            </div>
            
            <div className='profile-text-container'>
                <div className='profile-name'>
                  {this.state.user.name}
                </div>
                <div className='profile-details'>
                  
                  <div className='age-container info deets'>
                      {this.state.user.age}
                  </div>
                  <div className='space info deets'>
                    .
                  </div>
                  <div className='profile-location container deets'>
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
            {/* {this.generateDetails()} */}
          </div>
        </div>
        <footer className="footer">
          <div>All Icons except for Messages made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div>Messenges Icon Made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <span>promotional content</span>
        </footer>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))