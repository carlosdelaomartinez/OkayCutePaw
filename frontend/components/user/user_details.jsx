import React from 'react';

const UserDetails = (props) => {
  const generateDetails = () => {
    let details = [
      <div className='main-profile-details'>
        {props.details.map((detail, i) => (<div key={`pd${i}`} className='main-detail'>{`${detail}${i !== (props.details.length - 1) ? ',' : ''}`}</div>))}
      </div>
    ]
    if(props.bonus){
        details.push(
          <div className='bonus-details'>
            {props.bonus.map((bonus, i) => (<div key={`bd${i}`} className='bonus-detail'>{`${bonus}${i !== (props.bonus.length - 1) ? ',' : ''}`}</div>))}
          </div>
        );
    }
    return details;
  };

  return(
    <div className='user-details-container'>
      <div className='icon-container'>
        
      </div>
      <div className='details container'>
        {generateDetails()}
      </div>
    </div>
  )
}

export default UserDetails;
