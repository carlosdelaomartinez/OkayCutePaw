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

  #possibly filter by distance
 # ADD LOGIC FOR LOOKING FOR It should be the opposite of the user 
# show all the users except the current one
# pass the back the user preferences, 
# check if they are different. 
# if they are different update them. 
# use the user id to show the preferences in the state. 
## right now focus on passing back the user preferences. 
## show them on the front end for the search page. 
# fetch the users 
  def index 
    # @users = User.where.not(id: current_user.id)
    # organize how it looks on the front end and practice throwing a request to the backend. 
    debugger
    userPref = user_pref
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
