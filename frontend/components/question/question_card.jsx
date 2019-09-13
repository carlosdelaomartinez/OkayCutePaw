import React from 'react';

class QuestionCard extends React.Component {
  constructor (props){
    super(props)
    this.state = {question: []};
    this.questionsToAsk = this.questionsToAsk.bind(this);
  }

  componentDidMount(){
    this.props.fetchQuestions();
    this.props.fetchQuestionAnswers(this.props.userId)
    
  }
  componentDidUpdate(prevProps){

    if ((Object.keys(prevProps.questionAnswers).length !== Object.keys(this.props.questionAnswers).length) && (Object.keys(prevProps.questions).length !== Object.keys(this.props.questions))){
      // if questions or answers happen  to be fetched again this will run
      if(this.state.question.question !== 0){
  
        this.filteredQAs = this.questionsToAsk(this.props.questions, this.props.questionAnswers);
        this.setState({ question: this.filteredQAs.shift() });
        console.log(this.state);
      }
      
    }
    // if(Object.keys(prevProps.questions).length !== Object.keys(this.props.questions).length){
    //   this.setState({ questions: this.props.questions });
      
    // } 
  }

  questionsToAsk(questions, questionAnswers){
    let questionsToAsk = Object.assign({}, questions);
    for (let key in questionAnswers) {
      let qId = questionAnswers[key].questionId
      if (questionsToAsk[qId] !== 'undefined'){
        delete questionsToAsk[qId]
      }
    }
    return Object.keys(questionsToAsk).map(key => questionsToAsk[key]);
  }
   
  
  handlesubmit(form){
    return (e) => {
      e.preventDefault();
      let qA = {userId, }
    }
  }

  render(){
    return (
      <div className="question-card">
        {this.state.question.question}
      </div>
    )
  }
}

export default QuestionCard;