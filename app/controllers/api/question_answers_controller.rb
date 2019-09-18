class Api::QuestionAnswersController < ApplicationController


  def show
    @answer = QuestionAnswer.find_by(question_id: params[:id], user_id: params[:user_id]);
    render :show
  end
  # Grab all the question answers
  def index
    @answers = QuestionAnswer.where(user_id: params[:user_id])
    render :index
  end

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

  def destroy
    current_user.answers.destroy_all
  end

  private 
  def answer_params
    params.require(:question_answer).permit(:question_id, :answer, :user_id)
  end
end

