class Api::UsersController < ApplicationController
  require 'open-uri'
    def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
    
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

# check if they are different. 
# if they are different update them. 
# use the user id to show the preferences in the state. 
## right now focus on passing back the user preferences. 
## show them on the front end for the search page. 
# fetch the users 
  def index 

    user_val_to_update = []
    userPref.each do |key|
      if userPref[key] != current_user[key]
        user_val_to_update.push({key => userPref[key]})
      end
    end
    if user_val_to_update.length > 0 
      User.find(userPref.id).update(*user_val_to_update)
    end


    @matches = {}
    User.all.each do |user|
      answered_q = QuestionAnswer.where(user_id: [user.id, current_user.id]).select(:question_id).distinct.count
      similar_answers = QuestionAnswer.where(user_id: [user.id, current_user.id]).where(answer: true).select(:question_id).distinct.count.to_f
      # debugger
      @matches[user.id] = (similar_answers/answered_q).round(2) * 100
    end
    # User.all.where.not(id: current_user.id).each do |user|
    #     # debugger
    #     url = URI.parse("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" \
    #       "#{current_user.location}&destinations=#{user.location}&key=#{Rails.application.credentials.google[:api_key]}")
    #     res = open(url).read
    #     result = JSON.parse(res)
    #     distance = result["rows"][0]["elements"][0]["distance"]["text"].split(' ')[0].to_i
    #     user_distance = UserDistance.create!(user_id: current_user.id, distant_user_id: user.id, distance: distance)
    # end
        
    # debugger
    @users = User.all
    
    render :index
  end

  def show
    @user = User.where(id: params[:id])
    render :show
  end

  private 
  def user_params
    params.require(:user).permit(:password, :username, :name, :age, :location, :distance, :looking_for, :looking_age_lower, :looking_age_higher, :gender, :photo )
  end

  def user_pref 
    params.require(:userPref).permit(:id, :distance, :location, :looking_for, :looking_age_lower, :looking_age_higher)
  end
end
