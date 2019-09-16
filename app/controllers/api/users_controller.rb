class Api::UsersController < ApplicationController
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
  def index 
    # @users = User.where.not(id: current_user.id)
    @users = User.all

    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private 
  def user_params
    params.require(:user).permit(:password, :username, :name, :age, :location )
  end
end
