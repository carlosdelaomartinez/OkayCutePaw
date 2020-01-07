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
    # user_pref.each do |key|
    #   debugger
    #   if user_pref[key[0].to_sym] != current_user[key[0].to_sym]
    #     user_val_to_update.push({[key[0].to_sym] => user_pref[key[0].to_sym]})
    #   end
    # end
    # if user_val_to_update.length > 0 
      user = User.find(user_pref[:id].to_i)
      prefDup = user_pref.dup
      prefDup.delete(:other_gender_prefs)
      # debugger
      user.update(prefDup)
    # end
    

    @matches = {}
    # 
    if(user_pref[:looking_for] == "ALL" && other_user_pref[:other_gender_prefs] === "ALL")
      @users = User.where(gender: ["MALE", "FEMALE"])
      .where(age: (user_pref[:looking_age_lower].to_i..user_pref[:looking_age_higher].to_i))
      .where(looking_for: ["MALE", "FEMALE"])
      .or(User.where(id: current_user.id))
  
    elsif (user_pref[:looking_for] == "ALL")
      @users = User.where(gender: ["MALE", "FEMALE"])
      .where(age: (user_pref[:looking_age_lower].to_i..user_pref[:looking_age_higher].to_i))
      .where(looking_for: other_user_pref[:other_gender_prefs])
      .or(User.where(id: current_user.id))
    elsif other_user_pref[:other_gender_prefs] == "ALL"
      @users = User.where(gender: user_pref[:looking_for])
      .where(age: (user_pref[:looking_age_lower].to_i..user_pref[:looking_age_higher].to_i))
      .where(looking_for: ["MALE", "FEMALE"])
      .or(User.where(id: current_user.id))
    else
      @users = User.where(gender: user_pref[:looking_for])
      .where(age: (user_pref[:looking_age_lower].to_i..user_pref[:looking_age_higher].to_i))
      .where(looking_for: other_user_pref[:other_gender_prefs])
      .or(User.where(id: current_user.id))
    end
    
  
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

    if UserDistance.where(user_id: current_user.id).count != User.all.count - 1;
            UserDistance.where(user_id: current_user.id).destroy_all

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
        
    # debugger
    
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private 
  def user_params
    params.require(:user).permit(:password, :username, :name, :age, :location, :distance, :looking_for, :looking_age_lower, :looking_age_higher, :gender, :photo )
  end

  def user_pref 
    params.require(:userPref).permit(:id, :distance, :location, :looking_for, :looking_age_lower, :looking_age_higher, :other_gender_prefs)
  end
  def other_user_pref
    params.require(:userPref).permit(:other_gender_prefs)
  end
end
