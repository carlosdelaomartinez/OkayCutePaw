import * as QuestionAPIutil from '../util/question_api_util';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';


const receiveQuestion = question => ({
  type: RECEIVE_QUESTION,
  question
});

const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  questions
});

export const fetchQuestions = () => dispatch => (
  QuestionAPIutil.fetchQuestions()
    .then(questions => dispatch(receiveQuestions(questions)))
);

export const fetchQuestion = questionId => dispatch => (
  QuestionAPIutil.fetchQuestion(questionId)
    .then(question => dispatch(receiveQuestion(question)))
)