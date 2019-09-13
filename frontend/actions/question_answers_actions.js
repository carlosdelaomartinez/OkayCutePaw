import * as QuestionAnswersAPIutil from '../util/question_answer_api_util';
export const RECEIVE_QUESTION_ANSWERS = 'RECEIVE_QUESTION_ANSWERS';
export const RECEIVE_QUESTION_ANSWER = 'RECEIVE_QUESTION_ANSWER';


const receiveQuestionAnswers = (questionAnswers) => ({
  type: RECEIVE_QUESTION_ANSWERS,
    questionAnswers
});

const receiveQuestionAnswer = (questionAnswer) => ({
  type: RECEIVE_QUESTION_ANSWER,
  questionAnswer
});

export const fetchQuestionAnswer = (userId, questionId) => dispatch => {
  QuestionAnswersAPIutil.fetchQuestionAnswer(userId, questionId)
    .then(questionAnswer => dispatch(receiveQuestionAnswer(questionAnswer)))

}

export const fetchQuestionAnswers = (userId) => dispatch => {
  return QuestionAnswersAPIutil.fetchQuestionAnswers(userId)
    .then(questionAnswers => dispatch(receiveQuestionAnswers(questionAnswers)), () => console.log(failes))
};
 
export const createQuestionAnswer = (questionAnswer) => dispatch => (
  QuestionAnswersAPIutil.createQuestionAnswer(questionAnswer)
    .then(questionAnswer => dispatch(receiveQuestionAnswer(questionAnswer)))
);

export const updateQuestionAnswer = (questionAnswer) => dispatch => (
  QuestionAnswersAPIutil.updateQuestionAnswer(questionAnswer)
    .then(questionAnswer => dispatch(receiveQuestionAnswer(questionAnswer)))
);