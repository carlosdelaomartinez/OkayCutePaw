import usersReducer from './users_reducer'
import QuestionAnswersReducer from './question_answers_reducer';
import {combineReducers } from 'redux'
import QuestionsReducer from './questions_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  questions: QuestionsReducer,
  questionAnswers: QuestionAnswersReducer
});

export default entitiesReducer;