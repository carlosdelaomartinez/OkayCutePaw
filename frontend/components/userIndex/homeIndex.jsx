import React from 'react';
import {connect} from 'react-redux'
import UserShowCard from '../user/userShowCard'
import Navbar from '../navbar/navbar';
import GreetingContainer from '../greeting/greeting_container';
import QuestionContainer from '../question/question_container';
import {fetchUsers} from '../../actions/session_actions';
import UserIndex from './userIndex';
import { fetchQuestionAnswers } from '../../actions/question_answers_actions';
import {fetchUserDistances, createUserDistance, updateUserDistance} from '../../actions/distance_actions';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.id],
  users: state.entities.users,
  questionAnswers: state.entities.questionAnswers
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchQuestionAnswers: (id) => dispatch(fetchQuestionAnswers(id))
})

class HomeIndex extends React.Component {
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
  }


  componentDidMount(){
    window.scrollBy(0, -1000000)

    const that = this;
    let promises = [];
    let userPrefs = this.state.userPrefs;

    this.getUsers(userPrefs);
    //   .then(()=>{
    //   if (!localStorage.getItem('user',`loggedIn${currentUser.id}`)){
    //     Object.keys(users).forEach( id => {
    //       promises += [updateUserDistance(id).then(()=>{}, (id)=>createUserDistance)]
    //     })
    //     Promise.all(promises).then(() => (localStorage.setItem('user', `loggedIn${currentUser.id}`)));
        
    //   } else {
    //     fetchUserDistances(currentUser.id)
    //   }
    // });
    // const service = new google.maps.DistanceMatrixService();
    // service.getDistanceMatrix({
    //   origins: [94806],
    //   desinations: [95616]
    // }, (response, status) => console.log(response, status))
    //TO GO IN HTMLERB
    //   < script src = "https://maps.googleapis.com/maps/api/js?key=<%= Rails.application.credentials.google[:api_key] %>&callback=initialize"
    // async defer ></script >
  }
  getUsers(userPrefs) {
    this.props.fetchUsers(userPrefs)
  }
  render(){
    return(
      <div className="main-page">
          <Navbar currentUser/>
          <UserIndex
            title={`Top matches`}
            currentUser={this.props.currentUser}
            users={this.props.users}
            questionAnswers={this.props.questionAnswers}
            sort={'top-matches'}
          />
          <div className='bonus-content'>
            <div className='bonus-container paw1'>
              <div className='question-card'>
                <img className='paw-placeholder' src={window.leftpawURL} alt=""/>
              </div>
            <QuestionContainer />
            <div className='question-card paw2'>
              <img className='paw-placeholder' src={window.rightpawURL} alt=""/>
            </div>
            </div>
          </div>
          {/* <UserIndex
              // title={`Within ${this.props.currentUser.distance} miles`} 
              title={'Snapshots'}
              users={this.props.users}
              sort={'snapshots'}
              questionAnswers={this.props.questionAnswers}
              currentUser={this.props.currentUser}
          /> */}
          <UserIndex 
            // title={`Within ${this.props.currentUser.distance} miles`} 
            title={'Mix and Match'}
            users={this.props.users}
            sort={'distance'}
            questionAnswers={this.props.questionAnswers}
            currentUser={this.props.currentUser}
          />
       
          

        <footer className="footer">
          <div>All Icons except for Messages made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <div>Messenges Icon Made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          <span>promotional content</span>
        </footer>
      </div>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex)