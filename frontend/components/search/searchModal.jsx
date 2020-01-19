import React from 'react';
import {
  GENDER_PREFS,
  OTHER_USER_GENDER_PREFS,
  AGE_RANGE_PREFS,
  DISTANCE_PREFS, 
  LOCATION_PREFS
} from '../../util/search_modal_util';

class SearchModal extends React.Component {
  constructor(props){
    super(props)
    const {
      id,
      distance,
      looking_for,
      location,
      looking_age_lower,
      looking_age_higher, 
      other_gender_prefs
    } = this.props.state
    this.state = {
      id: id,
      distance: distance,
      looking_for: looking_for,
      location: location,
      looking_age_lower: looking_age_lower,
      looking_age_higher: looking_age_higher,
      other_gender_prefs: other_gender_prefs
    }
    this.initialState = {
      id: id,
      distance: distance,
      looking_for: looking_for,
      location: location,
      looking_age_lower: looking_age_lower,
      looking_age_higher: looking_age_higher,
      other_gender_prefs: other_gender_prefs
    };
    this.updateLocal = this.updateLocal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.submit = false;
    this.handleSlider = this.handleSlider.bind(this);
    this.handleSliderMouseUp = this.handleSliderMouseUp.bind(this);
    this.handleSliderMouseDown = this.handleSliderMouseDown.bind(this);
    this.settleSlider = this.settleSlider.bind(this);
    this.getXSliderPos = this.getXSliderPos.bind(this);
    // this.intervals = [];
  }
  componentDidMount(){                  
    window.addEventListener('click', this.handleClick)
    if(this.props.modalType === DISTANCE_PREFS){
      debugger
      let slider = document.querySelector('.filter-slider-button');
      let position = this.getXSliderPos();
      slider.style.left = position;
    }
  }
  handleClick(e){
    // this.props.toggleModal(this.props.modalType);
  }
  componentWillUnmount(){
    window.removeEventListener('click', this.handleClick)
    for(let key in this.state){
      if (this.state[key] !== this.initialState[key]){
        this.submit = true;
      }
    }
    if(this.submit === true) {
      this.props.fetchUsers(this.state);
    }
  }
  handleSlider(e){
    let container = document.querySelector('.filter-slider-container');
    let slider = document.querySelector('.filter-slider-button');
    let slideDistance = container.getBoundingClientRect().width;
    let increments = Math.round(slideDistance / 5);
    let first = container.getBoundingClientRect().left;
    let distances = [];
    let mousePos = e.clientX
    for(let i = 0; i < 7; i++){
      distances.push(first + increments * i);
    }
      if (mousePos > container.getBoundingClientRect().left - 5 && mousePos  < container.getBoundingClientRect().right -10) {
        slider.style.left = `${Math.round(mousePos - first)}px`

      }
      window.addEventListener('mouseup', this.handleSliderMouseUp, true)
  }
  handleSliderMouseDown(e){
    window.addEventListener('mousemove', this.handleSlider, true);
  }
  handleSliderMouseUp(e){
    window.removeEventListener('mousemove', this.handleSlider, true);
    window.removeEventListener('mouseup', this.handleSliderMouseUp, true);
    this.settleSlider(e);
  }
  settleSlider(e){
    let container = document.querySelector('.filter-slider-container');
    let slider = document.querySelector('.filter-slider-button');
    let sliderLeft = slider.getBoundingClientRect().left - container.getBoundingClientRect().left;
    let slideDistance = container.getBoundingClientRect().width;
    let increments = Math.round(slideDistance / 6);
    let distances = [];   
    let values = [5, 10, 25, 50, 100, 250, 500]
    for (let i = 0; i < 7; i++) {
      distances.push( increments * i);
    }
    for(let i = 0; i< 7; i++){
      let increment1 = distances[i];
      let increment2 = distances[i + 1]
      if(sliderLeft > increment1 && sliderLeft < increment2){
        let incrementCenterDist = Math.round((increment1 + increment2) / 2);
        let newPosition = sliderLeft < incrementCenterDist ? increment1 : increment2;
        let valIdxToReturn = sliderLeft < incrementCenterDist ? i : (i + 1)
        newPosition = Math.round(newPosition)

        
        slider.style.left = parseInt(newPosition - 5) + 'px';
        this.setState({ 'distance': values[valIdxToReturn]})
      }
    }
  }
  getXSliderPos(miles){
    switch(miles){
      case 5:
        return '-5px';
      case 10:
        return '42px';
      case 25:
        return '89px';
      case 50: 
        return '136px';
      case 100: 
        return '183px';
      case 250:
        return '230px';
      case 500:
        return '277px';
      default:
        return '-5px';
    } 
  }
  updateLocal(form){
    return (e) => (
      this.setState({ [form]: e.target.value }, () => console.log(this.state))
    )
  }
  render(){
    let styles = {
      left: this.getXSliderPos(this.state.distance)
    }
    let modalToReturn;
    switch (this.props.modalType) {
      case GENDER_PREFS:
        modalToReturn = (<div className={this.props.modalType}>
        <div className="title">
            Show me
        </div>
        <div className="choices">
          <label htmlFor="MALE">
            MALE
            <input
              type="checkbox"
              id="MALE"
              value="MALE"
              checked={this.state.looking_for === 'MALE'}
              onChange={this.updateLocal('looking_for')}
            />
          </label>
          <label htmlFor="FEMALE">
            FEMALE
            <input
              type="checkbox"
              id="FEMALE"
              value="FEMALE"
              checked={this.state.looking_for === 'FEMALE'}
              onChange={this.updateLocal('looking_for')}
            />
          </label>
          <label htmlFor="ALL">
            ALL
            <input
              type="checkbox"
              id="ALL"
              value="ALL"
              checked={this.state.looking_for === 'ALL'}
              onChange={this.updateLocal('looking_for')}
            />
          </label>
          </div>
        </div>);
        break;
      case OTHER_USER_GENDER_PREFS:
        modalToReturn = (<div className={`GENDER_PREFS ${this.props.modalType}`}>
          <div className="title">
            Interested in
        </div>
          <div className="choices">
          <label htmlFor="MALE">
            MALE
            <input
              type="checkbox"
              id="MALE"
              value="MALE"
              checked={this.state.other_gender_prefs === 'MALE'}
              onChange={this.updateLocal('other_gender_prefs')}
            />
          </label>
          <label htmlFor="FEMALE">
            FEMALE
            <input
              type="checkbox"
              id="FEMALE"
              value="FEMALE"
              checked={this.state.other_gender_prefs === 'FEMALE'}
              onChange={this.updateLocal('other_gender_prefs')}
            />
          </label>
          <label htmlFor="ALL">
            ALL
            <input
              type="checkbox"
              id="ALL"
              value="ALL"
              checked={this.state.other_gender_prefs === 'ALL'}
              onChange={this.updateLocal('other_gender_prefs')}
            />
          </label>
          </div>
        </div>);
        break;
      case AGE_RANGE_PREFS:
        modalToReturn = (<div className={this.props.modalType}>
          <div className="title">Ages</div>
        <div className="row">
            <input
              type="number"
              name=""
              id=""
              value={this.state.looking_age_lower}
              onChange={this.updateLocal('looking_age_lower')}
              min="1"
              className="age-1"
            />
            <span>-</span>
            <input
              type="number"
              name=""
              id=""
              value={this.state.looking_age_higher}
              onChange={this.updateLocal('looking_age_higher')}
              className="age-2"
            />
        </div>
        
        </div>);
        //Add two input fields
        // padding
        break;
      case DISTANCE_PREFS:
        modalToReturn = (<div className={this.props.modalType}>
          <div className="title">  Distance (in miles)
          </div>
          <div className="filter-slider-container">

            <div className="filter-slider-bar"></div>
            <span className="filter-meter"></span>
            <div className="filter-slider-button" 
              onMouseDown={this.handleSliderMouseDown} 
              onMouseUp={this.handleSliderMouseUp}
              style={styles}
            >
              <div className="inner-circle"></div>
            </div>
       
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
          </div>
          <div className="range-dist-nums">
            <span>5</span>
            <span>10</span>
            <span>25</span>
            <span>50</span>
            <span>100</span>
            <span>250</span>
            <span>500</span>
          </div>         
        </div>);
   
        break;
      case LOCATION_PREFS:
        modalToReturn = (<div className={this.props.modalType}> 
          <div className="title">Location</div>
          <input 
            type="text" 
            value={this.state.location}
            onChange={this.updateLocal('location')}
          />
          </div>);
        break;
      default:
        modalToReturn = (<div className="errorModal">ERROR</div>)
        break;
    }
    return (<div className={`searchModal `}>
      {modalToReturn}
      <div className="tail"></div>
    </div>
    )
  }
  
}

export default SearchModal