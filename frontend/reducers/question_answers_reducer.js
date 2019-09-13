import { RECEIVE_QUESTION_ANSWER, RECEIVE_QUESTION_ANSWERS} from '../actions/question_answers_actions';

const QuestionAnswersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_QUESTION_ANSWER:
      return Object.assign({}, state, {[action.questionAnswer.id]: action.questionAnswer});
    case RECEIVE_QUESTION_ANSWERS:
      return Object.assign({}, state, action.questionAnswers)
    default: 
    return state;
  }
};

export default QuestionAnswersReducer;
