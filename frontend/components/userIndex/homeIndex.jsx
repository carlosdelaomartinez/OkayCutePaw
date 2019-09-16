import React from 'react';
import {connect} from 'react-redux'
import UserShowCard from '../user/userShowCard'
import Navbar from '../navbar/navbar';
import GreetingContainer from '../greeting/greeting_container';
import QuestionContainer from '../question/question_container';
import {fetchUsers} from '../../actions/session_actions';
import UserIndex from './userIndex';
import { fetchQuestionAnswers } from '../../actions/question_answers_actions';

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
  
  componentDidMount(){
    const that = this;
    debugger
    this.props.fetchUsers().then(() => {
      for(let id in that.props.users) {
        that.props.fetchQuestionAnswers(id)
      }   
    });
  }
  render(){
    return(
      <div className="main-page">
          <Navbar currentUser={this.props.currentUser}/>
          <UserIndex 
            title={`Within ${this.props.currentUser.distance} miles`} 
            users={this.props.users}
            sort={'distance'}
            questionAnswers={this.props.questionAnswers}
            currentUser={this.props.currentUser}
          />
          <UserIndex
            title={`Top matches`}
            currentUser={this.props.currentUser}
            users={this.props.users}
            questionAnswers={this.props.questionAnswers}
            sort={'top-matches'}
          />
          {/* <QuestionContainer/> */}
        <span>This is User Index</span>
      </div>
    )
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex)