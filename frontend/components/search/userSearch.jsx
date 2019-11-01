import React from 'react'
import {Connect} from 'react-redux'
import Navbar from '../navbar/navbar'
import { connect } from 'react-redux'
import {fetchUserDistances} from '../../actions/distance_actions'
import {fetchUser, fetchUsers} from '../../actions/session_actions'

const mapStateToProps = state => ({
currentUser: state.entities.users[state.session.id]
});

const mapDispatchToProps = dispatch => ({
fetchUserDistances: userPref => dispatch(fetchUserDistances(userPref)),
fetchUser: id => dispatch(fetchUser(id)),
fetchUsers: userPref => dispatch(fetchUsers(userPref))
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
      lookingAgeHigher
    } = this.props.currentUser
    this.state = {
      id: id,
      distance: distance,
      looking_for: lookingFor,
      location: location,
      looking_age_lower: lookingAgeLower,
      looking_age_higher: lookingAgeHigher
    }
    
  }


  componentDidMount(){
    //fetch the users using the default search settings of the logged in user. 
    // fetching with the baked in user preferences returns all other users. 
    // updating the fetch info fetches all users including the user because the user needs to be updated
    console.log(this.state)
    let user = this.state;
    this.props.fetchUsers(user);
  }

  render(){
    return(<div className="user-search">
      <Navbar></Navbar>
      <div className="search-info">

      </div>
      This is user search
      <footer className="footer">
        <div>All Icons except for Messages made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>Messenges Icon Made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <span>promotional content</span>
      </footer>
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch);