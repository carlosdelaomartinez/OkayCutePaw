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
    @matches = {}
    User.all.each do |user|
      answered_q = QuestionAnswer.where(user_id: [user.id, current_user.id]).select(:question_id).distinct.count
      similar_answers = QuestionAnswer.where(user_id: [user.id, current_user.id]).where(answer: true).select(:question_id).distinct.count.to_f
      # debugger
      @matches[user.id] = (similar_answers/answered_q).round(2) * 100
    end
    # debugger
    @users = User.all
    
    render :index
  end

  def show
    @user = User.find(params[:id])
    answered_q = QuestionAnswer.where(user_id: [@user.id, current_user.id]).select(:question_id).distinct.count
    similar_answers = QuestionAnswer.where(user_id: [@user.id, current_user.id]).where(answer: true).select(:question_id).distinct.count.to_f
    @match = (similar_answers/answered_q).round(2) * 100
    render :show
  end

  private 
  def user_params
    params.require(:user).permit(:password, :username, :name, :age, :location )
  end
end
