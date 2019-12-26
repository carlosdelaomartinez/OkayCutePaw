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
  }
  componentDidMount(){                  
    window.addEventListener('click', this.handleClick)
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

  updateLocal(form){
    return (e) => (
      this.setState({ [form]: e.target.value }, () => console.log(this.state))
    )
  }
  render(){
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
        modalToReturn = (<div className={this.props.modalType}> Age Preferences
        <input 
          type="number" 
          name="" 
          id="" 
          value={this.state.looking_age_lower}
          onChange={this.updateLocal('looking_age_lower')}
        /> 
        <span>-</span>
        <input 
          type="number" 
          name="" 
          id="" 
          value={this.state.looking_age_higher}
          onChange={this.updateLocal('looking_age_higher')}
        />
        </div>);
        //Add two input fields
        // padding
        break;
      case DISTANCE_PREFS:
        modalToReturn = (<div className={this.props.modalType}>
          Distance(in miles)
          <div>
            <div className="filter-slider-bar"></div>
            <span className="filter-meter"></span>
            <button className="filter-slider-button">
            </button>
       
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
            <div className="filter-slider-tick"></div>
          </div>
        </div>);
   
        break;
      case LOCATION_PREFS:
        modalToReturn = (<div className={this.props.modalType}> 
          Location Prefs
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