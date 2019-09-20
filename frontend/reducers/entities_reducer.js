import usersReducer from './users_reducer'
import QuestionAnswersReducer from './question_answers_reducer';
import {combineReducers } from 'redux'
import QuestionsReducer from './questions_reducer';
import DistanceReducer from './distance_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  questions: QuestionsReducer,
  questionAnswers: QuestionAnswersReducer,
  distances : DistanceReducer
});

export default entitiesReducer;