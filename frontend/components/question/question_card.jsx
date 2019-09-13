import React from 'react';

class QuestionCard extends React.Component {
  constructor (props){
    super(props)
    this.state = {questions: []};
  }

  // componentDidMount(){
   
  //   this.props.fetchQuestions();
  //   this.props.fetchQuestionAnswers();
  //   const { userId, questions, questionAnswers } = this.props;
  //   let questionsAnswersArray = Object.keys(questionsAnswers).map(key => {
  //     return questionAnswers[key]
  //   });
  //   let answerdQuestionIds = {}
  //   questionsAnswersArray.forEach( questionAnswer => {
  //     answerdQuestionIds[questionAnswer.id] = questionAnswer.questionId;
  //   });
  //   this.unansweredQuestions = [];
  //   for (let key in questions){
  //     if (answerdQuestionIds[key] === 'undefined'){
  //       this.unansweredQuestions.push(question[key]);
  //     }
  //   }
  // }
  // handlesubmit(form){
  //   return (e) => {
  //     e.preventDefault();
  //     let qA = {userId, }
  //   }
  // }

  render(){

    return (
      <div className="question-card">
        {/* <span>{this.unansweredQuestions[this.unansweredQuestions.length - 1].question}</span> */}
      </div>
    )
  }
}

export default QuestionCard;