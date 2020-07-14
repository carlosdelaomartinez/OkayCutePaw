# README

## OkayCutePaw

### Find a friend for your bestfriend. Use OkayCutePaw to match your dog with other dogs!

Tech Stack:
* React / Redux
* Ruby on Rails
* Amazon Web Services (AWS)
* PostgreSQL

## [LIVE DEMO](https://okaycutepaw.herokuapp.com/#/)

![splash](app/assets/gifs/2020-07-14%2010.31.36.gif)

## Users can take questions 

![questions](app/assets/gifs/2020-07-14%2009.33.00.gif)

```ruby
    def create

    @answer = QuestionAnswer.new(answer_params)
    if @answer.save 
      render :show 
    else
      render json: @answer.errors.full_messages, status: 422
    end

  end

  def update
    @answer = QuestionAnswer.find_by(question_id: params[:id], user_id: params[:user_id])
    if @answer.update(answer_params)
      render :show
    else
      render json: ['Could not update'], status: 422
    end
  end
```

## A user percentage is generated between users, using their answers to their questions

```ruby
  @users.each do |user|
      answered_q = QuestionAnswer.where(user_id: [user.id, current_user.id]).select(:question_id).distinct.count
      similar_answers = QuestionAnswer.where(user_id: [user.id, current_user.id]).where(answer: true).select(:question_id).distinct.count.to_f
      # debugger
      if similar_answers == 0 
        @matches[user.id] = 0;
      else 
        @matches[user.id] = (similar_answers/answered_q).round(2) * 100
      end
    end
```

## User Distances are mapped to other users using the Google Distance Matrix API

![User Distances](app/assets/gifs/2020-07-14%2010.05.13.gif)

```ruby
  ActiveRecord::Base.transaction do 
      User.all.where.not(id: current_user.id).each do |user|
        # debugger
        url = URI.parse("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" \
          "#{current_user.location}&destinations=#{user.location}&key=#{Rails.application.credentials.google[:api_key]}")
        res = open(url).read
        result = JSON.parse(res)
        distance = result["rows"][0]["elements"][0]["distance"]["text"].split(' ')[0].to_i
        user_distance = UserDistance.create!(user_id: current_user.id, distant_user_id: user.id, distance: distance)
        end
    end
```

## Users can search for other users based on their preferences

![User Preferences](app/assets/gifs/2020-07-14%2010.17.56.gif)

```ruby
  if(user_pref[:looking_for] == "ALL" && other_user_pref[:other_gender_prefs] === "ALL")
      @users = User.where(gender: ["MALE", "FEMALE"])
      .where(age: (user_pref[:looking_age_lower].to_i..user_pref[:looking_age_higher].to_i))
      .where(looking_for: ["MALE", "FEMALE"])
      .joins(:distances)
      .where('user_distances.user_id = ? AND user_distances.miles BETWEEN ? AND ?', current_user.id, 0, user_pref[:distance])
  
    elsif (user_pref[:looking_for] == "ALL")
      @users = User.where(gender: ["MALE", "FEMALE"])
      .where(age: (user_pref[:looking_age_lower].to_i..user_pref[:looking_age_higher].to_i))
      .where(looking_for: other_user_pref[:other_gender_prefs])
      .joins(:distances)
      .where('user_distances.user_id = ? AND user_distances.miles BETWEEN ? AND ?', current_user.id, 0, user_pref[:distance])

    elsif other_user_pref[:other_gender_prefs] == "ALL"
      @users = User.where(gender: user_pref[:looking_for])
      .where(age: (user_pref[:looking_age_lower].to_i..user_pref[:looking_age_higher].to_i))
      .where(looking_for: ["MALE", "FEMALE"])
      .joins(:distances)
      .where('user_distances.user_id = ? AND user_distances.miles BETWEEN ? AND ?', current_user.id, 0, user_pref[:distance])

    else
      @users = User.where(gender: user_pref[:looking_for])
      .where(age: (user_pref[:looking_age_lower].to_i..user_pref[:looking_age_higher].to_i))
      .where(looking_for: other_user_pref[:other_gender_prefs])
      .joins(:distances)
      .where('user_distances.user_id = ? AND user_distances.miles BETWEEN ? AND ?', current_user.id, 0, user_pref[:distance])
    end
```

## User show cards direct to user profile page for more information

![user profile](app/assets/gifs/2020-07-14%2010.41.09.gif)

```ruby
class UserShowCard extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    const {user} = this.props
    return(
      <Link to={`/users/${user.id}`} className='user-card-container'>
        <div className='user-photo-container'>
          <img className='user-card-photo' src={user.photoUrl} alt="" />
        </div>
        <div className='user-info-container'>
          <div className='user-info'>
            {`${user.name}, ${user.age}`}
          </div>
          <div className='user-location-text'>
            {user.location}
            </div>
        </div>
        <div className="match-container">
          <div className={`${user.matchPercent > 89 ? 'green-match' : 'blue-match'} match-percentage`}>
            {user.matchPercent === undefined ? '' : `${user.matchPercent.toString().slice(0, 2)}%`}
            {/* {`${user.matchPercent}%`} */}
          </div>
        </div>
      </Link>
    )
  }
}
```
