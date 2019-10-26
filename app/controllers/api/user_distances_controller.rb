class Api::UserDistancesController < ApplicationController
  require 'open-uri'
  ## the user distances will be built upon call
  ## and the distances will all be returned
  ## the distances will be stored based on the user
  def create
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
    
    # # @user_distance = UserDistance.new(distance_params)
    # if @user_distance.save
    #   render :show
    # else
    #   render @user_distance.errors.full_messages, status: 400
    # refactor all users 

  end

  def update
    debugger
    @user_distance = UserDistance.find_by(user_id: current_user.id, distant_user_id: params[:id])
    if @user_distance.update(distance_params)
      render :show
    else
      render json: ['Could not update user distance'], status: 422
    end
  end

  def index
    @distances = User.find(current_user.id).distances
    render :index
  end

  private
  def distance_params
    params.require(:user_distance).permit(:user_id, :distance, :location, :looking_for, :age_range)
  end
end
