import { connect } from 'react-redux';
import QuestionCard from './question_card';
import {fetchQuestionAnswers, createQuestionAnswer, fetchQuestionAnswer} from '../../actions/question_answers_actions';
import {fetchQuestions, fetchQuestion} from '../../actions/question_actions';

const mapStateToProps = state => ({
  userId: state.session.id,
  questions: state.entities.questions,
  questionAnswers: state.entities.questionAnswers
});

const mapDispatchToProps = dispatch => ({
  fetchQuestions: () => dispatch(fetchQuestions()),
  fetchQuestion: (questionId) => dispatch(fetchQuestion(questionId)),
  fetchQuestionAnswer: (userId, questionId) => dispatch(fetchQuestionAnswer(userId, questionId)),
  fetchQuestionAnswers: () => dispatch(fetchQuestionAnswers()),
  createQuestionAnswer: (questionAnswer) => dispatch(createQuestionAnswer(questionAnswer))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);