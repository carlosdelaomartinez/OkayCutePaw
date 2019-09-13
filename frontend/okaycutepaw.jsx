import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import Root from './root'
import * as Action from './actions/session_actions'
import { login, logout, signup } from './util/session_api_util';
import * as QuestionAction from './actions/question_actions';
import * as QAnswerAction from './actions/question_answers_actions';


// window.login = login;
// window.logout = logout;
// window.signup = signup;
// window.Actionlogin = Action.login;
// window.Actionsignup = Action.signup;
// window.fetchQuestion = QuestionAction.fetchQuestion;
// window.fetchQuestions = QuestionAction.fetchQuestions;
// window.fetchQA = QAnswerAction.fetchQuestionAnswer;
window.fetchQAs = QAnswerAction.fetchQuestionAnswers;
// window.createQA = QAnswerAction.createQuestionAnswer;
// window.updateQA = QAnswerAction.updateQuestionAnswer;
document.addEventListener("DOMContentLoaded", () => {
  let store;

  let preloadedState = undefined;
  if (window.currentUser) {
    
    
    store = configureStore({
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: {
        id: window.currentUser.id
      }
    });
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  //testing
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  //testing end

  const root = document.querySelector("#root");
  ReactDOM.render(<Root store={store} />, root);
});