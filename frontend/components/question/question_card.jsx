import React from 'react';

class QuestionCard extends React.Component {
  constructor (props){
    super(props)
    this.state = {questions: []};
  }

  componentDidMount(){
    this.props.fetchQuestions();
    this.props.fetchQuestionAnswers(this.props.userId)
    
  }
  componentDidUpdate(prevProps){
    if(Object.keys(prevProps.questionAnswers).length !== Object.keys(this.props.questionAnswers).length ){
      console.log('loaded answers');
    }
    if(Object.keys(prevProps.questions).length !== Object.keys(this.props.questions).length){
      this.setState({ questions: this.props.questions });
    }
    
  }
    // let answerdQuestionIds = {}
    // questionsAnswersArray.forEach( questionAnswer => {
    //   answerdQuestionIds[questionAnswer.id] = questionAnswer.questionId;
    // });
    // this.unansweredQuestions = [];
    // for (let key in questions){
    //   if (answerdQuestionIds[key] === 'undefined'){
    //     this.unansweredQuestions.push(question[key]);
    //   }
    // }
  
  handlesubmit(form){
    return (e) => {
      e.preventDefault();
      let qA = {userId, }
    }
  }

  render(){
    console.log(this.state)
    return (
      <div className="question-card">
        {/* <span>{this.unansweredQuestions[this.unansweredQuestions.length - 1].question}</span> */}
      </div>
    )
  }
}

export default QuestionCard;