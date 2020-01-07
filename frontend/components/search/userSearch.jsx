import React from 'react';
import {Connect} from 'react-redux';
import Navbar from '../navbar/navbar';
import { connect } from 'react-redux';
import {fetchUserDistances} from '../../actions/distance_actions';
import {fetchUser, fetchUsers, clearOtherUsers} from '../../actions/session_actions';
import {toggleModal} from '../../actions/ui_actions';
import {
  GENDER_PREFS,
  OTHER_USER_GENDER_PREFS,
  AGE_RANGE_PREFS,
  DISTANCE_PREFS,
  LOCATION_PREFS
} from '../../util/search_modal_util';
import UserShowCard from '../user/userShowCard';
import SearchModal from './searchModal';

const mapStateToProps = state => ({
currentUser: state.entities.users[state.session.id],
currentModal: state.ui.currentModal,
users: state.entities.users

});

const mapDispatchToProps = dispatch => ({
fetchUserDistances: userPref => dispatch(fetchUserDistances(userPref)),
fetchUser: id => dispatch(fetchUser(id)),
fetchUsers: userPref => dispatch(fetchUsers(userPref)),
toggleModal: modalname => dispatch(toggleModal(modalname)),
clearOtherUsers: currentUser => dispatch(clearOtherUsers(currentUser))
});


class UserSearch extends React.Component {
  constructor(props){
    super(props)

    const {
      id,
      distance,
      lookingFor,
      location,
      lookingAgeLower,
      lookingAgeHigher,
      gender
    } = this.props.currentUser
    this.state = {
      userPrefs: {
        id: id,
        distance: distance,
        looking_for: lookingFor,
        location: location,
        looking_age_lower: lookingAgeLower,
        looking_age_higher: lookingAgeHigher,
        other_gender_prefs: gender.toUpperCase()
      },
      userShowCards: []      
    }
    this.handleModal = this.handleModal.bind(this);
    this.update = this.update.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.getUsersAndUpdate = this.getUsersAndUpdate.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.users = [];
  }

  componentDidMount(){
    //fetch the users using the default search settings of the logged in user. 
    // fetching with the baked in user preferences returns all other users. 
    // updating the fetch info fetches all users including the user because the user needs to be updated
    console.log(this.state)
    let userPrefs = this.state.userPrefs;
    this.getUsers(userPrefs);
  }
  getUsersAndUpdate(userPrefs){
    this.props.clearOtherUsers(this.props.currentUser);
    this.users = [];
      this.setState({userPrefs: userPrefs, userShowCards: []},() => {
        this.getUsers(userPrefs)
      });
  }
  getUsers(userPrefs){
    this.props.fetchUsers(userPrefs).then(() => {
      this.users = Object.keys(this.props.users)
        .filter(id => id !== this.props.currentUser.id.toString())
        .map((id, i) => <UserShowCard user={this.props.users[id]} key={i} />)
      this.setState({ userShowCards: this.users.splice(0, 20) })
    });
  }

  handleModal(type){
    return(e) => {
      this.props.toggleModal(type);
    } 
    //get the modal to pop up then handle the closing of the modal to trigger the backend call
  }

  renderModal(type){
    return this.props.currentModal === type ? (<SearchModal
      modalType={type}
      currentUser={this.props.currentUser}
      update={this.update}
      state={this.state.userPrefs}
      toggleModal={this.props.toggleModal}
      fetchUsers={this.getUsersAndUpdate}
      />
      ) : ''

  }
  
  update(form){
    return (e) => (
      this.setState({userPrefs: { [form]: e.target.value }}, () => console.log(this.state))
    )
  }
  render(){
    return(<div className="user-search">
      <Navbar></Navbar>
      <div className="search-info">
        <div className="search-gender selectable" >
          <div onClick={this.handleModal(GENDER_PREFS)}>
            {this.state.userPrefs.looking_for[0].toUpperCase() + this.state.userPrefs.looking_for.slice(1).toLowerCase()}
          </div>
          {this.renderModal(GENDER_PREFS)}
        </div>
        Dogs who are
        <div className="otherUser-gender-preference selectable" >
          <div onClick={this.handleModal(OTHER_USER_GENDER_PREFS)}>
            interested in {this.state.userPrefs.other_gender_prefs[0].toUpperCase() + this.state.userPrefs.other_gender_prefs.slice(1).toLowerCase()} dogs
          </div> 
  
          {this.renderModal(OTHER_USER_GENDER_PREFS)}
        </div>
        ages 
        <div className="age-preference selectable" >
          <div onClick={this.handleModal(AGE_RANGE_PREFS)}>
            {this.state.userPrefs.looking_age_lower}-{this.state.userPrefs.looking_age_higher}
          </div>
          {this.renderModal(AGE_RANGE_PREFS)}
        </div>
        <div className="distance-preference selectable" >
          <div onClick={this.handleModal(DISTANCE_PREFS)}>
            within {this.state.userPrefs.distance}
          </div>  
          {this.renderModal(DISTANCE_PREFS)}
        </div>
        miles
        <div className="location-preference selectable" >
          <div onClick={this.handleModal(LOCATION_PREFS)}>
            of {this.state.userPrefs.location}
          </div>  
          {this.renderModal(LOCATION_PREFS)}
        </div>
      </div>
      <div className="resultsContainer">
        <div className="search-results">
          {this.state.userShowCards}
        </div>
      </div>
      
      <footer className="footer">
        <div>All Icons except for Messages made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>Messenges Icon Made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <span>promotional content</span>
      </footer>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);