import React from 'react';

class QuestionCard extends React.Component {
  constructor (props){
    super(props)
    this.state = {question: {question: ''}};
    this.questionsToAsk = this.questionsToAsk.bind(this);
    // this.filteredQAs;
    this.handleSkip = this.handleSkip.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
  }

  componentDidMount(){
    Promise.all([
      this.props.fetchQuestions(),
      this.props.fetchQuestionAnswers(this.props.userId)
    ]).then(() => {
      this.filteredQAs = this.questionsToAsk(this.props.questions, this.props.questionAnswers);
      this.setState({ question: this.filteredQAs.shift() }, () => console.log(this.state))
    })
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
      let qA = {
        question_id: this.state.question.id,
        user_id: this.props.userId,
        answer: form === 'Yes' ? true : false
      }
      this.props.createQuestionAnswer(qA);
      this.setState({ question: this.filteredQAs.shift() })
    }
  }
  
  handleSkip(e){
    this.filteredQAs.push(this.state.question);
    this.setState({question: this.filteredQAs.shift()})
  }

  render(){
    return (
      <div className="question-card">
        <form>
          <label>
            Improve Your Matches
          </label>
          <div>
            <span>
              {this.state.question.question}
            </span>
              <div onClick={this.handleSkip}>Skip</div>
              <div className="q-btn-container">
                <span onClick={this.handlesubmit('No')}>No</span>
                <span onClick={this.handlesubmit('Yes')}>Yes</span>
              </div>
          </div>         
        </form>
      </div>
    )
  }
}

export default QuestionCard;