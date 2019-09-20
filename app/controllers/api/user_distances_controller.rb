class Api::UserDistancesController < ApplicationController
  
  def create
    @user_distance = UserDistance.new(distance_params)
    if @user_distance.save
      render :show
    else
      render @user_distance.errors.full_messages, status: 400
    end
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
    params.require(:user_distance).permit(:user_id, :distance, :distant_user_id)
  end
end
