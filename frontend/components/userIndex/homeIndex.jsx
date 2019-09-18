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
    this.props.fetchUsers()
    
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