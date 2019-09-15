import { RECEIVE_QUESTION, RECEIVE_QUESTIONS} from '../actions/question_actions';

const QuestionsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_QUESTION:
      return Object.assign({}, state, {[action.question.id]: action.question})
    case RECEIVE_QUESTIONS: 
      return Object.assign({}, state, action.questions)
    default:
      return state;
  }
};

export default QuestionsReducer;